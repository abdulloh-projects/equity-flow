import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { startupService, CampaignSummary, StartupSummary } from '../services/startupService';
import { messageService } from '../services/messageService';
import { investService } from '../services/investService';
import { chatService } from '../services/chatService';
import { 
  Home, 
  Rocket, 
  LayoutDashboard, 
  Building2, 
  Plus, 
  FileText, 
  DollarSign, 
  FolderOpen,
  Users,
  MessageSquare,
  BarChart3,
  FileBarChart,
  Settings,
  Shield,
  CreditCard,
  Bell as BellIcon,
  User,
  LogOut,
  ChevronDown,
  HelpCircle,
  RefreshCw,
  TrendingUp,
  Eye,
  Calendar,
  ArrowUpRight,
  Upload,
  CheckCircle2,
  Circle,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Briefcase,
  Handshake,
  Brain,
  PieChart,
  Play
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 relative group cursor-pointer ${
        active
          ? 'bg-[#274060] text-white'
          : 'text-white hover:bg-[#3A5A7A]'
      }`}
    >
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6C7A89]" />
      )}
      <div className={`transition-colors duration-200 ${active ? 'text-white' : 'text-[#6C7A89] group-hover:text-white'}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

interface SectionTitleProps {
  title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <div className="px-4 py-2 mt-6 mb-2">
      <h3 className="text-xs font-semibold text-[#6C7A89] uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
}

// --- Campaign Manager Sub-Component ---
interface CampaignManagerProps { startupId: number; startupName: string; }
function CampaignManager({ startupId, startupName }: CampaignManagerProps) {
  const [campaigns, setCampaigns] = useState<{ id: number; targetAmount: number; raisedAmount: number; minInvestment: number; status: string; deadline: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ target_amount: 0, min_investment: 0, valuation: 0, revenue: 0, revenue_share: 0, burn_rate: 0, runway: 0, gross_margin: 0, status: 'active', deadline: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const loadCampaigns = () => {
    setLoading(true);
    startupService.getCampaignsByStartup(startupId)
      .then(res => setCampaigns(res.campaigns ?? []))
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCampaigns(); }, [startupId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const res = await startupService.createCampaign({ startup_id: startupId, ...form });
      if (res.success) {
        setMsg('Campaign created!');
        setShowForm(false);
        setForm({ target_amount: 0, min_investment: 0, valuation: 0, revenue: 0, revenue_share: 0, burn_rate: 0, runway: 0, gross_margin: 0, status: 'active', deadline: '' });
        loadCampaigns();
      } else {
        setMsg(res.message || 'Failed to create campaign.');
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed to create campaign.');
    } finally { setSaving(false); }
  };

  const handleDelete = async (campaignId: number) => {
    if (!confirm('Delete this campaign?')) return;
    try {
      await startupService.deleteCampaign(campaignId);
      loadCampaigns();
    } catch { /* ignore */ }
  };

  return (
    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0F1720]">Campaigns for {startupName}</h3>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4" /> {showForm ? 'Cancel' : 'New Campaign'}
        </button>
      </div>
      {msg && <p className="mb-3 text-sm text-[#274060]">{msg}</p>}
      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8] space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Target Amount *</label>
              <input type="number" required min={1} value={form.target_amount || ''} onChange={e => setForm(f => ({ ...f, target_amount: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Min Investment *</label>
              <input type="number" required min={1} value={form.min_investment || ''} onChange={e => setForm(f => ({ ...f, min_investment: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Valuation *</label>
              <input type="number" required min={1} value={form.valuation || ''} onChange={e => setForm(f => ({ ...f, valuation: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Revenue</label>
              <input type="number" value={form.revenue || ''} onChange={e => setForm(f => ({ ...f, revenue: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Revenue Share % *</label>
              <input type="number" required min={0} max={100} value={form.revenue_share || ''} onChange={e => setForm(f => ({ ...f, revenue_share: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Burn Rate</label>
              <input type="number" value={form.burn_rate || ''} onChange={e => setForm(f => ({ ...f, burn_rate: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Runway (months)</label>
              <input type="number" value={form.runway || ''} onChange={e => setForm(f => ({ ...f, runway: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Gross Margin %</label>
              <input type="number" value={form.gross_margin || ''} onChange={e => setForm(f => ({ ...f, gross_margin: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Deadline *</label>
              <input type="date" required value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm">
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="px-5 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60">
            {saving ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      )}
      {loading ? (
        <p className="text-sm text-[#6B7A8C]">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-sm text-[#6B7A8C]">No campaigns yet. Create one to start raising funds.</p>
      ) : (
        <div className="space-y-3">
          {campaigns.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8]">
              <div>
                <p className="font-semibold text-[#0F1720]">${(c.targetAmount ?? 0).toLocaleString()}</p>
                <p className="text-xs text-[#6B7A8C]">Raised: ${(c.raisedAmount ?? 0).toLocaleString()} · Min: ${(c.minInvestment ?? 0).toLocaleString()}</p>
                <p className="text-xs text-[#6B7A8C]">Status: <span className="font-medium">{c.status}</span> · Deadline: {c.deadline ? new Date(c.deadline).toLocaleDateString() : '-'}</p>
              </div>
              <button onClick={() => handleDelete(c.id)}
                className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Bank Info Manager Sub-Component ---
interface BankInfoManagerProps { startupId: number; startupName: string; }
function BankInfoManager({ startupId, startupName }: BankInfoManagerProps) {
  const [bankInfo, setBankInfo] = useState<{ id?: number; mfo?: string; account_number?: string; receipant_name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ mfo: '', account_number: '', receipant_name: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const loadBankInfo = () => {
    setLoading(true);
    startupService.getBankInfoByStartup(startupId)
      .then(res => {
        if (res.success && res.id) {
          setBankInfo({ id: res.id, mfo: res.mfo, account_number: res.accountNumber, receipant_name: res.receipientName });
          setForm({ mfo: res.mfo || '', account_number: res.accountNumber || '', receipant_name: res.receipientName || '' });
        } else {
          setBankInfo(null);
        }
      })
      .catch(() => setBankInfo(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadBankInfo(); }, [startupId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      const data = { startup_id: startupId, ...form };
      const res = bankInfo?.id
        ? await startupService.updateBankInfo({ bank_info_id: bankInfo.id, ...data })
        : await startupService.createBankInfo(data);
      if (res.success) {
        setMsg(bankInfo?.id ? 'Bank info updated!' : 'Bank info created!');
        setShowForm(false);
        loadBankInfo();
      } else {
        setMsg(res.message || 'Failed to save bank info.');
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed to save bank info.');
    } finally { setSaving(false); }
  };

  return (
    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0F1720]">Bank Info for {startupName}</h3>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4" /> {showForm ? 'Cancel' : bankInfo ? 'Edit' : 'Add'}
        </button>
      </div>
      {msg && <p className="mb-3 text-sm text-[#274060]">{msg}</p>}
      {loading ? (
        <p className="text-sm text-[#6B7A8C]">Loading...</p>
      ) : showForm ? (
        <form onSubmit={handleSave} className="space-y-3 p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8]">
          <div>
            <label className="block text-xs font-medium text-[#6B7A8C] mb-1">MFO *</label>
            <input type="text" required value={form.mfo} onChange={e => setForm(f => ({ ...f, mfo: e.target.value }))}
              className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Account Number *</label>
            <input type="text" required value={form.account_number} onChange={e => setForm(f => ({ ...f, account_number: e.target.value }))}
              className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Recipient Name *</label>
            <input type="text" required value={form.receipant_name} onChange={e => setForm(f => ({ ...f, receipant_name: e.target.value }))}
              className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
          </div>
          <button type="submit" disabled={saving}
            className="px-5 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : bankInfo?.id ? 'Update' : 'Save'}
          </button>
        </form>
      ) : bankInfo ? (
        <div className="p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8]">
          <p className="text-sm"><span className="font-medium">MFO:</span> {bankInfo.mfo}</p>
          <p className="text-sm"><span className="font-medium">Account:</span> {bankInfo.account_number}</p>
          <p className="text-sm"><span className="font-medium">Recipient:</span> {bankInfo.receipant_name}</p>
        </div>
      ) : (
        <p className="text-sm text-[#6B7A8C]">No bank info added yet.</p>
      )}
    </div>
  );
}

// --- Campaign Update Manager (Documents) Sub-Component ---
interface CampaignUpdateManagerProps { startupId: number; startupName: string; }
function CampaignUpdateManager({ startupId, startupName }: CampaignUpdateManagerProps) {
  const [campaigns, setCampaigns] = useState<{ id: number; status: string }[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [updates, setUpdates] = useState<{ id?: number; title: string; body: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', body: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    startupService.getCampaignsByStartup(startupId)
      .then(res => {
        const camps = res.campaigns ?? [];
        setCampaigns(camps.map(c => ({ id: c.id, status: c.status })));
        if (camps.length > 0) setSelectedCampaignId(camps[0].id);
      })
      .catch(err => setLoadError(err instanceof Error ? err.message : 'Failed to load campaigns'));
  }, [startupId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId) return;
    setSaving(true); setMsg(null);
    try {
      const res = await startupService.createCampaignUpdate({ compaign_id: selectedCampaignId, title: form.title, body: form.body });
      if (res.success) {
        setMsg('Update posted successfully!');
        setUpdates(prev => [{ title: form.title, body: form.body }, ...prev]);
        setForm({ title: '', body: '' });
        setShowForm(false);
      } else {
        setMsg(res.message || 'Failed to post update.');
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Failed to post update.');
    } finally { setSaving(false); }
  };

  return (
    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#0F1720]">Campaign Updates / Documents</h3>
        {campaigns.length > 0 && (
          <button onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors flex items-center gap-1">
            <Plus className="w-4 h-4" /> {showForm ? 'Cancel' : 'Post Update'}
          </button>
        )}
      </div>
      {msg && <p className="mb-3 text-sm text-[#274060] font-medium">{msg}</p>}
      {loadError && <p className="mb-3 text-sm text-red-600">{loadError}</p>}
      {!loadError && campaigns.length === 0 ? (
        <p className="text-sm text-[#6B7A8C]">Create a campaign first to post updates.</p>
      ) : (
        <>
          {campaigns.length > 1 && (
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Campaign</label>
              <select value={selectedCampaignId ?? ''} onChange={e => setSelectedCampaignId(Number(e.target.value))}
                className="px-3 py-2 border border-[#DCE3E8] rounded text-sm">
                {campaigns.map(c => <option key={c.id} value={c.id}>Campaign #{c.id} ({c.status})</option>)}
              </select>
            </div>
          )}
          {showForm && (
            <form onSubmit={handleCreate} className="mb-6 p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8] space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Title *</label>
                <input type="text" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Q1 Update, Milestone Reached..." className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Body *</label>
                <textarea required rows={4} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  placeholder="Share your progress, milestones, or documents link..."
                  className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm resize-none" />
              </div>
              <button type="submit" disabled={saving}
                className="px-5 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60">
                {saving ? 'Posting...' : 'Post Update'}
              </button>
            </form>
          )}
          {updates.length === 0 ? (
            <p className="text-sm text-[#6B7A8C]">No updates posted yet. Post your first campaign update above.</p>
          ) : (
            <div className="space-y-3">
              {updates.map((u, i) => (
                <div key={i} className="p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8]">
                  <p className="font-semibold text-[#0F1720] text-sm">{u.title}</p>
                  <p className="text-sm text-[#6B7A8C] mt-1">{u.body}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// --- Media Manager Sub-Component (YouTube video + documents) ---
const DOC_TYPE_LABELS: Record<string, string> = {
  pitch_deck: 'Pitch Deck',
  financial_report: 'Financial Report',
  business_plan: 'Business Plan',
  legal_document: 'Legal Document',
  other: 'Other',
};

interface MediaManagerProps { startupId: number; startupName: string; }
function MediaManager({ startupId, startupName }: MediaManagerProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [savedUrl, setSavedUrl] = useState<string | null>(null);
  const [videoMsg, setVideoMsg] = useState<string | null>(null);
  const [savingVideo, setSavingVideo] = useState(false);

  const [documents, setDocuments] = useState<{ id: number; title: string; doc_type: string; file_url: string }[]>([]);
  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState({ title: '', doc_type: 'pitch_deck', file_url: '' });
  const [savingDoc, setSavingDoc] = useState(false);
  const [docMsg, setDocMsg] = useState<string | null>(null);

  useEffect(() => {
    startupService.getVideo(startupId)
      .then(r => { if (r.youtube_url) { setSavedUrl(r.youtube_url); setVideoUrl(r.youtube_url); } })
      .catch(() => {});
    startupService.getDocuments(startupId)
      .then(r => setDocuments(r.documents ?? []))
      .catch(() => {});
  }, [startupId]);

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingVideo(true); setVideoMsg(null);
    try {
      await startupService.setVideo(startupId, videoUrl);
      setSavedUrl(videoUrl);
      setVideoMsg('Video URL saved!');
    } catch (err) {
      setVideoMsg(err instanceof Error ? err.message : 'Failed to save video URL.');
    } finally { setSavingVideo(false); }
  };

  const handleDeleteVideo = async () => {
    try {
      await startupService.deleteVideo(startupId);
      setSavedUrl(null); setVideoUrl(''); setVideoMsg('Video removed.');
    } catch { setVideoMsg('Failed to remove video.'); }
  };

  const handleAddDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDoc(true); setDocMsg(null);
    try {
      const res = await startupService.addDocument(startupId, docForm);
      if (res.success) {
        setDocuments(prev => [{ id: res.id, ...docForm }, ...prev]);
        setDocForm({ title: '', doc_type: 'pitch_deck', file_url: '' });
        setShowDocForm(false);
        setDocMsg('Document added!');
      }
    } catch (err) {
      setDocMsg(err instanceof Error ? err.message : 'Failed to add document.');
    } finally { setSavingDoc(false); }
  };

  const handleDeleteDoc = async (docId: number) => {
    try {
      await startupService.deleteDocument(startupId, docId);
      setDocuments(prev => prev.filter(d => d.id !== docId));
    } catch { setDocMsg('Failed to delete document.'); }
  };

  return (
    <div className="space-y-6 mt-6">
      {/* YouTube Video */}
      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#0F1720] mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-[#274060]" fill="currentColor" />
          Pitch & Demo Video
        </h3>
        {videoMsg && <p className="mb-3 text-sm text-[#274060] font-medium">{videoMsg}</p>}
        {savedUrl && (
          <div className="mb-4 rounded-lg overflow-hidden border border-[#DCE3E8] aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${(() => { try { const u = new URL(savedUrl); return u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v') ?? ''; } catch { return ''; } })()}`}
              title="Pitch Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <form onSubmit={handleSaveVideo} className="flex gap-2">
          <input
            type="url"
            required
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 px-3 py-2 border border-[#DCE3E8] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#274060]"
          />
          <button type="submit" disabled={savingVideo}
            className="px-4 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60">
            {savingVideo ? 'Saving...' : 'Save'}
          </button>
          {savedUrl && (
            <button type="button" onClick={handleDeleteVideo}
              className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
              Remove
            </button>
          )}
        </form>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#0F1720] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#274060]" />
            Documents & Resources
          </h3>
          <button onClick={() => setShowDocForm(!showDocForm)}
            className="px-4 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors flex items-center gap-1">
            <Plus className="w-4 h-4" /> {showDocForm ? 'Cancel' : 'Add Document'}
          </button>
        </div>
        {docMsg && <p className="mb-3 text-sm text-[#274060] font-medium">{docMsg}</p>}

        {showDocForm && (
          <form onSubmit={handleAddDoc} className="mb-5 p-4 bg-[#F5F7FA] rounded-lg border border-[#DCE3E8] space-y-3">
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Title *</label>
              <input type="text" required value={docForm.title} onChange={e => setDocForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Q1 2025 Financial Report"
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Document Type *</label>
              <select value={docForm.doc_type} onChange={e => setDocForm(f => ({ ...f, doc_type: e.target.value }))}
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm">
                {Object.entries(DOC_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7A8C] mb-1">Link (URL) *</label>
              <input type="url" required value={docForm.file_url} onChange={e => setDocForm(f => ({ ...f, file_url: e.target.value }))}
                placeholder="https://drive.google.com/... or any public link"
                className="w-full px-3 py-2 border border-[#DCE3E8] rounded text-sm" />
            </div>
            <button type="submit" disabled={savingDoc}
              className="px-5 py-2 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60">
              {savingDoc ? 'Adding...' : 'Add Document'}
            </button>
          </form>
        )}

        {documents.length === 0 ? (
          <p className="text-sm text-[#6B7A8C]">No documents added yet. Add a Google Drive or Dropbox link.</p>
        ) : (
          <div className="space-y-2">
            {documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-4 h-4 text-[#274060] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0F1720] truncate">{doc.title}</p>
                    <p className="text-xs text-[#6B7A8C] capitalize">{DOC_TYPE_LABELS[doc.doc_type] ?? doc.doc_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#274060] hover:underline">Open</a>
                  <button onClick={() => handleDeleteDoc(doc.id)}
                    className="text-xs text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface FounderControlPanelProps {
  onNavigate?: (page: string) => void;
}

export default function FounderControlPanel({ onNavigate }: FounderControlPanelProps) {
  const { user: authUser } = useAuth();
  const currentUserId = authUser?.userId ?? '';
  const [activeSection, setActiveSection] = useState('home');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isStartupsDropdownOpen, setIsStartupsDropdownOpen] = useState(false);
  const [isAnalyticsDropdownOpen, setIsAnalyticsDropdownOpen] = useState(false);
  const [isInvestorsDropdownOpen, setIsInvestorsDropdownOpen] = useState(false);
  const [isAIReportExpanded, setIsAIReportExpanded] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState('');
  const [isStartupDropdownOpen, setIsStartupDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    financial: false,
    pitchDeck: false,
    companyInfo: false,
    teamMembers: false,
    investorInquiries: false
  });
  const [expandedStartupRow, setExpandedStartupRow] = useState<string | null>(null);
  const [expandedAISection, setExpandedAISection] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Array<{id: string; participants: string[]; last_message?: string; last_sender?: string; messages_count: number; created_at: string}>>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [convMessages, setConvMessages] = useState<Array<{id: string; sender_id: string; text: string; created_at: string}>>([]);
  const [messageText, setMessageText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  // AI chatbot state
  const AI_CONV_ID = '__ai_assistant__';
  const [aiMessages, setAiMessages] = useState<Array<{role: 'user'|'ai'; text: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [aiSessionId, setAiSessionId] = useState<string | undefined>(undefined);
  const [aiLoading, setAiLoading] = useState(false);

  // Investments state
  const [myInvestments, setMyInvestments] = useState<Array<{id: string; user_id: string; startup_id: number; campaign_id: number; amount: number; status: string; created_at: string}>>([]);

  useEffect(() => {
    if (activeSection === 'messages') {
      messageService.getConversations().then(res => setConversations(res.conversations ?? [])).catch(() => {});
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeConvId && activeConvId !== AI_CONV_ID) {
      messageService.getMessages(activeConvId).then(res => setConvMessages(res.messages ?? [])).catch(() => {});
    }
  }, [activeConvId]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || activeConvId === AI_CONV_ID) return;
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
      const updatedConv = convs.find(c => c.participants.includes(receiverId));
      if (updatedConv) {
        setActiveConvId(updatedConv.id);
        const msgs = await messageService.getMessages(updatedConv.id);
        setConvMessages(msgs.messages ?? []);
      } else if (activeConvId) {
        const msgs = await messageService.getMessages(activeConvId);
        setConvMessages(msgs.messages ?? []);
      }
    } catch { /* ignore */ }
    finally { setSendingMsg(false); }
  };

  const [pendingReceiverId, setPendingReceiverId] = useState<string | null>(null);

  const handleMessageInvestor = async (investorId: string) => {
    setActiveSection('messages');
    try {
      const convsRes = await messageService.getConversations();
      const convs = convsRes.conversations ?? [];
      setConversations(convs);
      const existing = convs.find(c => c.participants.includes(investorId));
      if (existing) {
        setActiveConvId(existing.id);
      } else {
        setActiveConvId(null);
        setPendingReceiverId(investorId);
      }
    } catch {
      setPendingReceiverId(investorId);
    }
  };

  const handleAiSend = async () => {
    if (!aiInput.trim() || aiLoading) return;
    const userText = aiInput.trim();
    setAiMessages(prev => [...prev, { role: 'user', text: userText }, { role: 'ai', text: '' }]);
    setAiInput('');
    setAiLoading(true);
    try {
      await chatService.streamMessage(
        userText,
        aiSessionId,
        (token) => {
          setAiMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'ai', text: updated[updated.length - 1].text + token };
            return updated;
          });
        },
        (sid) => { setAiSessionId(sid); setAiLoading(false); },
        (err) => {
          setAiMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'ai', text: `Error: ${err}` };
            return updated;
          });
          setAiLoading(false);
        },
      );
    } catch (err) {
      setAiMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'ai', text: 'Could not reach the AI assistant. Please try again.' };
        return updated;
      });
      setAiLoading(false);
    }
  };

  const [myStartups, setMyStartups] = useState<{ id: number; name: string; industry?: string }[]>([]);
  const [createForm, setCreateForm] = useState({
    name: '', description: '', location: '', website_url: '',
    team_size: 0, category_id: 0, stage_id: 0, founded_at: ''
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const [startupCampaigns, setStartupCampaigns] = useState<Record<number, CampaignSummary[]>>({});

  useEffect(() => {
    startupService.getMyStartups()
      .then(res => {
        const list = res.startups ?? [];
        setMyStartups(list);
        if (list.length > 0 && !selectedStartup) setSelectedStartup(list[0].name);
        list.forEach(s => {
          startupService.getCampaignsByStartup(s.id)
            .then(r => setStartupCampaigns(prev => ({ ...prev, [s.id]: r.campaigns ?? [] })))
            .catch(() => {});
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (myStartups.length === 0) return;
    if (activeSection === 'investor-relationships' || activeSection === 'investor-analytics' || activeSection === 'ai-investor-intelligence' || activeSection === 'home') {
      Promise.all(myStartups.map(s => investService.investmentsByStartup(s.id)))
        .then(results => setMyInvestments(results.flatMap(r => r.investments ?? [])))
        .catch(() => {});
    }
  }, [activeSection, myStartups]);

  const handleCreateStartup = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);
    setCreateLoading(true);
    try {
      const res = await startupService.createStartup(createForm);
      if (res.success) {
        setCreateSuccess(res.message || 'Startup created successfully!');
        setCreateForm({ name: '', description: '', location: '', website_url: '', team_size: 0, category_id: 0, stage_id: 0, founded_at: '' });
        const refreshed = await startupService.getMyStartups();
        setMyStartups(refreshed.startups ?? []);
      } else {
        setCreateError(res.message || 'Failed to create startup.');
      }
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create startup.');
    } finally {
      setCreateLoading(false);
    }
  };

  const toggleCheckItem = (item: keyof typeof checkedItems) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const toggleStartupRow = (startupName: string) => {
    setExpandedStartupRow(expandedStartupRow === startupName ? null : startupName);
  };

  const toggleAISection = (startupName: string) => {
    setExpandedAISection(expandedAISection === startupName ? null : startupName);
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#172A45] flex flex-col">
        {/* Logo Area */}
        <div 
          onClick={() => onNavigate && onNavigate('home')}
          className="px-6 py-5 border-b border-[#3A5A7A] cursor-pointer hover:bg-[#1a2f4a] transition-colors duration-200"
        >
          <h1 className="text-2xl font-semibold text-white">EquityFlow</h1>
          <p className="text-xs text-[#6C7A89] mt-1">Founder Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            label="Home"
            onClick={() => setActiveSection('home')}
            active={activeSection === 'home'}
          />
          {/* Analytics Dropdown */}
          <div>
            <button
              onClick={() => setIsAnalyticsDropdownOpen(!isAnalyticsDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 text-white hover:bg-[#3A5A7A] group"
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className={`w-5 h-5 transition-colors duration-200 ${isAnalyticsDropdownOpen ? 'text-white' : 'text-[#6C7A89]'}`} />
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAnalyticsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Analytics Dropdown List */}
            {isAnalyticsDropdownOpen && (
              <div className="bg-[#0A192F]/50">
                <button
                  onClick={() => setActiveSection('dashboard-overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'dashboard-overview'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard Overview</span>
                </button>
                <button
                  onClick={() => setActiveSection('ai-analysis')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'ai-analysis'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Insights</span>
                </button>
                <button
                  onClick={() => setActiveSection('reports')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'reports'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <FileBarChart className="w-4 h-4" />
                  <span>Reports</span>
                </button>
              </div>
            )}
          </div>
          
          {/* My Startups Dropdown */}
          <div>
            <button
              onClick={() => setIsStartupsDropdownOpen(!isStartupsDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 text-white hover:bg-[#3A5A7A] group"
            >
              <div className="flex items-center space-x-3">
                <Building2 className={`w-5 h-5 transition-colors duration-200 ${isStartupsDropdownOpen ? 'text-white' : 'text-[#6C7A89]'}`} />
                <span className="text-sm font-medium">My Startups</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isStartupsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown List */}
            {isStartupsDropdownOpen && (
              <div className="bg-[#0A192F]/50">
                {myStartups.map(s => {
                  const key = `startup-${s.name.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(key)}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                        activeSection === key ? 'bg-[#274060] text-white' : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setActiveSection('create-startup')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'create-startup'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Startup</span>
                </button>
              </div>
            )}
          </div>

          {/* Investors Dropdown */}
          <div>
            <button
              onClick={() => setIsInvestorsDropdownOpen(!isInvestorsDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 text-white hover:bg-[#3A5A7A] group"
            >
              <div className="flex items-center space-x-3">
                <Users className={`w-5 h-5 transition-colors duration-200 ${isInvestorsDropdownOpen ? 'text-white' : 'text-[#6C7A89]'}`} />
                <span className="text-sm font-medium">Investors</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isInvestorsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Investors Dropdown List */}
            {isInvestorsDropdownOpen && (
              <div className="bg-[#0A192F]/50">
                <button
                  onClick={() => setActiveSection('investor-relationships')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'investor-relationships'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <Handshake className="w-4 h-4" />
                  <span>Investor Relationships</span>
                </button>
                <button
                  onClick={() => setActiveSection('investor-analytics')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'investor-analytics'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                  <span>Investor Analytics</span>
                </button>
                <button
                  onClick={() => setActiveSection('ai-investor-intelligence')}
                  className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${
                    activeSection === 'ai-investor-intelligence'
                      ? 'bg-[#274060] text-white'
                      : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>AI Investor Intelligence</span>
                </button>
              </div>
            )}
          </div>
          <SidebarItem
            icon={<MessageSquare className="w-5 h-5" />}
            label="Messages"
            onClick={() => setActiveSection('messages')}
            active={activeSection === 'messages'}
          />
        </nav>

        {/* Bottom Profile Section */}
        <div className="border-t border-[#3A5A7A] p-4 relative">
          <div className="w-full flex items-center space-x-3 hover:bg-[#3A5A7A] p-2 rounded-lg transition-colors duration-200">
            {/* Avatar */}
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-3 flex-1 cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#6C7A89] text-white text-sm font-semibold flex-shrink-0">
                FU
              </div>
              
              {/* Name and Role */}
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white">Founder User</p>
                <p className="text-xs text-[#6C7A89]">Founder</p>
              </div>

              {/* Chevron */}
              <ChevronDown className={`w-4 h-4 text-[#6C7A89] transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Bell Icon - Separate Button */}
            <button 
              className="p-1 hover:bg-[#274060] rounded transition-colors duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Handle notification click
              }}
            >
              <BellIcon className="w-4 h-4 text-[#6C7A89] hover:text-white" />
            </button>
          </div>

          {/* Profile Dropdown (Opens Upward) */}
          {isProfileDropdownOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-[#DCE3E8]">
                <p className="text-sm font-semibold text-[#0F1720]">Founder User</p>
                <p className="text-xs text-[#6B7A8C] mt-1">founder@equityflow.com</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <Users className="w-4 h-4" />
                  <span>Team Members</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <Building2 className="w-4 h-4" />
                  <span>My Companies</span>
                </button>

                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Language: {language}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isLanguageDropdownOpen && (
                    <div className="px-4 py-2 bg-[#F5F7FA]">
                      {['EN', 'RU', 'UZ'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-sm rounded transition-colors duration-200 cursor-pointer ${
                            language === lang
                              ? 'bg-[#274060] text-white'
                              : 'text-[#0F1720] hover:bg-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & Support</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <RefreshCw className="w-4 h-4" />
                  <span>Switch Role</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-[#DCE3E8] py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeSection === 'home' ? (
          <>
            {/* Home Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">Home</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">Welcome to EquityFlow.</p>
                </div>
              </div>
            </header>

            <div className="p-8">
              {(() => {
                const allCamps = Object.values(startupCampaigns).flat();
                const totalRaised = allCamps.reduce((s, c) => s + (c.raisedAmount ?? 0), 0);
                const totalTarget = allCamps.reduce((s, c) => s + (c.targetAmount ?? 0), 0);
                const activeCamps = allCamps.filter(c => c.status === 'active');
                const fundingPct = totalTarget > 0 ? Math.round((totalRaised / totalTarget) * 100) : 0;
                return (
                  <>
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 bg-[#EEF2F7] rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-[#274060]" />
                          </div>
                          <p className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wider">My Startups</p>
                        </div>
                        <p className="text-3xl font-bold text-[#0F1720]">{myStartups.length}</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">registered on platform</p>
                      </div>
                      <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 bg-[#EEF2F7] rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-[#274060]" />
                          </div>
                          <p className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wider">Total Raised</p>
                        </div>
                        <p className="text-3xl font-bold text-[#0F1720]">${totalRaised.toLocaleString()}</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">of ${totalTarget.toLocaleString()} target</p>
                      </div>
                      <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 bg-[#EEF2F7] rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#274060]" />
                          </div>
                          <p className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wider">Funding Progress</p>
                        </div>
                        <p className="text-3xl font-bold text-[#0F1720]">{fundingPct}%</p>
                        <div className="mt-2 w-full bg-[#DCE3E8] rounded-full h-1.5">
                          <div className="bg-[#274060] h-1.5 rounded-full" style={{ width: `${Math.min(fundingPct, 100)}%` }} />
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 bg-[#EEF2F7] rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-[#274060]" />
                          </div>
                          <p className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wider">Active Campaigns</p>
                        </div>
                        <p className="text-3xl font-bold text-[#0F1720]">{activeCamps.length}</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">of {allCamps.length} total</p>
                      </div>
                    </div>

                    {myStartups.length > 0 ? (
                      <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-base font-semibold text-[#0F1720]">Your Startups</h3>
                          <button onClick={() => setActiveSection('create-startup')}
                            className="flex items-center gap-1 text-sm text-[#274060] hover:text-[#3A5A7A] font-medium">
                            <Plus className="w-4 h-4" /> New Startup
                          </button>
                        </div>
                        <div className="space-y-3">
                          {myStartups.map(s => {
                            const camps = startupCampaigns[s.id] ?? [];
                            const raised = camps.reduce((sum, c) => sum + (c.raisedAmount ?? 0), 0);
                            const target = camps.reduce((sum, c) => sum + (c.targetAmount ?? 0), 0);
                            const pct = target > 0 ? Math.round((raised / target) * 100) : 0;
                            const activeCamp = camps.find(c => c.status === 'active');
                            return (
                              <div key={s.id}
                                onClick={() => setActiveSection(`startup-${s.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                className="flex items-center justify-between p-4 rounded-lg border border-[#DCE3E8] hover:border-[#274060] hover:bg-[#F5F7FA] cursor-pointer transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                    {s.name.substring(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-[#0F1720]">{s.name}</p>
                                    <p className="text-xs text-[#6B7A8C]">{camps.length} campaign{camps.length !== 1 ? 's' : ''} · {activeCamp ? 'Active' : 'No active campaign'}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-[#0F1720]">${raised.toLocaleString()}</p>
                                  <p className="text-xs text-[#6B7A8C]">{pct}% funded</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-10 mb-6 text-center">
                        <Building2 className="w-12 h-12 text-[#DCE3E8] mx-auto mb-3" />
                        <p className="font-semibold text-[#0F1720] mb-1">No startups yet</p>
                        <p className="text-sm text-[#6B7A8C] mb-4">Create your first startup to start raising funds.</p>
                        <button onClick={() => setActiveSection('create-startup')}
                          className="px-5 py-2.5 bg-[#274060] text-white text-sm font-medium rounded-lg hover:bg-[#3A5A7A] transition-colors">
                          Create Startup
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-4">
                      <button onClick={() => setActiveSection('create-startup')}
                        className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5 text-left hover:border-[#274060] transition-all group">
                        <div className="w-9 h-9 bg-[#EEF2F7] group-hover:bg-[#274060] rounded-lg flex items-center justify-center mb-3 transition-colors">
                          <Plus className="w-5 h-5 text-[#274060] group-hover:text-white" />
                        </div>
                        <p className="font-semibold text-[#0F1720] text-sm">Create Startup</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">Register a new startup</p>
                      </button>
                      <button onClick={() => { setIsInvestorsDropdownOpen(true); setActiveSection('investor-relationships'); }}
                        className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5 text-left hover:border-[#274060] transition-all group">
                        <div className="w-9 h-9 bg-[#EEF2F7] group-hover:bg-[#274060] rounded-lg flex items-center justify-center mb-3 transition-colors">
                          <Users className="w-5 h-5 text-[#274060] group-hover:text-white" />
                        </div>
                        <p className="font-semibold text-[#0F1720] text-sm">View Investors</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">Manage investor relationships</p>
                      </button>
                      <button onClick={() => setActiveSection('messages')}
                        className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-5 text-left hover:border-[#274060] transition-all group">
                        <div className="w-9 h-9 bg-[#EEF2F7] group-hover:bg-[#274060] rounded-lg flex items-center justify-center mb-3 transition-colors">
                          <MessageSquare className="w-5 h-5 text-[#274060] group-hover:text-white" />
                        </div>
                        <p className="font-semibold text-[#0F1720] text-sm">Messages</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">Chat with investors</p>
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        ) : activeSection === 'ai-analysis' ? (
          <>
            {/* AI Insights Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">AI Insights</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">AI-powered insights and analysis for all your startups.</p>
                </div>
                <button className="px-6 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium flex items-center space-x-2 cursor-pointer">
                  <Plus className="w-5 h-5" />
                  <span>Create New Startup</span>
                </button>
              </div>
            </header>

            {/* AI Analysis Page Content - Row-Based Startup List */}
            <div className="p-8">
              <div className="space-y-4">
                {/* Startup Rows with AI Analysis */}
                {(myStartups.length > 0 ? myStartups : []).map((startup, index) => {
                  const isExpanded = expandedStartupRow === startup.name;
                  const camps = startupCampaigns[startup.id] ?? [];
                  const camp = camps[0];
                  const totalRaised = camps.reduce((s, c) => s + (c.raisedAmount ?? 0), 0);
                  const totalTarget = camps.reduce((s, c) => s + (c.targetAmount ?? 0), 0);
                  const fundingPct = totalTarget > 0 ? `${Math.round((totalRaised / totalTarget) * 100)}%` : '—';
                  const startupData = {
                    revenue: camp ? `$${(camp.revenue ?? 0).toLocaleString()}` : '—',
                    burn: camp ? `$${(camp.burnRate ?? 0).toLocaleString()}` : '—',
                    runway: camp ? `${camp.runway ?? 0} mo` : '—',
                    funding: fundingPct,
                    score: camp ? Math.min(100, Math.round(((camp.grossMargin ?? 0) + ((camp.runway ?? 0) > 12 ? 20 : 0) + ((camp.revenue ?? 0) > 10000 ? 20 : 0)) / 1.4)) : 0,
                    badge: camp ? ((camp.runway ?? 0) > 18 ? 'Healthy' : (camp.runway ?? 0) > 10 ? 'Moderate' : 'Risk') : 'N/A',
                    badgeColor: camp ? (camp.runway > 18 ? '#2F6F5E' : camp.runway > 10 ? '#B38B2D' : '#A94442') : '#6B7A8C',
                  };

                  return (
                    <div key={startup.name} className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm overflow-hidden">
                      {/* Collapsed Row Content */}
                      <button
                        onClick={() => toggleStartupRow(startup.name)}
                        className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer"
                      >
                        {/* Left - Logo and Info */}
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {startup.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-[#0F1720]">{startup.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-[#6C7A89] text-white rounded text-xs font-medium">
                                {startup.location || 'Location N/A'}
                              </span>
                              <span className="px-2 py-0.5 bg-[#172A45] text-white rounded text-xs font-medium">
                                {camp?.status ?? 'No Campaign'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Middle - 4 Compact Stats */}
                        <div className="hidden lg:flex items-center gap-8">
                          <div>
                            <p className="text-xs text-[#6B7A8C]">Revenue</p>
                            <p className="text-lg font-bold text-[#274060]">{startupData.revenue}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7A8C]">Burn Rate</p>
                            <p className="text-lg font-bold text-[#274060]">{startupData.burn}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7A8C]">Runway</p>
                            <p className="text-lg font-bold text-[#274060]">{startupData.runway}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#6B7A8C]">Funding</p>
                            <p className="text-lg font-bold text-[#274060]">{startupData.funding}</p>
                          </div>
                        </div>

                        {/* Right - AI Score and Arrow */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs text-[#6B7A8C] mb-1">AI Score</p>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-[#274060]">{startupData.score}</span>
                              <span className="text-sm text-[#6B7A8C]">/ 100</span>
                            </div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1`} style={{ backgroundColor: `${startupData.badgeColor}1A`, color: startupData.badgeColor }}>
                              {startupData.badge}
                            </span>
                          </div>
                          <ChevronRight className={`w-5 h-5 text-[#6B7A8C] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </button>

                      {/* Expandable Section */}
                      {isExpanded && (
                        <div className="px-6 py-6 bg-[#F5F7FA] border-t border-[#DCE3E8]">
                          {/* Detailed Statistics Grid */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-[#0F1720] mb-4">Detailed Statistics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {[
                                ['Monthly Revenue', startupData.revenue],
                                ['Burn Rate', startupData.burn],
                                ['Runway', startupData.runway],
                                ['Funding Progress', startupData.funding],
                                ['Active Customers', camp ? (camp.activeCustomers ?? 0).toLocaleString() : '—'],
                                ['Gross Margin', camp ? `${camp.grossMargin ?? 0}%` : '—'],
                                ['Valuation', camp ? `$${(camp.valuation ?? 0).toLocaleString()}` : '—'],
                                ['Revenue Share', camp ? `${camp.revenueShare ?? 0}%` : '—'],
                                ['Target Amount', camp ? `$${(camp.targetAmount ?? 0).toLocaleString()}` : '—'],
                                ['Raised Amount', camp ? `$${(camp.raisedAmount ?? 0).toLocaleString()}` : '—'],
                                ['Min Investment', camp ? `$${(camp.minInvestment ?? 0).toLocaleString()}` : '—'],
                                ['Deadline', camp?.deadline ? new Date(camp.deadline).toLocaleDateString() : '—'],
                              ].map(([label, value]) => (
                                <div key={label} className="bg-white p-3 rounded-lg border border-[#DCE3E8]">
                                  <p className="text-xs text-[#6B7A8C] mb-1">{label}</p>
                                  <p className="text-base font-bold text-[#0F1720]">{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* AI Analysis Section */}
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#274060] via-[#172A45] to-[#0A192F] p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(108,122,137,0.15)] via-transparent to-transparent pointer-events-none"></div>
                            
                            <div className="relative">
                              <h4 className="text-lg font-bold text-white mb-4">AI Company Insight</h4>
                              
                              {/* AI Metrics */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div>
                                  <p className="text-xs text-[#DCE3E8] mb-1">AI Confidence Score</p>
                                  <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-white">{startupData.score}</span>
                                    <span className="text-lg text-[#DCE3E8] pb-1">/ 100</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-[#DCE3E8] mb-1">Risk Level</p>
                                  <p className="text-xl font-bold text-white">{startupData.badge}</p>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1" style={{ backgroundColor: `${startupData.badgeColor}4D`, color: 'white', borderColor: `${startupData.badgeColor}66`, borderWidth: '1px' }}>
                                    {startupData.runway !== '—' ? `${startupData.runway} runway` : 'No campaign'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-xs text-[#DCE3E8] mb-1">Gross Margin</p>
                                  <p className="text-xl font-bold text-white">{camp ? `${camp.grossMargin}%` : '—'}</p>
                                </div>
                              </div>

                              {/* AI Analysis Text */}
                              <div className="space-y-3 text-sm text-white">
                                <div>
                                  <span className="font-semibold">Revenue:</span>
                                  <span className="text-[#DCE3E8]"> {camp ? `$${camp.revenue.toLocaleString()} monthly with ${camp.revenueShare}% revenue share to investors.` : 'No campaign data available.'}</span>
                                </div>
                                <div>
                                  <span className="font-semibold">Burn Rate:</span>
                                  <span className="text-[#DCE3E8]"> {camp ? `$${camp.burnRate.toLocaleString()}/mo with ${camp.runway} months runway remaining.` : 'No campaign data available.'}</span>
                                </div>
                                <div>
                                  <span className="font-semibold">Funding Progress:</span>
                                  <span className="text-[#DCE3E8]"> {camp ? `$${(camp.raisedAmount ?? 0).toLocaleString()} raised of $${camp.targetAmount.toLocaleString()} target (${startupData.funding}).` : 'No active campaign.'}</span>
                                </div>
                              </div>

                              {/* Expandable Button */}
                              <button
                                onClick={() => toggleAISection(startup.name)}
                                className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center gap-2"
                              >
                                <span>View Full AI Report</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedAISection === startup.name ? 'rotate-180' : ''}`} />
                              </button>

                              {/* Expandable AI Details */}
                              {expandedAISection === startup.name && (
                                <div className="mt-6 space-y-4 pt-6 border-t border-white/10">
                                  {/* Financial Health */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#2F6F5E]"></div>
                                      Financial Health
                                    </h5>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Monthly Revenue:</span>
                                        <span className="text-white font-semibold">{startupData.revenue}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Burn Rate:</span>
                                        <span className="text-white font-semibold">{startupData.burn}/mo</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Gross Margin:</span>
                                        <span className="text-white font-semibold">{camp ? `${camp.grossMargin}%` : '—'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Runway:</span>
                                        <span className="text-white font-semibold">{startupData.runway}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Campaign Details */}
                                  {camp && (
                                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                      <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#3F5E8C]"></div>
                                        Active Campaign Details
                                      </h5>
                                      <div className="space-y-2 text-sm text-[#DCE3E8]">
                                        <p><span className="text-white font-semibold">Valuation:</span> ${camp.valuation.toLocaleString()}</p>
                                        <p><span className="text-white font-semibold">Min Investment:</span> ${camp.minInvestment.toLocaleString()}</p>
                                        <p><span className="text-white font-semibold">Revenue Share:</span> {camp.revenueShare}%</p>
                                        <p><span className="text-white font-semibold">Active Customers:</span> {(camp.activeCustomers ?? 0).toLocaleString()}</p>
                                        <p><span className="text-white font-semibold">Deadline:</span> {camp.deadline ? new Date(camp.deadline).toLocaleDateString() : '—'}</p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Risk Breakdown */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#B38B2D]"></div>
                                      Risk Assessment
                                    </h5>
                                    <div className="space-y-3 text-sm">
                                      {[
                                        { label: 'Funding Progress', pct: camp && camp.targetAmount > 0 ? Math.round(((camp.raisedAmount ?? 0) / camp.targetAmount) * 100) : 0 },
                                        { label: 'Runway Health', pct: camp ? Math.min(100, Math.round((camp.runway / 24) * 100)) : 0 },
                                        { label: 'Gross Margin', pct: camp ? Math.min(100, camp.grossMargin) : 0 },
                                      ].map(({ label, pct }) => (
                                        <div key={label}>
                                          <div className="flex justify-between mb-1">
                                            <span className="text-[#DCE3E8]">{label}:</span>
                                            <span className="text-white font-semibold">{pct}%</span>
                                          </div>
                                          <div className="w-full bg-white/10 rounded-full h-1.5">
                                            <div className="bg-[#B38B2D] h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Confidence */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#2F6F5E]"></div>
                                      AI Score
                                    </h5>
                                    <div className="flex items-center gap-2 pt-1">
                                      <div className="flex-1 bg-white/10 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-[#2F6F5E] to-[#6C7A89] h-2 rounded-full" style={{ width: `${startupData.score}%` }}></div>
                                      </div>
                                      <span className="text-white font-bold text-xs">{startupData.score}/100</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Disclaimer */}
                              <p className="text-xs text-[#DCE3E8]/70 mt-4">
                                AI insights are predictive and not financial advice.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : activeSection === 'getting-started' ? (
          <>
            {/* Getting Started Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">Getting Started</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">Prepare your startup for investors by completing the steps below.</p>
                </div>
                <div className="px-4 py-2 bg-[#F5F7FA] rounded-lg">
                  <p className="text-xs text-[#6B7A8C]">Each section improves your visibility</p>
                </div>
              </div>
            </header>

            {/* Getting Started Content */}
            <div className="p-8">
              {/* Profile Completion Overview */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0F1720] mb-6">Startup Readiness Progress</h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0F1720]">Profile Completion</span>
                    <span className="text-sm font-bold text-[#274060]">65%</span>
                  </div>
                  <div className="w-full bg-[#F5F7FA] rounded-full h-3">
                    <div
                      className="bg-[#274060] h-3 rounded-full transition-all duration-300"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
                
                <p className="text-sm text-[#6B7A8C]">
                  Complete all required sections to make your startup visible to investors.
                </p>
              </div>

              {/* Step-by-Step Onboarding Roadmap */}
              <div className="space-y-4 mb-6">
                {/* Step 01 */}
                <div className="bg-white rounded-lg border-2 border-[#274060] shadow-sm p-6 relative">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#274060] text-white font-bold text-lg">
                        01
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#0F1720] mb-2">Create Startup Profile</h4>
                      <p className="text-sm text-[#6B7A8C] mb-4">Add company name, description, industry, and location.</p>
                      <button className="px-5 py-2.5 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium text-sm cursor-pointer">
                        Complete Profile
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F7FA] text-[#6B7A8C]">
                        <Circle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 relative">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F5F7FA] text-[#274060] font-bold text-lg">
                        02
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#0F1720] mb-2">Add Founding Team</h4>
                      <p className="text-sm text-[#6B7A8C] mb-4">Show leadership credibility.</p>
                      <button className="px-5 py-2.5 bg-white border border-[#274060] text-[#274060] rounded-lg hover:bg-[#274060] hover:text-white transition-colors duration-200 font-medium text-sm cursor-pointer">
                        Add Team Members
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F7FA] text-[#6B7A8C]">
                        <Circle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 relative">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F5F7FA] text-[#274060] font-bold text-lg">
                        03
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#0F1720] mb-2">Upload Pitch Deck</h4>
                      <p className="text-sm text-[#6B7A8C] mb-4">Provide presentation for investors.</p>
                      <button className="px-5 py-2.5 bg-white border border-[#274060] text-[#274060] rounded-lg hover:bg-[#274060] hover:text-white transition-colors duration-200 font-medium text-sm cursor-pointer">
                        Upload File
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2F6F5E] text-white">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 relative">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F5F7FA] text-[#274060] font-bold text-lg">
                        04
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#0F1720] mb-2">Enter Financial Metrics</h4>
                      <p className="text-sm text-[#6B7A8C] mb-4">Add revenue, growth rate, burn rate.</p>
                      <button className="px-5 py-2.5 bg-white border border-[#274060] text-[#274060] rounded-lg hover:bg-[#274060] hover:text-white transition-colors duration-200 font-medium text-sm cursor-pointer">
                        Add Financials
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F7FA] text-[#6B7A8C]">
                        <Circle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 05 */}
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 relative">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#F5F7FA] text-[#274060] font-bold text-lg">
                        05
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#0F1720] mb-2">Launch Funding Round</h4>
                      <p className="text-sm text-[#6B7A8C] mb-4">Set funding goal and timeline.</p>
                      <button className="px-5 py-2.5 bg-white border border-[#274060] text-[#274060] rounded-lg hover:bg-[#274060] hover:text-white transition-colors duration-200 font-medium text-sm cursor-pointer">
                        Start Funding Round
                      </button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F7FA] text-[#6B7A8C]">
                        <Circle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Action Highlight */}
              <div className="bg-gradient-to-r from-[#F5F7FA] to-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0F1720] mb-3">Recommended Next Action</h3>
                <p className="text-sm text-[#6B7A8C] mb-4">
                  Your financial metrics are incomplete. Investors typically review revenue and growth before contacting founders.
                </p>
                <button className="px-6 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium cursor-pointer">
                  Complete Financial Data
                </button>
              </div>

              {/* Founder Resources & Tips Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Founder Resources Section (2/3 width) */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Founder Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Resource Card 1 */}
                    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-5 hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#274060]">
                            <BarChart3 className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F1720] mb-1 text-sm">How Investors Evaluate Startups</h4>
                          <p className="text-xs text-[#6B7A8C] mb-3">Learn what VCs look for in early-stage companies.</p>
                          <a href="#" className="text-xs text-[#274060] font-medium hover:text-[#3A5A7A]">
                            View Guide →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Resource Card 2 */}
                    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-5 hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#274060]">
                            <FileText className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F1720] mb-1 text-sm">Pitch Deck Best Practices</h4>
                          <p className="text-xs text-[#6B7A8C] mb-3">Structure and design tips for compelling decks.</p>
                          <a href="#" className="text-xs text-[#274060] font-medium hover:text-[#3A5A7A]">
                            View Guide →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Resource Card 3 */}
                    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-5 hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#274060]">
                            <FileBarChart className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F1720] mb-1 text-sm">Financial Metrics Template</h4>
                          <p className="text-xs text-[#6B7A8C] mb-3">Download our standardized financial template.</p>
                          <a href="#" className="text-xs text-[#274060] font-medium hover:text-[#3A5A7A]">
                            View Guide →
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Resource Card 4 */}
                    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-5 hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#274060]">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F1720] mb-1 text-sm">Communicating with Investors</h4>
                          <p className="text-xs text-[#6B7A8C] mb-3">Best practices for investor communication.</p>
                          <a href="#" className="text-xs text-[#274060] font-medium hover:text-[#3A5A7A]">
                            View Guide →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips for Success Section (1/3 width) */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Tips for Better Visibility</h3>
                  <div className="bg-[#F5F7FA] rounded-lg border border-[#DCE3E8] p-5">
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#274060]"></div>
                        </div>
                        <p className="text-sm text-[#6B7A8C]">Keep your description concise</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#274060]"></div>
                        </div>
                        <p className="text-sm text-[#6B7A8C]">Highlight traction and growth</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#274060]"></div>
                        </div>
                        <p className="text-sm text-[#6B7A8C]">Respond quickly to investor messages</p>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#274060]"></div>
                        </div>
                        <p className="text-sm text-[#6B7A8C]">Update progress regularly</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeSection.startsWith('startup-') && myStartups.some(s => `startup-${s.name.toLowerCase().replace(/\s+/g, '-')}` === activeSection) ? (
          <>
            {(() => {
              const sectionName = activeSection.replace('startup-', '');
              const matched = myStartups.find(s => `startup-${s.name.toLowerCase().replace(/\s+/g, '-')}` === activeSection) as StartupSummary;
              if (!matched) return null;
              const camps = startupCampaigns[matched.id] ?? [];
              const activeCamp = camps[0];
              const totalRaised = camps.reduce((s, c) => s + (c.raisedAmount ?? 0), 0);
              const totalTarget = camps.reduce((s, c) => s + (c.targetAmount ?? 0), 0);
              const fundingPct = totalTarget > 0 ? Math.round((totalRaised / totalTarget) * 100) : 0;
              return (
                <>
                  {/* Startup Detail Page */}
                  <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-[#0F1720]">{matched.name}</h2>
                        <p className="text-sm text-[#6B7A8C] mt-1">{matched.description || matched.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#274060]/10 text-[#274060]">
                          {activeCamp?.status ?? 'No Campaign'}
                        </span>
                      </div>
                    </div>
                  </header>

                  <div className="p-8">
                    {/* Key Metrics from real campaign data */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#6B7A8C]">Monthly Revenue</span>
                          <TrendingUp className="w-4 h-4 text-[#2F6F5E]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0F1720]">
                          {activeCamp ? `$${(activeCamp.revenue ?? 0).toLocaleString()}` : '—'}
                        </p>
                        {activeCamp && <p className="text-xs text-[#6B7A8C] mt-1">Gross margin: {activeCamp.grossMargin ?? 0}%</p>}
                      </div>

                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#6B7A8C]">Active Customers</span>
                          <Users className="w-4 h-4 text-[#3F5E8C]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0F1720]">
                          {activeCamp ? (activeCamp.activeCustomers ?? 0).toLocaleString() : '—'}
                        </p>
                        {activeCamp && <p className="text-xs text-[#6B7A8C] mt-1">Revenue share: {activeCamp.revenueShare ?? 0}%</p>}
                      </div>

                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#6B7A8C]">Funding Raised</span>
                          <DollarSign className="w-4 h-4 text-[#B38B2D]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0F1720]">
                          ${totalRaised.toLocaleString()}
                        </p>
                        <p className="text-xs text-[#6B7A8C] mt-1">
                          {fundingPct}% of ${totalTarget.toLocaleString()} goal
                        </p>
                      </div>

                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#6B7A8C]">Burn Rate</span>
                          <BarChart3 className="w-4 h-4 text-[#A94442]" />
                        </div>
                        <p className="text-2xl font-bold text-[#0F1720]">
                          {activeCamp ? `$${(activeCamp.burnRate ?? 0).toLocaleString()}/mo` : '—'}
                        </p>
                        {activeCamp && <p className="text-xs text-[#6B7A8C] mt-1">{activeCamp.runway ?? 0} months runway</p>}
                      </div>
                    </div>

                    {/* Company Overview */}
                    <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                      <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Company Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-[#6B7A8C] mb-2">About</h4>
                          <p className="text-sm text-[#0F1720]">{matched.description || 'No description provided.'}</p>
                          {matched.websiteUrl && (
                            <p className="text-sm mt-2"><span className="text-[#6B7A8C]">Website:</span> <span className="text-[#274060] font-medium">{matched.websiteUrl}</span></p>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[#6B7A8C] mb-2">Key Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#6B7A8C]">Founded:</span>
                              <span className="text-[#0F1720] font-medium">
                                {matched.foundedAt ? new Date(matched.foundedAt).getFullYear() : '—'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#6B7A8C]">Location:</span>
                              <span className="text-[#0F1720] font-medium">{matched.location || '—'}</span>
                            </div>
                            {activeCamp && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-[#6B7A8C]">Valuation:</span>
                                  <span className="text-[#0F1720] font-medium">${(activeCamp.valuation ?? 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#6B7A8C]">Min Investment:</span>
                                  <span className="text-[#0F1720] font-medium">${(activeCamp.minInvestment ?? 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#6B7A8C]">Deadline:</span>
                                  <span className="text-[#0F1720] font-medium">
                                    {activeCamp.deadline ? new Date(activeCamp.deadline).toLocaleDateString() : '—'}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Management */}
                    <CampaignManager startupId={matched.id} startupName={matched.name} />
                    <BankInfoManager startupId={matched.id} startupName={matched.name} />
                    <CampaignUpdateManager startupId={matched.id} startupName={matched.name} />
                    <MediaManager startupId={matched.id} startupName={matched.name} />
                  </div>
                </>
              );
            })()}
          </>
        ) : activeSection === 'investor-relationships' ? (
          <>
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F1720]">Investor Relationships</h2>
                <p className="text-sm text-[#6B7A8C] mt-1">Real investments made into your startups.</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
              {/* Summary Cards - computed from real investments */}
              {(() => {
                const totalRaised = myInvestments.reduce((s, i) => s + (i.amount ?? 0), 0);
                const uniqueInvestors = new Set(myInvestments.map(i => i.user_id)).size;
                const avgAmount = myInvestments.length > 0 ? Math.round(totalRaised / myInvestments.length) : 0;
                const confirmedCount = myInvestments.filter(i => i.status === 'confirmed' || i.status === 'completed').length;
                return (
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Investments</p>
                      <p className="text-2xl font-bold text-[#0F1720]">{myInvestments.length}</p>
                    </div>
                    <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Unique Investors</p>
                      <p className="text-2xl font-bold text-[#0F1720]">{uniqueInvestors}</p>
                    </div>
                    <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Capital Raised</p>
                      <p className="text-2xl font-bold text-[#0F1720]">${totalRaised.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Avg Investment</p>
                      <p className="text-2xl font-bold text-[#0F1720]">${avgAmount.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Investments Table */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm">
                {myInvestments.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-[#6B7A8C] text-sm">No investments received yet. Create campaigns to attract investors.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F5F7FA] border-b border-[#DCE3E8]">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Investor ID</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Startup</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Campaign</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Amount</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Date</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DCE3E8]">
                        {myInvestments.map((inv) => {
                          const startup = myStartups.find(s => s.id === inv.startup_id);
                          return (
                            <tr key={inv.id} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                              <td className="px-6 py-4 text-sm font-mono text-[#6B7A8C]">{inv.user_id.substring(0, 8)}…</td>
                              <td className="px-6 py-4 text-sm font-medium text-[#0F1720]">{startup?.name ?? `#${inv.startup_id}`}</td>
                              <td className="px-6 py-4 text-sm text-[#6B7A8C]">Campaign #{inv.campaign_id}</td>
                              <td className="px-6 py-4 text-sm font-semibold text-[#0F1720]">${inv.amount.toLocaleString()}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                  inv.status === 'confirmed' || inv.status === 'completed' ? 'bg-[#2F6F5E] text-white' :
                                  inv.status === 'pending' ? 'bg-[#B38B2D] text-white' :
                                  'bg-[#3F5E8C] text-white'
                                }`}>
                                  {inv.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#6B7A8C]">
                                {new Date(inv.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleMessageInvestor(inv.user_id)}
                                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#274060] border border-[#274060] rounded hover:bg-[#274060] hover:text-white transition-colors">
                                  <MessageSquare className="w-3 h-3" /> Message
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : activeSection === 'investor-analytics' ? (
          <>
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F1720]">Investor Analytics</h2>
                <p className="text-sm text-[#6B7A8C] mt-1">Breakdown of investment activity across your startups.</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
              {(() => {
                const totalRaised = myInvestments.reduce((s, i) => s + (i.amount ?? 0), 0);
                const totalCount = myInvestments.length;
                const avgAmount = totalCount > 0 ? Math.round(totalRaised / totalCount) : 0;
                const confirmed = myInvestments.filter(i => i.status === 'confirmed' || i.status === 'completed');
                const pending = myInvestments.filter(i => i.status === 'pending');
                const convRate = totalCount > 0 ? Math.round((confirmed.length / totalCount) * 100) : 0;
                const topInv = [...myInvestments].sort((a, b) => b.amount - a.amount)[0];
                const topStartup = topInv ? myStartups.find(s => s.id === topInv.startup_id) : null;

                // Per-startup breakdown
                const perStartup = myStartups.map(s => {
                  const invs = myInvestments.filter(i => i.startup_id === s.id);
                  return { name: s.name, count: invs.length, total: invs.reduce((sum, i) => sum + i.amount, 0) };
                }).filter(s => s.count > 0);
                const maxTotal = Math.max(...perStartup.map(s => s.total), 1);

                return (
                  <>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                        <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Investments</p>
                        <p className="text-2xl font-bold text-[#0F1720]">{totalCount}</p>
                      </div>
                      <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                        <p className="text-xs font-medium text-[#6B7A8C] mb-1">Confirmed Rate</p>
                        <p className="text-2xl font-bold text-[#0F1720]">{convRate}%</p>
                        <p className="text-xs text-[#6B7A8C] mt-1">{confirmed.length} confirmed, {pending.length} pending</p>
                      </div>
                      <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                        <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Raised</p>
                        <p className="text-2xl font-bold text-[#0F1720]">${totalRaised.toLocaleString()}</p>
                      </div>
                      <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                        <p className="text-xs font-medium text-[#6B7A8C] mb-1">Avg Investment</p>
                        <p className="text-2xl font-bold text-[#0F1720]">${avgAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Per-startup breakdown */}
                    {perStartup.length > 0 && (
                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Capital by Startup</h3>
                        <div className="space-y-4">
                          {perStartup.map(s => (
                            <div key={s.name}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-[#0F1720]">{s.name}</span>
                                <span className="text-sm font-semibold text-[#0F1720]">${s.total.toLocaleString()} ({s.count} investors)</span>
                              </div>
                              <div className="w-full bg-[#DCE3E8] rounded-full h-3">
                                <div className="bg-gradient-to-r from-[#3F5E8C] to-[#2F6F5E] h-3 rounded-full" style={{ width: `${Math.round((s.total / maxTotal) * 100)}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Status Breakdown</h3>
                        <div className="space-y-3">
                          {['confirmed', 'pending', 'completed', 'rejected'].map((status, i) => {
                            const count = myInvestments.filter(inv => inv.status === status).length;
                            const colors = ['#2F6F5E', '#B38B2D', '#3F5E8C', '#A94442'];
                            return (
                              <div key={status} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                                  <span className="text-sm text-[#0F1720] capitalize">{status}</span>
                                </div>
                                <span className="text-sm font-semibold text-[#0F1720]">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Capital Overview</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Capital Raised</p>
                            <p className="text-3xl font-bold text-[#0F1720]">${totalRaised.toLocaleString()}</p>
                          </div>
                          {topInv && (
                            <div className="pt-3 border-t border-[#DCE3E8]">
                              <p className="text-xs font-medium text-[#6B7A8C] mb-1">Largest Investment</p>
                              <p className="text-xl font-semibold text-[#0F1720]">${topInv.amount.toLocaleString()}</p>
                              <p className="text-xs text-[#6B7A8C] mt-1">in {topStartup?.name ?? `startup #${topInv.startup_id}`}</p>
                            </div>
                          )}
                          <div className="pt-3 border-t border-[#DCE3E8]">
                            <p className="text-xs font-medium text-[#6B7A8C] mb-1">Average Investment</p>
                            <p className="text-xl font-semibold text-[#0F1720]">${avgAmount.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {totalCount === 0 && (
                      <div className="text-center py-12">
                        <p className="text-[#6B7A8C] text-sm">No investment data yet. Create campaigns to attract investors.</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </>
        ) : activeSection === 'ai-investor-intelligence' ? (
          <>
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F1720]">Investor Intelligence</h2>
                <p className="text-sm text-[#6B7A8C] mt-1">Data-driven insights from your actual investment activity.</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
              {(() => {
                const totalRaised = myInvestments.reduce((s, i) => s + (i.amount ?? 0), 0);
                const uniqueInvestors = [...new Set(myInvestments.map(i => i.user_id))];
                const completedInvs = myInvestments.filter(i => i.status === 'completed' || i.status === 'confirmed');
                const portfolioHealth = myInvestments.length > 0
                  ? Math.round((completedInvs.length / myInvestments.length) * 100)
                  : 0;

                const allCampaigns = Object.values(startupCampaigns).flat();
                const activeCampaigns = allCampaigns.filter(c => c.status === 'active');
                const avgProgress = activeCampaigns.length > 0
                  ? Math.round(activeCampaigns.reduce((s, c) => {
                      const pct = (c.targetAmount ?? 0) > 0 ? ((c.raisedAmount ?? 0) / (c.targetAmount ?? 0)) * 100 : 0;
                      return s + pct;
                    }, 0) / activeCampaigns.length)
                  : 0;

                const investorTotals = myInvestments.reduce<Record<string, {amount: number; count: number; lastDate: string}>>((acc, inv) => {
                  if (!acc[inv.user_id]) acc[inv.user_id] = { amount: 0, count: 0, lastDate: inv.created_at };
                  acc[inv.user_id].amount += inv.amount;
                  acc[inv.user_id].count += 1;
                  if (inv.created_at > acc[inv.user_id].lastDate) acc[inv.user_id].lastDate = inv.created_at;
                  return acc;
                }, {});

                const topInvestors = Object.entries(investorTotals)
                  .sort((a, b) => b[1].amount - a[1].amount)
                  .slice(0, 4);
                const maxInvAmount = topInvestors[0]?.[1].amount ?? 1;

                const recentCutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
                const recentInvs = myInvestments.filter(i => i.created_at >= recentCutoff);

                const underfundedCampaigns = activeCampaigns.filter(c =>
                  (c.targetAmount ?? 0) > 0 && ((c.raisedAmount ?? 0) / (c.targetAmount ?? 0)) < 0.5
                );

                const riskSignals: string[] = [];
                if (myInvestments.length === 0) riskSignals.push('No investments received yet — create active campaigns');
                if (myInvestments.length > 0 && recentInvs.length === 0) riskSignals.push('No new investments in the last 7 days');
                if (underfundedCampaigns.length > 0) riskSignals.push(`${underfundedCampaigns.length} campaign(s) below 50% of funding target`);
                if (riskSignals.length === 0) riskSignals.push('No major risk signals detected');

                const opportunitySignals: string[] = [];
                if (uniqueInvestors.length > 1) opportunitySignals.push(`${uniqueInvestors.length} unique investors are backing you`);
                if (recentInvs.length > 0) opportunitySignals.push(`${recentInvs.length} new investment(s) in the last 7 days`);
                if (activeCampaigns.length > 0) opportunitySignals.push(`${activeCampaigns.length} active campaign(s) open for investment`);
                if (opportunitySignals.length === 0) opportunitySignals.push('Launch active campaigns to start attracting investors');

                const actions: {action: string; urgency: 'High' | 'Medium' | 'Low'; reason: string}[] = [];
                if (underfundedCampaigns.length > 0) {
                  actions.push({ action: 'Boost outreach for underfunded campaign(s)', urgency: 'High', reason: `${underfundedCampaigns.length} campaign(s) are below 50% of their funding target` });
                }
                if (myInvestments.length > 0 && recentInvs.length === 0) {
                  actions.push({ action: 'Re-engage with existing investors', urgency: 'High', reason: 'No new activity in the past 7 days — send an update to maintain momentum' });
                }
                if (activeCampaigns.length === 0 && myStartups.length > 0) {
                  actions.push({ action: 'Launch a new fundraising campaign', urgency: 'Medium', reason: 'No active campaigns found — create one to start receiving investments' });
                }
                if (uniqueInvestors.length > 0 && uniqueInvestors.length < 5) {
                  actions.push({ action: 'Expand your investor network', urgency: 'Medium', reason: `Only ${uniqueInvestors.length} unique investor(s) — diversifying reduces concentration risk` });
                }
                if (actions.length === 0) {
                  actions.push({ action: 'Post a campaign update to all investors', urgency: 'Low', reason: 'Regular updates maintain investor engagement and trust' });
                }

                const perStartupTop = myStartups.map(s => {
                  const invs = myInvestments.filter(i => i.startup_id === s.id);
                  const sorted = [...invs].sort((a, b) => b.amount - a.amount);
                  const top = sorted[0];
                  const second = sorted[1];
                  return {
                    startup: s.name,
                    topInvestor: top ? `Investor …${top.user_id.substring(0, 6)}` : null,
                    topUserId: top?.user_id ?? null,
                    topAmount: top?.amount ?? 0,
                    count: invs.length,
                    nextBest: second ? `Investor …${second.user_id.substring(0, 6)} ($${second.amount.toLocaleString()})` : 'No other investors yet',
                  };
                }).filter(s => s.count > 0);

                const lastInv = myInvestments.length > 0
                  ? [...myInvestments].sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
                  : null;
                const daysSinceLastInv = lastInv
                  ? Math.round((Date.now() - new Date(lastInv.created_at).getTime()) / (1000 * 60 * 60 * 24))
                  : null;

                return (
                  <>
                    <div className="bg-gradient-to-br from-[#0A192F] via-[#172A45] to-[#274060] rounded-xl p-8 mb-6 shadow-lg border border-white/10">
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-xs font-medium text-[#DCE3E8] mb-2">Portfolio Health</p>
                          <p className="text-3xl font-bold text-white mb-1">{portfolioHealth}%</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div className="bg-[#2F6F5E] h-2 rounded-full" style={{ width: `${portfolioHealth}%` }}></div>
                            </div>
                            <span className="text-sm text-[#DCE3E8]">{completedInvs.length}/{myInvestments.length}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#DCE3E8] mb-2">Avg Campaign Progress</p>
                          <p className="text-3xl font-bold text-white">{avgProgress}%</p>
                          <p className="text-xs text-[#DCE3E8] mt-1">{activeCampaigns.length} active campaign(s)</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#DCE3E8] mb-2">Unique Investors</p>
                          <p className="text-3xl font-bold text-white">{uniqueInvestors.length}<span className="text-xl text-[#DCE3E8]"> total</span></p>
                          <p className="text-xs text-[#DCE3E8] mt-1">{myInvestments.length} investments received</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#B38B2D]"></div>
                            Risk Signals
                          </h4>
                          <ul className="space-y-2 text-sm text-[#DCE3E8]">
                            {riskSignals.map((signal, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#B38B2D]">•</span>
                                <span>{signal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#2F6F5E]"></div>
                            Opportunity Signals
                          </h4>
                          <ul className="space-y-2 text-sm text-[#DCE3E8]">
                            {opportunitySignals.map((signal, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#2F6F5E]">•</span>
                                <span>{signal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 mb-4">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Recommended Actions
                        </h4>
                        <ul className="space-y-2 text-sm text-[#DCE3E8]">
                          {actions.map((a, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5" />
                              <span>{a.action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setIsAIReportExpanded(!isAIReportExpanded)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">{isAIReportExpanded ? 'Hide Full Report' : 'View Full Report'}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAIReportExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isAIReportExpanded && (
                        <div className="space-y-6 mt-6">
                          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-[#2F6F5E]" />
                              Top Investors
                            </h3>
                            {topInvestors.length === 0 ? (
                              <p className="text-sm text-[#DCE3E8]">No investors yet. Launch a campaign to start receiving investments.</p>
                            ) : (
                              <div className="space-y-4">
                                {topInvestors.map(([userId, stats], index) => {
                                  const score = Math.round((stats.amount / maxInvAmount) * 100);
                                  const relatedStartup = myStartups.find(s => myInvestments.find(i => i.user_id === userId && i.startup_id === s.id));
                                  return (
                                    <div key={userId} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors duration-200">
                                      <div className="flex items-start justify-between mb-4">
                                        <div>
                                          <h4 className="text-base font-semibold text-white mb-1">Investor …{userId.substring(0, 8)}</h4>
                                          <p className="text-sm text-[#DCE3E8]">Backing: <span className="font-medium text-white">{relatedStartup?.name ?? 'your startup'}</span></p>
                                        </div>
                                        <div className="text-right">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs text-[#DCE3E8]">Score</span>
                                            <span className="text-2xl font-bold text-[#2F6F5E]">{score}</span>
                                          </div>
                                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                            index === 0 ? 'bg-[#2F6F5E] text-white' : 'bg-[#3F5E8C] text-white'
                                          }`}>
                                            {index === 0 ? 'Top Investor' : index === 1 ? 'Strong' : 'Active'}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                          <p className="text-xs text-[#DCE3E8] mb-1">Total Invested</p>
                                          <p className="text-sm font-semibold text-white">${stats.amount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-[#DCE3E8] mb-1">Investments</p>
                                          <p className="text-sm text-white">{stats.count} transaction(s)</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-[#DCE3E8] mb-1">Last Investment</p>
                                          <p className="text-sm font-semibold text-white">{new Date(stats.lastDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-[#DCE3E8] mb-1">Investment Score</p>
                                          <div className="flex items-center gap-2">
                                            <div className="flex-1 bg-white/10 rounded-full h-2">
                                              <div className="bg-gradient-to-r from-[#2F6F5E] to-[#3F5E8C] h-2 rounded-full" style={{ width: `${score}%` }}></div>
                                            </div>
                                            <span className="text-sm font-semibold text-white">{score}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex justify-end">
                                        <button
                                          onClick={() => handleMessageInvestor(userId)}
                                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white border border-white/30 rounded hover:bg-white/10 transition-colors">
                                          <MessageSquare className="w-3 h-3" /> Message
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                              <Brain className="w-5 h-5 text-[#3F5E8C]" />
                              Investment Strategy
                            </h3>
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-3">Priority Actions</h4>
                                <div className="space-y-3">
                                  {actions.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                                      <div className={`w-2 h-2 rounded-full mt-1.5 ${item.urgency === 'High' ? 'bg-[#B38B2D]' : 'bg-[#3F5E8C]'}`}></div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <p className="text-sm font-medium text-white">{item.action}</p>
                                          <span className={`px-2 py-0.5 text-xs font-semibold rounded ${item.urgency === 'High' ? 'bg-[#B38B2D] text-white' : 'bg-[#3F5E8C] text-white'}`}>{item.urgency}</span>
                                        </div>
                                        <p className="text-xs text-[#DCE3E8]">{item.reason}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {perStartupTop.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-3">Top Investors by Startup</h4>
                                  <div className="space-y-3">
                                    {perStartupTop.map((item, index) => (
                                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div>
                                          <p className="text-sm font-semibold text-white mb-1">{item.startup}</p>
                                          <p className="text-xs text-[#DCE3E8]">Next: {item.nextBest}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-xs text-[#DCE3E8] mb-1">Top Investor</p>
                                          <p className="text-sm font-bold text-white">{item.topInvestor}</p>
                                          <p className="text-xs text-[#DCE3E8] mt-1">${item.topAmount.toLocaleString()}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div>
                                <h4 className="text-sm font-semibold text-white mb-3">Investment Timing</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <p className="text-xs text-[#DCE3E8] mb-2">Last Investment</p>
                                    <p className="text-xl font-bold text-white mb-1">
                                      {daysSinceLastInv !== null ? `${daysSinceLastInv}d ago` : 'None yet'}
                                    </p>
                                    <p className="text-xs text-[#DCE3E8]">{lastInv ? new Date(lastInv.created_at).toLocaleDateString() : 'Create a campaign to start'}</p>
                                  </div>
                                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <p className="text-xs text-[#DCE3E8] mb-2">Recent Activity (7d)</p>
                                    <p className="text-xl font-bold text-[#2F6F5E] mb-1">{recentInvs.length} investment(s)</p>
                                    <p className="text-xs text-[#DCE3E8]">${recentInvs.reduce((s, i) => s + i.amount, 0).toLocaleString()} raised</p>
                                  </div>
                                </div>
                              </div>

                              <div className="p-5 bg-white/10 rounded-lg border border-white/20">
                                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                  <Lightbulb className="w-4 h-4" />
                                  Strategic Recommendations
                                </h4>
                                <ul className="space-y-2 text-sm text-[#DCE3E8]">
                                  {topInvestors.length > 0 && (
                                    <li className="flex items-start gap-2">
                                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5" />
                                      <span><strong className="text-white">Engage your top investor:</strong> Investor …{topInvestors[0][0].substring(0, 8)} has contributed ${topInvestors[0][1].amount.toLocaleString()}. Keep them updated on milestones.</span>
                                    </li>
                                  )}
                                  {underfundedCampaigns.length > 0 && (
                                    <li className="flex items-start gap-2">
                                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5" />
                                      <span><strong className="text-white">Boost underfunded campaigns:</strong> {underfundedCampaigns.length} campaign(s) need more traction. Consider posting updates or lowering the minimum investment.</span>
                                    </li>
                                  )}
                                  {uniqueInvestors.length < 3 && (
                                    <li className="flex items-start gap-2">
                                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5" />
                                      <span><strong className="text-white">Diversify your investor base:</strong> Fewer than 3 unique investors creates concentration risk. Expand your outreach.</span>
                                    </li>
                                  )}
                                  <li className="flex items-start gap-2">
                                    <ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5" />
                                    <span><strong className="text-white">Post regular updates:</strong> Investors who receive consistent updates are more likely to participate in future rounds.</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-white rounded-lg border border-[#DCE3E8] p-4">
                      <p className="text-xs text-[#6B7A8C] leading-relaxed">
                        <strong>Note:</strong> Insights are derived from your actual investment data. Keep your campaigns active and updated to receive more accurate analysis.
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        ) : activeSection === 'messages' ? (
          <>
            <div className="h-full flex">
              {/* Left Panel */}
              <div className="w-[35%] bg-white border-r border-[#DCE3E8] flex flex-col">
                <div className="p-4 border-b border-[#DCE3E8]">
                  <p className="text-sm font-semibold text-[#0F1720]">Messages</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {/* AI Assistant pinned at top */}
                  <div
                    onClick={() => setActiveConvId(AI_CONV_ID)}
                    className={`px-4 py-4 border-b border-[#DCE3E8] hover:bg-[#F5F7FA] cursor-pointer relative ${activeConvId === AI_CONV_ID ? 'bg-[#F5F7FA]' : ''}`}
                  >
                    {activeConvId === AI_CONV_ID && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#274060]" />}
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C7A89] to-[#274060] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        AI
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#0F1720] text-sm">AI Assistant</h4>
                        <p className="text-xs text-[#6B7A8C] truncate">Ask anything about your startups…</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#2F6F5E]" />
                    </div>
                  </div>

                  {/* Real conversations */}
                  {conversations.length > 0 ? conversations.map(conv => (
                    <div
                      key={conv.id}
                      onClick={() => setActiveConvId(conv.id)}
                      className={`px-4 py-4 border-b border-[#DCE3E8] hover:bg-[#F5F7FA] cursor-pointer relative ${activeConvId === conv.id ? 'bg-[#F5F7FA]' : ''}`}
                    >
                      {activeConvId === conv.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#274060]" />}
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {(conv.participants.find(p => p !== currentUserId) ?? conv.id).substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-[#0F1720] text-sm truncate">
                              {conv.participants.find(p => p !== currentUserId)?.substring(0, 12) ?? 'Conversation'}
                            </h4>
                            {conv.updated_at && <span className="text-xs text-[#6B7A8C] flex-shrink-0 ml-2">{new Date(conv.updated_at).toLocaleDateString()}</span>}
                          </div>
                          <p className="text-sm text-[#6B7A8C] truncate">{conv.last_message || `${conv.messages_count} messages`}</p>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-xs text-[#6B7A8C]">No investor conversations yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex-1 flex flex-col bg-[#F5F7FA]">
                {activeConvId === AI_CONV_ID ? (
                  <>
                    {/* AI Chat Header */}
                    <div className="bg-white border-b border-[#DCE3E8] p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C7A89] to-[#274060] flex items-center justify-center text-white font-bold text-sm">AI</div>
                        <div>
                          <h3 className="font-bold text-[#0F1720]">AI Assistant</h3>
                          <p className="text-xs text-[#2F6F5E]">Powered by Ollama · Always online</p>
                        </div>
                      </div>
                    </div>
                    {/* AI Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {aiMessages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6C7A89] to-[#274060] flex items-center justify-center text-white text-2xl font-bold">AI</div>
                          <p className="text-[#0F1720] font-semibold">EquityFlow AI Assistant</p>
                          <p className="text-sm text-[#6B7A8C] max-w-xs">Ask me about your startups, campaigns, investment strategies, or anything about the platform.</p>
                        </div>
                      )}
                      {aiMessages.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                          {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C7A89] to-[#274060] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">AI</div>
                          )}
                          <div className={`max-w-[75%] rounded-lg px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-[#274060] text-white' : 'bg-white border border-[#DCE3E8] text-[#0F1720]'}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {aiLoading && aiMessages[aiMessages.length - 1]?.text === '' && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C7A89] to-[#274060] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">AI</div>
                          <div className="bg-white border border-[#DCE3E8] rounded-lg px-4 py-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-[#6B7A8C] animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 rounded-full bg-[#6B7A8C] animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 rounded-full bg-[#6B7A8C] animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* AI Input */}
                    <div className="bg-white border-t border-[#DCE3E8] px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={aiInput}
                          onChange={e => setAiInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAiSend(); } }}
                          placeholder="Ask the AI assistant…"
                          disabled={aiLoading}
                          className="flex-1 px-4 py-3 bg-[#F5F7FA] border border-[#DCE3E8] rounded-lg text-sm text-[#0F1720] placeholder-[#6B7A8C] focus:outline-none focus:border-[#274060] transition-colors"
                        />
                        <button
                          onClick={handleAiSend}
                          disabled={aiLoading || !aiInput.trim()}
                          className="p-3 bg-[#274060] hover:bg-[#3A5A7A] rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Sparkles className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Human Chat Header */}
                    <div className="bg-white border-b border-[#DCE3E8] p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs">
                          {activeConvId
                            ? (conversations.find(c => c.id === activeConvId)?.participants.find(p => p !== currentUserId) ?? pendingReceiverId ?? 'U').substring(0, 2).toUpperCase()
                            : pendingReceiverId ? pendingReceiverId.substring(0, 2).toUpperCase() : '?'}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0F1720]">
                            {activeConvId
                              ? conversations.find(c => c.id === activeConvId)?.participants.find(p => p !== currentUserId)?.substring(0, 16) ?? 'Conversation'
                              : pendingReceiverId ? `Investor ${pendingReceiverId.substring(0, 8)}…` : 'Select a conversation'}
                          </h3>
                          {activeConvId && <p className="text-xs text-[#6B7A8C]">Investor</p>}
                        </div>
                      </div>
                    </div>
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {!activeConvId ? (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-[#6B7A8C] text-sm">Select a conversation or chat with the AI Assistant</p>
                        </div>
                      ) : convMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-[#6B7A8C] text-sm">No messages yet</p>
                        </div>
                      ) : convMessages.map(msg => (
                        <div key={msg.id} className={`flex items-start gap-3 ${msg.sender_id === currentUserId ? 'justify-end' : ''}`}>
                          {msg.sender_id !== currentUserId && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                              {msg.sender_id.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div className={`max-w-[70%]`}>
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
                        <input
                          type="text"
                          value={messageText}
                          onChange={e => setMessageText(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                          placeholder={activeConvId || pendingReceiverId ? 'Write a message…' : 'Select a conversation first'}
                          disabled={!activeConvId && !pendingReceiverId}
                          className="flex-1 px-4 py-3 bg-[#F5F7FA] border border-[#DCE3E8] rounded-lg text-sm text-[#0F1720] placeholder-[#6B7A8C] focus:outline-none focus:border-[#274060] transition-colors"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={sendingMsg || (!activeConvId && !pendingReceiverId) || !messageText.trim()}
                          className="p-3 bg-[#274060] hover:bg-[#3A5A7A] rounded-lg transition-colors disabled:opacity-50"
                        >
                          <MessageSquare className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : activeSection === 'create-startup' ? (
          <>
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">Create New Startup</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">Register your startup on EquityFlow to start raising funds.</p>
                </div>
              </div>
            </header>
            <div className="p-8 max-w-2xl">
              {createSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm font-medium">{createSuccess}</p>
                </div>
              )}
              {createError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">{createError}</p>
                </div>
              )}
              <form onSubmit={handleCreateStartup} className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#0F1720] mb-2">Startup Name *</label>
                  <input type="text" required value={createForm.name} onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="e.g. FinFlow" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F1720] mb-2">Description *</label>
                  <textarea required value={createForm.description} onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} rows={4}
                    className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="Describe your startup..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Location *</label>
                    <input type="text" required value={createForm.location} onChange={e => setCreateForm(f => ({ ...f, location: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="e.g. San Francisco, CA" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Website URL</label>
                    <input type="url" value={createForm.website_url} onChange={e => setCreateForm(f => ({ ...f, website_url: e.target.value }))}
                      className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="https://example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Team Size *</label>
                    <input type="number" required min={1} value={createForm.team_size || ''} onChange={e => setCreateForm(f => ({ ...f, team_size: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="e.g. 10" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Category ID *</label>
                    <input type="number" required min={1} value={createForm.category_id || ''} onChange={e => setCreateForm(f => ({ ...f, category_id: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="e.g. 1" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Stage ID *</label>
                    <input type="number" required min={1} value={createForm.stage_id || ''} onChange={e => setCreateForm(f => ({ ...f, stage_id: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" placeholder="e.g. 1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F1720] mb-2">Founded Date *</label>
                  <input type="date" required value={createForm.founded_at} onChange={e => setCreateForm(f => ({ ...f, founded_at: e.target.value }))}
                    className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" disabled={createLoading}
                    className="px-6 py-3 bg-[#274060] text-white font-semibold rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                    {createLoading ? 'Creating...' : 'Create Startup'}
                  </button>
                  <button type="button" onClick={() => setActiveSection('dashboard-overview')}
                    className="px-6 py-3 border border-[#DCE3E8] text-[#0F1720] font-medium rounded-lg hover:bg-[#F5F7FA] transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
              {myStartups.length > 0 && (
                <div className="mt-8 bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Your Existing Startups</h3>
                  <div className="space-y-2">
                    {myStartups.map(s => (
                      <div key={s.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F5F7FA]">
                        <span className="font-medium text-[#0F1720]">{s.name}</span>
                        <button onClick={() => setActiveSection(`startup-${s.name.toLowerCase().replace(/\s+/g, '-')}`)}
                          className="text-sm text-[#274060] hover:text-[#3A5A7A] font-medium">View</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Dashboard Overview Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">Dashboard Overview</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">Monitor performance and manage your startup activity.</p>
                </div>
                <button className="px-6 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium flex items-center space-x-2 cursor-pointer">
                  <Plus className="w-5 h-5" />
                  <span>Create New Startup</span>
                </button>
              </div>
            </header>

            {/* Dashboard Overview Content */}
            <div className="p-8">
          {/* Startup Switcher Section */}
          <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-[#6B7A8C] mb-3">Active Startup</label>
            <div className="relative">
              <button
                onClick={() => setIsStartupDropdownOpen(!isStartupDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#274060] text-white font-bold text-sm">
                    {selectedStartup.substring(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0F1720]">{selectedStartup}</p>
                    <span className="text-xs text-[#6B7A8C]">
                      {myStartups.find(s => s.name === selectedStartup)?.location ?? ''}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#6B7A8C] transition-transform duration-200 ${isStartupDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isStartupDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden z-10">
                  {myStartups.map((startup) => (
                    <button
                      key={startup.id}
                      onClick={() => {
                        setSelectedStartup(startup.name);
                        setIsStartupDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 cursor-pointer ${
                        selectedStartup === startup.name
                          ? 'bg-[#274060] text-white'
                          : 'hover:bg-[#F5F7FA] text-[#0F1720]'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs ${
                        selectedStartup === startup.name
                          ? 'bg-white text-[#274060]'
                          : 'bg-[#274060] text-white'
                      }`}>
                        {startup.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{startup.name}</p>
                        <p className={`text-xs ${selectedStartup === startup.name ? 'text-white/80' : 'text-[#6B7A8C]'}`}>
                          {startup.location}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsStartupDropdownOpen(false);
                      // Handle create new startup
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-left border-t border-[#DCE3E8] hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F7FA]">
                      <Plus className="w-4 h-4 text-[#274060]" />
                    </div>
                    <span className="font-medium text-[#274060]">Create New Startup</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Compute real aggregates from API data */}
          {(() => {
            const selectedS = myStartups.find(s => s.name === selectedStartup);
            const allCamps = Object.values(startupCampaigns).flat();
            const selCamps = selectedS ? (startupCampaigns[selectedS.id] ?? []) : allCamps;
            const activeCamp = selCamps[0];
            const totalRaised = selCamps.reduce((s, c) => s + (c.raisedAmount ?? 0), 0);
            const totalTarget = selCamps.reduce((s, c) => s + (c.targetAmount ?? 0), 0);
            const fundingPct = totalTarget > 0 ? Math.round((totalRaised / totalTarget) * 100) : 0;
            const totalRevenue = selCamps.reduce((s, c) => s + (c.revenue ?? 0), 0);
            const totalCustomers = selCamps.reduce((s, c) => s + (c.activeCustomers ?? 0), 0);
            const totalBurn = selCamps.reduce((s, c) => s + (c.burnRate ?? 0), 0);
            const avgRunway = selCamps.length > 0 ? Math.round(selCamps.reduce((s, c) => s + (c.runway ?? 0), 0) / selCamps.length) : 0;
            const hasCamps = selCamps.length > 0;

            return (
              <>
                {/* General Statistics Row - 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Total Funding Raised</h3>
                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E]" />
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{hasCamps ? `$${totalRaised.toLocaleString()}` : '—'}</p>
                    {hasCamps && <p className="text-xs text-[#6B7A8C] mt-1">of ${totalTarget.toLocaleString()} target</p>}
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Active Customers</h3>
                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E]" />
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{hasCamps ? totalCustomers.toLocaleString() : '—'}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Funding Progress</h3>
                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E]" />
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{hasCamps ? `${fundingPct}%` : '—'}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">My Startups</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{myStartups.length}</p>
                    <p className="text-xs text-[#6B7A8C] mt-1">{selCamps.length} active campaign{selCamps.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {/* Additional Statistics Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Monthly Revenue</h3>
                      <ArrowUpRight className="w-4 h-4 text-[#2F6F5E]" />
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{hasCamps ? `$${totalRevenue.toLocaleString()}` : '—'}</p>
                    <p className="text-xs text-[#6B7A8C] mt-2">{selectedS ? selectedS.name : 'All startups'}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Gross Margin</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{activeCamp ? `${activeCamp.grossMargin}%` : '—'}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Valuation</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{activeCamp ? `$${activeCamp.valuation.toLocaleString()}` : '—'}</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Burn Rate</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{hasCamps ? `$${totalBurn.toLocaleString()}` : '—'}</p>
                    <p className="text-xs text-[#6B7A8C] mt-2">per month</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Avg Runway</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{hasCamps ? avgRunway : '—'}</p>
                    <p className="text-xs text-[#6B7A8C] mt-2">months remaining</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-[#6B7A8C]">Revenue Share</h3>
                    </div>
                    <p className="text-3xl font-bold text-[#274060]">{activeCamp ? `${activeCamp.revenueShare}%` : '—'}</p>
                    <div className="w-full bg-[#F5F7FA] rounded-full h-2 mt-3">
                      <div className="bg-[#274060] h-2 rounded-full" style={{ width: `${activeCamp?.revenueShare ?? 0}%` }} />
                    </div>
                  </div>
                </div>

                {/* Funding Status Section */}
                {hasCamps && (
                  <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                    <h3 className="text-lg font-semibold text-[#0F1720] mb-6">Current Funding Status</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-[#6B7A8C] mb-1">Funding Goal</p>
                          <p className="text-2xl font-bold text-[#274060]">${totalTarget.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7A8C] mb-1">Amount Raised</p>
                          <p className="text-2xl font-bold text-[#2F6F5E]">${totalRaised.toLocaleString()}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#0F1720]">Progress</span>
                          <span className="text-sm font-bold text-[#274060]">{fundingPct}%</span>
                        </div>
                        <div className="w-full bg-[#F5F7FA] rounded-full h-3">
                          <div className="bg-[#274060] h-3 rounded-full transition-all duration-300" style={{ width: `${fundingPct}%` }} />
                        </div>
                      </div>
                      {activeCamp && (
                        <div className="flex items-center justify-between pt-4 border-t border-[#DCE3E8]">
                          <div>
                            <p className="text-sm text-[#6B7A8C]">Campaign Status</p>
                            <p className="text-sm font-semibold text-[#0F1720] capitalize">{activeCamp.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-[#6B7A8C]">Deadline</p>
                            <p className="text-sm font-semibold text-[#B38B2D]">
                              {activeCamp.deadline ? new Date(activeCamp.deadline).toLocaleDateString() : '—'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {!hasCamps && myStartups.length > 0 && (
                  <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-8 mb-6 text-center">
                    <p className="text-[#6B7A8C] text-sm">No campaigns yet. Go to your startup page and create a campaign to start raising funds.</p>
                  </div>
                )}
                {myStartups.length === 0 && (
                  <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-8 mb-6 text-center">
                    <p className="text-[#6B7A8C] text-sm">No startups found. Create your first startup to get started.</p>
                  </div>
                )}
              </>
            );
          })()}

          {/* Recent Activity & To-Do Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#0F1720] mb-6">Recent Activity</h3>
              <div className="space-y-1">
                {[
                  { icon: <Eye className="w-4 h-4" />, text: 'New investor viewed your startup', time: '2 hours ago' },
                  { icon: <MessageSquare className="w-4 h-4" />, text: 'Message received', time: '5 hours ago' },
                  { icon: <Upload className="w-4 h-4" />, text: 'Document uploaded', time: '1 day ago' },
                  { icon: <User className="w-4 h-4" />, text: 'Profile updated', time: '2 days ago' }
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F7FA] text-[#274060] flex-shrink-0 mt-0.5">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0F1720]">{activity.text}</p>
                      <p className="text-xs text-[#6B7A8C] mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* To-Do Checklist */}
            <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#0F1720] mb-6">Action Items</h3>
              <div className="space-y-3">
                {[
                  { id: 'financial', label: 'Complete financial data', checked: checkedItems.financial },
                  { id: 'pitchDeck', label: 'Upload pitch deck', checked: checkedItems.pitchDeck },
                  { id: 'companyInfo', label: 'Verify company information', checked: checkedItems.companyInfo },
                  { id: 'teamMembers', label: 'Add team members', checked: checkedItems.teamMembers },
                  { id: 'investorInquiries', label: 'Respond to investor inquiries', checked: checkedItems.investorInquiries }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheckItem(item.id as keyof typeof checkedItems)}
                    className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer"
                  >
                    {item.checked ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2F6F5E] flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#6B7A8C] flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.checked ? 'text-[#6B7A8C] line-through' : 'text-[#0F1720]'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#6B7A8C] mt-6 pt-4 border-t border-[#DCE3E8]">
                Complete tasks to improve visibility score.
              </p>
            </div>
          </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}