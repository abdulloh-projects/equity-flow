import { useState, useEffect } from 'react';
import {
  Home,
  PieChart,
  LayoutGrid,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Loader2,
  AlertCircle,
  ExternalLink,
  User,
  Bell,
  X,
  Send,
} from 'lucide-react';
import { startupService, StartupSummary, CampaignSummary } from '../services/startupService';
import { investService } from '../services/investService';
import { messageService } from '../services/messageService';
import { useAuth } from '../context/AuthContext';

interface InvestorDashboardProps {
  onNavigate?: (page: string) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

function SidebarItem({ icon, label, active, onClick, badge }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 relative group cursor-pointer ${
        active ? 'bg-[#274060] text-white' : 'text-white hover:bg-[#3A5A7A]'
      }`}
    >
      <div className="flex items-center space-x-3">
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6C7A89]" />}
        <div className={`transition-colors duration-200 ${active ? 'text-white' : 'text-[#6C7A89] group-hover:text-white'}`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function InvestorDashboard({ onNavigate }: InvestorDashboardProps) {
  const { user, logout } = useAuth();
  const currentUserId = user?.userId ?? '';
  const [activeSection, setActiveSection] = useState('overview');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Marketplace
  const [startups, setStartups] = useState<StartupSummary[]>([]);
  const [startupPage, setStartupPage] = useState(1);
  const [startupTotal, setStartupTotal] = useState(0);
  const [isLoadingStartups, setIsLoadingStartups] = useState(false);
  const [startupError, setStartupError] = useState<string | null>(null);
  const [startupCampaigns, setStartupCampaigns] = useState<Record<number, CampaignSummary[]>>({});

  // Invest modal
  const [investStartup, setInvestStartup] = useState<StartupSummary | null>(null);
  const [investCampaign, setInvestCampaign] = useState<CampaignSummary | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [investNote, setInvestNote] = useState('');
  const [investLoading, setInvestLoading] = useState(false);
  const [investResult, setInvestResult] = useState<{ success: boolean; msg: string } | null>(null);

  // Investments
  const [realInvestments, setRealInvestments] = useState<Array<{
    id: string; user_id: string; startup_id: number; campaign_id: number;
    amount: number; status: string; created_at: string;
  }>>([]);
  const [startupNameMap, setStartupNameMap] = useState<Record<number, string>>({});

  // Messages
  const [conversations, setConversations] = useState<Array<{
    id: string; participants: string[]; last_message?: string;
    messages_count: number; created_at: string; updated_at?: string;
  }>>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [pendingReceiverId, setPendingReceiverId] = useState<string | null>(null);
  const [convMessages, setConvMessages] = useState<Array<{
    id: string; sender_id: string; text: string; created_at: string;
  }>>([]);
  const [messageText, setMessageText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  const totalInvested = realInvestments.reduce((s, i) => s + i.amount, 0);
  const activeInvestments = realInvestments.filter(i => i.status === 'completed' || i.status === 'confirmed').length;

  useEffect(() => {
    investService.myInvestments()
      .then(res => {
        const invs = res.investments ?? [];
        setRealInvestments(invs);
        const uniqueIds = [...new Set(invs.map(i => i.startup_id))];
        uniqueIds.forEach(id => {
          startupService.getStartup(id)
            .then(r => {
              const name = (r as Record<string, unknown>).name as string | undefined;
              if (name) setStartupNameMap(prev => ({ ...prev, [id]: name }));
            })
            .catch(() => {});
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (activeSection === 'messages') {
      messageService.getConversations()
        .then(res => setConversations(res.conversations ?? []))
        .catch(() => {});
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeConvId) {
      messageService.getMessages(activeConvId)
        .then(res => setConvMessages(res.messages ?? []))
        .catch(() => {});
    }
  }, [activeConvId]);

  const fetchStartups = async (page: number) => {
    setIsLoadingStartups(true);
    setStartupError(null);
    try {
      const res = await startupService.listStartups({ page, limit: 9 });
      const list = res.startups ?? [];
      setStartups(list);
      setStartupTotal(res.total ?? 0);
      setStartupPage(page);
      list.forEach(s => {
        startupService.getCampaignsByStartup(s.id)
          .then(r => setStartupCampaigns(prev => ({ ...prev, [s.id]: r.campaigns ?? [] })))
          .catch(() => {});
      });
    } catch (err) {
      setStartupError(err instanceof Error ? err.message : 'Failed to load startups');
    } finally {
      setIsLoadingStartups(false);
    }
  };

  useEffect(() => {
    if (activeSection === 'marketplace') fetchStartups(1);
  }, [activeSection]);

  const handleLogout = () => { logout(); onNavigate?.('home'); };

  const handleInvest = async () => {
    if (!investStartup || !investCampaign || !investAmount) return;
    setInvestLoading(true);
    setInvestResult(null);
    try {
      const res = await investService.invest({
        startup_id: investStartup.id,
        campaign_id: investCampaign.id,
        amount: Number(investAmount),
        message: investNote || undefined,
      });
      setInvestResult({ success: res.success, msg: res.message });
      if (res.success) {
        const updated = await investService.myInvestments();
        setRealInvestments(updated.investments ?? []);
        setStartupCampaigns(prev => {
          const camps = (prev[investStartup.id] ?? []).map(c =>
            c.id === investCampaign.id
              ? { ...c, raisedAmount: (c.raisedAmount ?? 0) + Number(investAmount) }
              : c
          );
          return { ...prev, [investStartup.id]: camps };
        });
      }
    } catch (err) {
      setInvestResult({ success: false, msg: err instanceof Error ? err.message : 'Investment failed' });
    } finally {
      setInvestLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || sendingMsg) return;
    const conv = conversations.find(c => c.id === activeConvId);
    const receiverId = conv?.participants.find(p => p !== currentUserId) ?? pendingReceiverId ?? '';
    if (!receiverId) return;
    setSendingMsg(true);
    try {
      await messageService.send({ receiver_id: receiverId, text: messageText.trim() });
      setMessageText('');
      setPendingReceiverId(null);
      const convsRes = await messageService.getConversations();
      const convs = convsRes.conversations ?? [];
      setConversations(convs);
      const updated = convs.find(c => c.participants.includes(receiverId));
      if (updated) {
        setActiveConvId(updated.id);
        const msgs = await messageService.getMessages(updated.id);
        setConvMessages(msgs.messages ?? []);
      } else if (activeConvId) {
        const msgs = await messageService.getMessages(activeConvId);
        setConvMessages(msgs.messages ?? []);
      }
    } catch { /* ignore */ }
    finally { setSendingMsg(false); }
  };

  const handleMessageFounder = async (startupId: number) => {
    setActiveSection('messages');
    try {
      const r = await startupService.getStartup(startupId);
      const founderId = (r as Record<string, unknown>).userId as string | undefined
        ?? (r as Record<string, unknown>).user_id as string | undefined;
      if (!founderId) return;
      const convsRes = await messageService.getConversations();
      const convs = convsRes.conversations ?? [];
      setConversations(convs);
      const existing = convs.find(c => c.participants.includes(founderId));
      if (existing) {
        setActiveConvId(existing.id);
      } else {
        setActiveConvId(null);
        setPendingReceiverId(founderId);
      }
    } catch { /* ignore */ }
  };

  const totalPages = Math.ceil(startupTotal / 9);
  const userInitials = user
    ? `${(user.firstName?.[0] ?? user.userId?.[0] ?? 'I').toUpperCase()}`
    : 'IN';

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#172A45] flex flex-col flex-shrink-0">
        <div onClick={() => onNavigate?.('home')}
          className="px-6 py-5 border-b border-[#3A5A7A] cursor-pointer hover:bg-[#1a2f4a] transition-colors duration-200">
          <h1 className="text-2xl font-semibold text-white">EquityFlow</h1>
          <p className="text-xs text-[#6C7A89] mt-1">Investor Portal</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <SidebarItem icon={<Home className="w-5 h-5" />} label="Home" active={activeSection === 'overview'} onClick={() => setActiveSection('overview')} />
          <SidebarItem icon={<PieChart className="w-5 h-5" />} label="Portfolio" active={activeSection === 'portfolio'} onClick={() => setActiveSection('portfolio')} />
          <SidebarItem icon={<LayoutGrid className="w-5 h-5" />} label="Marketplace" active={activeSection === 'marketplace'} onClick={() => setActiveSection('marketplace')} />
          <SidebarItem icon={<BarChart3 className="w-5 h-5" />} label="Analytics" active={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')} />
          <SidebarItem icon={<MessageSquare className="w-5 h-5" />} label="Messages" active={activeSection === 'messages'} onClick={() => setActiveSection('messages')} />
          <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" active={activeSection === 'settings'} onClick={() => setActiveSection('settings')} />
        </nav>
        <div className="border-t border-[#3A5A7A] p-4">
          <button onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-[#3A5A7A] rounded-lg transition-all duration-200">
            <LogOut className="w-5 h-5 text-[#6C7A89]" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#DCE3E8] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#0F1720]">
              {activeSection === 'overview' ? 'Dashboard Overview'
                : activeSection === 'portfolio' ? 'My Portfolio'
                : activeSection === 'marketplace' ? 'Startup Marketplace'
                : activeSection === 'analytics' ? 'Analytics'
                : activeSection === 'messages' ? 'Messages'
                : 'Settings'}
            </h2>
            <p className="text-sm text-[#6B7A8C]">Welcome back, {user?.firstName ?? 'Investor'}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#6B7A8C] hover:text-[#274060] transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative">
              <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200 text-sm">
                <span className="text-[#0F1720]">{language}</span>
                <ChevronDown className="w-3 h-3 text-[#0F1720]" />
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-1 w-20 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden z-10">
                  {['EN', 'RU', 'UZ'].map(lang => (
                    <button key={lang} onClick={() => { setLanguage(lang); setIsLanguageDropdownOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 ${language === lang ? 'bg-[#274060] text-white' : 'text-[#0F1720] hover:bg-[#F5F7FA]'}`}>
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 bg-[#274060] rounded-full flex items-center justify-center text-white text-sm font-semibold">{userInitials}</div>
                <ChevronDown className="w-4 h-4 text-[#6B7A8C]" />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#DCE3E8] rounded-xl shadow-lg overflow-hidden z-10">
                  <div className="px-4 py-3 border-b border-[#DCE3E8]">
                    <p className="text-sm font-semibold text-[#0F1720]">{user?.firstName ?? 'Investor'}</p>
                    <p className="text-xs text-[#6B7A8C]">{user?.email ?? ''}</p>
                  </div>
                  <button onClick={() => { setActiveSection('settings'); setIsProfileDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#0F1720] hover:bg-[#F5F7FA] transition-colors">
                    <User className="w-4 h-4 text-[#6B7A8C]" /> Profile Settings
                  </button>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Invest Modal */}
        {investStartup && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-[#DCE3E8]">
                <div>
                  <h3 className="text-lg font-bold text-[#0F1720]">Invest in {investStartup.name}</h3>
                  <p className="text-xs text-[#6B7A8C] mt-0.5">{investStartup.location}</p>
                </div>
                <button onClick={() => { setInvestStartup(null); setInvestResult(null); setInvestAmount(''); setInvestNote(''); }}
                  className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors">
                  <X className="w-5 h-5 text-[#6B7A8C]" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Campaign picker */}
                {(startupCampaigns[investStartup.id] ?? []).filter(c => c.status === 'active').length > 0 ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider mb-2">Select Campaign</label>
                      <div className="space-y-2">
                        {(startupCampaigns[investStartup.id] ?? []).filter(c => c.status === 'active').map(c => {
                          const raised = c.raisedAmount ?? 0;
                          const target = c.targetAmount ?? 0;
                          const minInv = c.minInvestment ?? 0;
                          const pct = target > 0 ? Math.round((raised / target) * 100) : 0;
                          return (
                            <button key={c.id} onClick={() => setInvestCampaign(c)}
                              className={`w-full p-3 rounded-lg border text-left transition-all ${investCampaign?.id === c.id ? 'border-[#274060] bg-[#EEF2F7]' : 'border-[#DCE3E8] hover:border-[#274060]'}`}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-semibold text-[#0F1720]">Target: ${target.toLocaleString()}</span>
                                <span className="text-xs text-[#6B7A8C]">{pct}% funded</span>
                              </div>
                              <div className="w-full bg-[#DCE3E8] rounded-full h-1.5 mb-1">
                                <div className="bg-[#274060] h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
                              </div>
                              <p className="text-xs text-[#6B7A8C]">Raised: ${raised.toLocaleString()} · Min: ${minInv.toLocaleString()}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    {investCampaign && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider mb-1">Amount (USD)</label>
                          <input type="number" min={investCampaign.minInvestment ?? 0} value={investAmount}
                            onChange={e => setInvestAmount(e.target.value)}
                            placeholder={`Min $${(investCampaign.minInvestment ?? 0).toLocaleString()}`}
                            className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg text-sm focus:outline-none focus:border-[#274060]" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider mb-1">Message (optional)</label>
                          <textarea rows={2} value={investNote} onChange={e => setInvestNote(e.target.value)}
                            placeholder="Say something to the founder..."
                            className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg text-sm resize-none focus:outline-none focus:border-[#274060]" />
                        </div>
                        {investResult && (
                          <div className={`p-3 rounded-lg text-sm ${investResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {investResult.msg}
                          </div>
                        )}
                        <button onClick={handleInvest} disabled={investLoading || !investAmount}
                          className="w-full py-3 bg-[#274060] text-white font-semibold rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-50">
                          {investLoading ? 'Processing…' : 'Confirm Investment'}
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-[#6B7A8C] text-center py-4">No active campaigns for this startup.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">

          {/* OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Total Invested</p>
                    <div className="w-9 h-9 bg-[#274060]/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[#274060]" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">${totalInvested.toLocaleString()}</p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Across {realInvestments.length} investments</p>
                </div>
                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Active Investments</p>
                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">{activeInvestments}</p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Confirmed positions</p>
                </div>
                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Startups Backed</p>
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    {new Set(realInvestments.map(i => i.startup_id)).size}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Unique startups</p>
                </div>
                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Avg. Investment</p>
                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    ${realInvestments.length > 0 ? Math.round(totalInvested / realInvestments.length).toLocaleString() : 0}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Per investment</p>
                </div>
              </div>

              {/* Recent Investments */}
              <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#DCE3E8] flex items-center justify-between">
                  <h3 className="font-semibold text-[#0F1720]">Recent Investments</h3>
                  <button onClick={() => setActiveSection('portfolio')}
                    className="text-sm text-[#274060] hover:text-[#3A5A7A] font-medium transition-colors">
                    View All
                  </button>
                </div>
                {realInvestments.length === 0 ? (
                  <div className="px-6 py-10 text-center">
                    <p className="text-[#6B7A8C] text-sm">No investments yet. Go to Marketplace to invest.</p>
                    <button onClick={() => setActiveSection('marketplace')}
                      className="mt-3 px-4 py-2 bg-[#274060] text-white text-sm rounded-lg hover:bg-[#3A5A7A] transition-colors">
                      Browse Startups
                    </button>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#F5F7FA] text-xs text-[#6B7A8C] uppercase tracking-wider">
                        <th className="px-6 py-3 text-left">Startup</th>
                        <th className="px-6 py-3 text-right">Amount</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F7FA]">
                      {realInvestments.slice(0, 5).map(inv => (
                        <tr key={inv.id} className="hover:bg-[#F5F7FA] transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-[#0F1720]">
                              {startupNameMap[inv.startup_id] ?? `Startup #${inv.startup_id}`}
                            </p>
                            <p className="text-xs text-[#6B7A8C]">Campaign #{inv.campaign_id}</p>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium text-[#0F1720]">
                            ${inv.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {inv.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#6B7A8C]">
                            {new Date(inv.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* PORTFOLIO */}
          {activeSection === 'portfolio' && (
            <div className="p-6">
              {realInvestments.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-12 text-center">
                  <PieChart className="w-12 h-12 text-[#DCE3E8] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#0F1720] mb-2">No investments yet</h3>
                  <p className="text-[#6B7A8C] text-sm mb-4">Browse the marketplace to make your first investment.</p>
                  <button onClick={() => setActiveSection('marketplace')}
                    className="px-5 py-2.5 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors">
                    Go to Marketplace
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {realInvestments.map(inv => (
                    <div key={inv.id} className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 bg-[#274060] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {(startupNameMap[inv.startup_id] ?? `S${inv.startup_id}`).slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0F1720]">
                              {startupNameMap[inv.startup_id] ?? `Startup #${inv.startup_id}`}
                            </h4>
                            <p className="text-xs text-[#6B7A8C]">Campaign #{inv.campaign_id}</p>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                          {inv.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-[#6B7A8C] mb-1">Invested</p>
                          <p className="text-base font-bold text-[#0F1720]">${inv.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7A8C] mb-1">Date</p>
                          <p className="text-sm font-medium text-[#0F1720]">
                            {new Date(inv.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => handleMessageFounder(inv.startup_id)}
                        className="w-full flex items-center justify-center gap-2 py-2 border border-[#274060] text-[#274060] text-sm font-medium rounded-lg hover:bg-[#274060] hover:text-white transition-colors">
                        <MessageSquare className="w-4 h-4" /> Message Founder
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MARKETPLACE */}
          {activeSection === 'marketplace' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6B7A8C]">
                  {isLoadingStartups ? 'Loading startups…'
                    : startupError ? 'Error loading startups'
                    : `Showing ${startups.length} of ${startupTotal} startups`}
                </p>
              </div>

              {startupError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium">Failed to load startups</p>
                    <p className="text-red-600 text-sm mt-1">{startupError}</p>
                    <button onClick={() => fetchStartups(startupPage)}
                      className="mt-2 text-sm text-red-700 font-semibold underline hover:no-underline">
                      Try again
                    </button>
                  </div>
                </div>
              )}

              {isLoadingStartups && (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-[#274060]" />
                  <span className="ml-3 text-[#6B7A8C]">Loading startups…</span>
                </div>
              )}

              {!isLoadingStartups && !startupError && (
                <>
                  {startups.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-[#6B7A8C] text-lg">No startups found.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {startups.map(startup => {
                        const camps = startupCampaigns[startup.id] ?? [];
                        const activeCamp = camps.find(c => c.status === 'active');
                        const totalRaised = camps.reduce((s, c) => s + (c.raisedAmount ?? 0), 0);
                        const totalTarget = camps.reduce((s, c) => s + (c.targetAmount ?? 0), 0);
                        const pct = totalTarget > 0 ? Math.round((totalRaised / totalTarget) * 100) : 0;
                        return (
                          <div key={startup.id}
                            className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="w-11 h-11 bg-[#274060] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {startup.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-[#0F1720] truncate">{startup.name}</h4>
                                <p className="text-xs text-[#6B7A8C]">{startup.location}</p>
                              </div>
                              {activeCamp && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium flex-shrink-0">Active</span>
                              )}
                            </div>
                            <p className="text-sm text-[#6B7A8C] line-clamp-2 mb-4 flex-1">
                              {startup.description || 'No description provided.'}
                            </p>

                            {/* Funding progress */}
                            {totalTarget > 0 && (
                              <div className="mb-4">
                                <div className="flex justify-between text-xs text-[#6B7A8C] mb-1">
                                  <span>${totalRaised.toLocaleString()} raised</span>
                                  <span>{pct}% of ${totalTarget.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-[#DCE3E8] rounded-full h-2">
                                  <div className="bg-[#274060] h-2 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
                                </div>
                                {activeCamp && (
                                  <p className="text-xs text-[#6B7A8C] mt-1">Min investment: ${(activeCamp.minInvestment ?? 0).toLocaleString()}</p>
                                )}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-3 border-t border-[#F5F7FA] gap-2">
                              <span className="text-xs text-[#6B7A8C]">
                                Founded {startup.foundedAt ? new Date(startup.foundedAt).getFullYear() : '—'}
                              </span>
                              <div className="flex items-center gap-2">
                                {startup.websiteUrl && (
                                  <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer"
                                    className="text-[#274060] hover:text-[#3A5A7A] transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                <button
                                  onClick={() => { setInvestStartup(startup); setInvestCampaign(activeCamp ?? null); setInvestResult(null); setInvestAmount(''); setInvestNote(''); }}
                                  className="px-3 py-1.5 bg-[#274060] text-white text-xs font-semibold rounded-lg hover:bg-[#3A5A7A] transition-colors">
                                  Invest
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      <button onClick={() => fetchStartups(startupPage - 1)} disabled={startupPage === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${startupPage === 1 ? 'border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed' : 'border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'}`}>
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => fetchStartups(p)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${p === startupPage ? 'bg-[#274060] text-white' : 'border border-[#DCE3E8] text-[#0F1720] hover:border-[#274060] hover:text-[#274060]'}`}>
                          {p}
                        </button>
                      ))}
                      <button onClick={() => fetchStartups(startupPage + 1)} disabled={startupPage === totalPages}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${startupPage === totalPages ? 'border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed' : 'border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'}`}>
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ANALYTICS */}
          {activeSection === 'analytics' && (
            <div className="p-6 space-y-6">
              {(() => {
                const byStartup = Object.entries(
                  realInvestments.reduce<Record<number, number>>((acc, i) => {
                    acc[i.startup_id] = (acc[i.startup_id] ?? 0) + i.amount;
                    return acc;
                  }, {})
                );
                const maxAmt = Math.max(...byStartup.map(([, v]) => v), 1);
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                      <h3 className="font-semibold text-[#0F1720] mb-5">Capital by Startup</h3>
                      {byStartup.length === 0 ? (
                        <p className="text-sm text-[#6B7A8C]">No data yet.</p>
                      ) : (
                        <div className="space-y-4">
                          {byStartup.map(([id, amt]) => (
                            <div key={id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-[#0F1720]">{startupNameMap[Number(id)] ?? `Startup #${id}`}</span>
                                <span className="text-[#6B7A8C]">${amt.toLocaleString()}</span>
                              </div>
                              <div className="h-2.5 bg-[#F5F7FA] rounded-full overflow-hidden">
                                <div className="h-full bg-[#274060] rounded-full" style={{ width: `${Math.round((amt / maxAmt) * 100)}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                      <h3 className="font-semibold text-[#0F1720] mb-5">Summary</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Total Invested', value: `$${totalInvested.toLocaleString()}` },
                          { label: 'Total Investments', value: realInvestments.length },
                          { label: 'Active Positions', value: activeInvestments },
                          { label: 'Startups Backed', value: new Set(realInvestments.map(i => i.startup_id)).size },
                          { label: 'Avg. Investment', value: realInvestments.length > 0 ? `$${Math.round(totalInvested / realInvestments.length).toLocaleString()}` : '—' },
                        ].map(row => (
                          <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#F5F7FA] last:border-0">
                            <span className="text-sm text-[#6B7A8C]">{row.label}</span>
                            <span className="text-sm font-semibold text-[#0F1720]">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* MESSAGES */}
          {activeSection === 'messages' && (
            <div className="h-full flex" style={{ height: 'calc(100vh - 73px)' }}>
              {/* Left panel */}
              <div className="w-[320px] bg-white border-r border-[#DCE3E8] flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-[#DCE3E8]">
                  <p className="text-sm font-semibold text-[#0F1720]">Conversations</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {conversations.length === 0 && !pendingReceiverId ? (
                    <div className="p-6 text-center">
                      <p className="text-xs text-[#6B7A8C]">No conversations yet. Invest in a startup and message the founder from your Portfolio.</p>
                    </div>
                  ) : (
                    <>
                      {pendingReceiverId && !conversations.find(c => c.participants.includes(pendingReceiverId)) && (
                        <div className="px-4 py-4 border-b border-[#DCE3E8] bg-[#F5F7FA] cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                              {pendingReceiverId.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F1720]">Founder {pendingReceiverId.substring(0, 8)}…</p>
                              <p className="text-xs text-[#6B7A8C]">New conversation</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {conversations.map(conv => {
                        const otherId = conv.participants.find(p => p !== currentUserId) ?? conv.id;
                        return (
                          <div key={conv.id} onClick={() => { setActiveConvId(conv.id); setPendingReceiverId(null); }}
                            className={`px-4 py-4 border-b border-[#DCE3E8] hover:bg-[#F5F7FA] cursor-pointer relative ${activeConvId === conv.id ? 'bg-[#F5F7FA]' : ''}`}>
                            {activeConvId === conv.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#274060]" />}
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                                {otherId.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#0F1720] truncate">Founder {otherId.substring(0, 8)}…</p>
                                <p className="text-xs text-[#6B7A8C] truncate">{conv.last_message || `${conv.messages_count} messages`}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              {/* Right panel */}
              <div className="flex-1 flex flex-col bg-[#F5F7FA]">
                {!activeConvId && !pendingReceiverId ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-12 h-12 text-[#DCE3E8] mx-auto mb-3" />
                      <p className="text-[#6B7A8C] text-sm">Select a conversation or go to Portfolio to message a founder</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="bg-white border-b border-[#DCE3E8] p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs">
                          {(() => {
                            const conv = conversations.find(c => c.id === activeConvId);
                            const id = conv?.participants.find(p => p !== currentUserId) ?? pendingReceiverId ?? '?';
                            return id.substring(0, 2).toUpperCase();
                          })()}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0F1720]">
                            {(() => {
                              const conv = conversations.find(c => c.id === activeConvId);
                              const id = conv?.participants.find(p => p !== currentUserId) ?? pendingReceiverId;
                              return id ? `Founder ${id.substring(0, 8)}…` : 'Conversation';
                            })()}
                          </h3>
                          <p className="text-xs text-[#6B7A8C]">Startup Founder</p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {convMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-[#6B7A8C] text-sm">No messages yet. Say hello!</p>
                        </div>
                      ) : convMessages.map(msg => (
                        <div key={msg.id} className={`flex items-start gap-3 ${msg.sender_id === currentUserId ? 'justify-end' : ''}`}>
                          {msg.sender_id !== currentUserId && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                              {msg.sender_id.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className="max-w-[70%]">
                            <div className={`rounded-lg px-4 py-3 text-sm ${msg.sender_id === currentUserId ? 'bg-[#274060] text-white' : 'bg-white border border-[#DCE3E8] text-[#0F1720]'}`}>
                              {msg.text}
                            </div>
                            <p className="text-xs text-[#6B7A8C] mt-1">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="bg-white border-t border-[#DCE3E8] px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <input type="text" value={messageText} onChange={e => setMessageText(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                          placeholder="Write a message…"
                          className="flex-1 px-4 py-3 bg-[#F5F7FA] border border-[#DCE3E8] rounded-lg text-sm text-[#0F1720] placeholder-[#6B7A8C] focus:outline-none focus:border-[#274060] transition-colors" />
                        <button onClick={handleSendMessage} disabled={sendingMsg || !messageText.trim()}
                          className="p-3 bg-[#274060] hover:bg-[#3A5A7A] rounded-lg transition-colors disabled:opacity-50">
                          <Send className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeSection === 'settings' && (
            <div className="p-6 max-w-2xl space-y-6">
              <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                <h3 className="font-semibold text-[#0F1720] mb-6 text-lg">Account Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email', value: user?.email ?? '—' },
                    { label: 'Role', value: 'Investor' },
                    { label: 'User ID', value: user?.userId ?? '—' },
                  ].map(field => (
                    <div key={field.label} className="flex items-center justify-between py-3 border-b border-[#F5F7FA] last:border-0">
                      <span className="text-sm font-medium text-[#6B7A8C]">{field.label}</span>
                      <span className="text-sm text-[#0F1720] font-semibold">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                <h3 className="font-semibold text-[#0F1720] mb-4">Danger Zone</h3>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
