"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InvestorDashboard;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const startupService_1 = require("../services/startupService");
const AuthContext_1 = require("../context/AuthContext");
function SidebarItem({ icon, label, active, onClick, badge }) {
    return (<button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 relative group cursor-pointer ${active ? 'bg-[#274060] text-white' : 'text-white hover:bg-[#3A5A7A]'}`}>
      <div className="flex items-center space-x-3">
        {active && (<div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6C7A89]"/>)}
        <div className={`transition-colors duration-200 ${active ? 'text-white' : 'text-[#6C7A89] group-hover:text-white'}`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (<span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
          {badge}
        </span>)}
    </button>);
}
// Mock portfolio data
const mockInvestments = [
    {
        id: 1,
        startup: 'FinFlow',
        industry: 'Fintech',
        invested: 25000,
        currentValue: 31500,
        roi: 26.0,
        status: 'Active',
        date: '2024-03-15',
    },
    {
        id: 2,
        startup: 'MedLink',
        industry: 'HealthTech',
        invested: 15000,
        currentValue: 19800,
        roi: 32.0,
        status: 'Active',
        date: '2024-02-10',
    },
    {
        id: 3,
        startup: 'EcoTrack',
        industry: 'CleanTech',
        invested: 10000,
        currentValue: 9200,
        roi: -8.0,
        status: 'Active',
        date: '2024-01-22',
    },
    {
        id: 4,
        startup: 'CloudSuite',
        industry: 'SaaS',
        invested: 20000,
        currentValue: 26400,
        roi: 32.0,
        status: 'Exited',
        date: '2023-11-05',
    },
];
const allocationData = [
    { sector: 'Fintech', percentage: 35, color: '#274060' },
    { sector: 'HealthTech', percentage: 25, color: '#3A5A7A' },
    { sector: 'SaaS', percentage: 22, color: '#6C7A89' },
    { sector: 'CleanTech', percentage: 18, color: '#DCE3E8' },
];
function InvestorDashboard({ onNavigate }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { user, logout } = (0, AuthContext_1.useAuth)();
    const [activeSection, setActiveSection] = (0, react_1.useState)('overview');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = (0, react_1.useState)(false);
    const [language, setLanguage] = (0, react_1.useState)('EN');
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = (0, react_1.useState)(false);
    // Marketplace state
    const [startups, setStartups] = (0, react_1.useState)([]);
    const [startupPage, setStartupPage] = (0, react_1.useState)(1);
    const [startupTotal, setStartupTotal] = (0, react_1.useState)(0);
    const [isLoadingStartups, setIsLoadingStartups] = (0, react_1.useState)(false);
    const [startupError, setStartupError] = (0, react_1.useState)(null);
    const totalInvested = mockInvestments.reduce((s, i) => s + i.invested, 0);
    const totalCurrentValue = mockInvestments.reduce((s, i) => s + i.currentValue, 0);
    const totalReturns = totalCurrentValue - totalInvested;
    const returnsPercent = ((totalReturns / totalInvested) * 100).toFixed(1);
    const activeInvestments = mockInvestments.filter((i) => i.status === 'Active').length;
    const fetchStartups = (page) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        setIsLoadingStartups(true);
        setStartupError(null);
        try {
            const res = yield startupService_1.startupService.listStartups(page, 9);
            setStartups((_a = res.startups) !== null && _a !== void 0 ? _a : []);
            setStartupTotal((_b = res.total) !== null && _b !== void 0 ? _b : 0);
            setStartupPage(page);
        }
        catch (err) {
            setStartupError(err instanceof Error ? err.message : 'Failed to load startups');
        }
        finally {
            setIsLoadingStartups(false);
        }
    });
    (0, react_1.useEffect)(() => {
        if (activeSection === 'marketplace') {
            fetchStartups(1);
        }
    }, [activeSection]);
    const handleLogout = () => {
        logout();
        onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate('home');
    };
    const totalPages = Math.ceil(startupTotal / 9);
    const userInitials = user
        ? `${((_d = (_b = (_a = user.firstName) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : (_c = user.userId) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : 'I').toUpperCase()}`
        : 'IN';
    return (<div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#172A45] flex flex-col flex-shrink-0">
        {/* Logo */}
        <div onClick={() => onNavigate === null || onNavigate === void 0 ? void 0 : onNavigate('home')} className="px-6 py-5 border-b border-[#3A5A7A] cursor-pointer hover:bg-[#1a2f4a] transition-colors duration-200">
          <h1 className="text-2xl font-semibold text-white">EquityFlow</h1>
          <p className="text-xs text-[#6C7A89] mt-1">Investor Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <SidebarItem icon={<lucide_react_1.Home className="w-5 h-5"/>} label="Home" active={activeSection === 'overview'} onClick={() => setActiveSection('overview')}/>
          <SidebarItem icon={<lucide_react_1.PieChart className="w-5 h-5"/>} label="Portfolio" active={activeSection === 'portfolio'} onClick={() => setActiveSection('portfolio')}/>
          <SidebarItem icon={<lucide_react_1.LayoutGrid className="w-5 h-5"/>} label="Marketplace" active={activeSection === 'marketplace'} onClick={() => setActiveSection('marketplace')}/>
          <SidebarItem icon={<lucide_react_1.BarChart3 className="w-5 h-5"/>} label="Analytics" active={activeSection === 'analytics'} onClick={() => setActiveSection('analytics')}/>
          <SidebarItem icon={<lucide_react_1.MessageSquare className="w-5 h-5"/>} label="Messages" active={activeSection === 'messages'} onClick={() => setActiveSection('messages')} badge={3}/>
          <SidebarItem icon={<lucide_react_1.Settings className="w-5 h-5"/>} label="Settings" active={activeSection === 'settings'} onClick={() => setActiveSection('settings')}/>
        </nav>

        {/* Bottom Profile */}
        <div className="border-t border-[#3A5A7A] p-4">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-[#3A5A7A] rounded-lg transition-all duration-200">
            <lucide_react_1.LogOut className="w-5 h-5 text-[#6C7A89]"/>
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#DCE3E8] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#0F1720] capitalize">
              {activeSection === 'overview'
            ? 'Dashboard Overview'
            : activeSection === 'portfolio'
                ? 'My Portfolio'
                : activeSection === 'marketplace'
                    ? 'Startup Marketplace'
                    : activeSection === 'analytics'
                        ? 'Analytics'
                        : activeSection === 'messages'
                            ? 'Messages'
                            : 'Settings'}
            </h2>
            <p className="text-sm text-[#6B7A8C]">
              Welcome back, {(_e = user === null || user === void 0 ? void 0 : user.firstName) !== null && _e !== void 0 ? _e : 'Investor'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-[#6B7A8C] hover:text-[#274060] transition-colors">
              <lucide_react_1.Bell className="w-5 h-5"/>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="flex items-center space-x-1 px-3 py-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200 text-sm">
                <span className="text-[#0F1720]">{language}</span>
                <lucide_react_1.ChevronDown className="w-3 h-3 text-[#0F1720]"/>
              </button>
              {isLanguageDropdownOpen && (<div className="absolute right-0 mt-1 w-20 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden z-10">
                  {['EN', 'RU', 'UZ'].map((lang) => (<button key={lang} onClick={() => {
                    setLanguage(lang);
                    setIsLanguageDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 ${language === lang
                    ? 'bg-[#274060] text-white'
                    : 'text-[#0F1720] hover:bg-[#F5F7FA]'}`}>
                      {lang}
                    </button>))}
                </div>)}
            </div>

            {/* Profile */}
            <div className="relative">
              <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 bg-[#274060] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {userInitials}
                </div>
                <lucide_react_1.ChevronDown className="w-4 h-4 text-[#6B7A8C]"/>
              </button>
              {isProfileDropdownOpen && (<div className="absolute right-0 mt-2 w-48 bg-white border border-[#DCE3E8] rounded-xl shadow-lg overflow-hidden z-10">
                  <div className="px-4 py-3 border-b border-[#DCE3E8]">
                    <p className="text-sm font-semibold text-[#0F1720]">
                      {(_f = user === null || user === void 0 ? void 0 : user.firstName) !== null && _f !== void 0 ? _f : 'Investor'}
                    </p>
                    <p className="text-xs text-[#6B7A8C]">{(_g = user === null || user === void 0 ? void 0 : user.email) !== null && _g !== void 0 ? _g : ''}</p>
                  </div>
                  <button onClick={() => {
                setActiveSection('settings');
                setIsProfileDropdownOpen(false);
            }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#0F1720] hover:bg-[#F5F7FA] transition-colors">
                    <lucide_react_1.User className="w-4 h-4 text-[#6B7A8C]"/>
                    Profile Settings
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <lucide_react_1.LogOut className="w-4 h-4"/>
                    Log Out
                  </button>
                </div>)}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* ─── OVERVIEW ─── */}
          {activeSection === 'overview' && (<div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Total Invested</p>
                    <div className="w-9 h-9 bg-[#274060] bg-opacity-10 rounded-lg flex items-center justify-center">
                      <lucide_react_1.DollarSign className="w-5 h-5 text-[#274060]"/>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    ${totalInvested.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Across {mockInvestments.length} startups</p>
                </div>

                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Active Investments</p>
                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                      <lucide_react_1.Activity className="w-5 h-5 text-green-600"/>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">{activeInvestments}</p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Currently active positions</p>
                </div>

                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Portfolio Value</p>
                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                      <lucide_react_1.TrendingUp className="w-5 h-5 text-blue-600"/>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    ${totalCurrentValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">Current market value</p>
                </div>

                <div className="bg-white rounded-xl border border-[#DCE3E8] p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#6B7A8C] font-medium">Total Returns</p>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${totalReturns >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                      {totalReturns >= 0 ? (<lucide_react_1.ArrowUpRight className="w-5 h-5 text-green-600"/>) : (<lucide_react_1.ArrowDownRight className="w-5 h-5 text-red-600"/>)}
                    </div>
                  </div>
                  <p className={`text-2xl font-bold ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalReturns >= 0 ? '+' : ''}${totalReturns.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">
                    {returnsPercent}% overall return
                  </p>
                </div>
              </div>

              {/* Recent Investments Table + Allocation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Investments */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-[#DCE3E8] shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#DCE3E8] flex items-center justify-between">
                    <h3 className="font-semibold text-[#0F1720]">Recent Investments</h3>
                    <button onClick={() => setActiveSection('portfolio')} className="text-sm text-[#274060] hover:text-[#3A5A7A] font-medium transition-colors">
                      View All
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#F5F7FA] text-xs text-[#6B7A8C] uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Startup</th>
                          <th className="px-6 py-3 text-right">Invested</th>
                          <th className="px-6 py-3 text-right">Value</th>
                          <th className="px-6 py-3 text-right">ROI</th>
                          <th className="px-6 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F5F7FA]">
                        {mockInvestments.map((inv) => (<tr key={inv.id} className="hover:bg-[#F5F7FA] transition-colors">
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-sm font-semibold text-[#0F1720]">
                                  {inv.startup}
                                </p>
                                <p className="text-xs text-[#6B7A8C]">{inv.industry}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium text-[#0F1720]">
                              ${inv.invested.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium text-[#0F1720]">
                              ${inv.currentValue.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`text-sm font-semibold ${inv.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {inv.roi >= 0 ? '+' : ''}
                                {inv.roi}%
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inv.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700'}`}>
                                {inv.status}
                              </span>
                            </td>
                          </tr>))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Allocation Donut */}
                <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                  <h3 className="font-semibold text-[#0F1720] mb-5">
                    Sector Allocation
                  </h3>
                  {/* Visual bar chart */}
                  <div className="space-y-4">
                    {allocationData.map((item) => (<div key={item.sector}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#0F1720] font-medium">
                            {item.sector}
                          </span>
                          <span className="text-[#6B7A8C]">{item.percentage}%</span>
                        </div>
                        <div className="h-2.5 bg-[#F5F7FA] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                }}/>
                        </div>
                      </div>))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#DCE3E8]">
                    <p className="text-xs text-[#6B7A8C] text-center">
                      Based on invested capital
                    </p>
                  </div>
                </div>
              </div>
            </div>)}

          {/* ─── PORTFOLIO ─── */}
          {activeSection === 'portfolio' && (<div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {mockInvestments.map((inv) => (<div key={inv.id} className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6 hover:shadow-md transition-shadow">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-[#274060] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                          {inv.startup.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0F1720]">{inv.startup}</h4>
                          <p className="text-xs text-[#6B7A8C]">{inv.industry}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${inv.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'}`}>
                        {inv.status}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-[#6B7A8C] mb-1">Invested</p>
                        <p className="text-base font-bold text-[#0F1720]">
                          ${inv.invested.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B7A8C] mb-1">Current Value</p>
                        <p className="text-base font-bold text-[#0F1720]">
                          ${inv.currentValue.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* ROI */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F5F7FA]">
                      <div className="flex items-center gap-1.5">
                        {inv.roi >= 0 ? (<lucide_react_1.ArrowUpRight className="w-4 h-4 text-green-600"/>) : (<lucide_react_1.ArrowDownRight className="w-4 h-4 text-red-600"/>)}
                        <span className={`text-sm font-semibold ${inv.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {inv.roi >= 0 ? '+' : ''}
                          {inv.roi}% ROI
                        </span>
                      </div>
                      <span className="text-xs text-[#6B7A8C]">
                        Since {new Date(inv.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>))}
              </div>
            </div>)}

          {/* ─── MARKETPLACE ─── */}
          {activeSection === 'marketplace' && (<div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#6B7A8C]">
                  {isLoadingStartups
                ? 'Loading startups...'
                : startupError
                    ? 'Error loading startups'
                    : `Showing ${startups.length} of ${startupTotal} startups`}
                </p>
              </div>

              {/* Error State */}
              {startupError && (<div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center gap-4">
                  <lucide_react_1.AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0"/>
                  <div>
                    <p className="text-red-700 font-medium">Failed to load startups</p>
                    <p className="text-red-600 text-sm mt-1">{startupError}</p>
                    <button onClick={() => fetchStartups(startupPage)} className="mt-2 text-sm text-red-700 font-semibold underline hover:no-underline">
                      Try again
                    </button>
                  </div>
                </div>)}

              {/* Loading State */}
              {isLoadingStartups && (<div className="flex items-center justify-center py-20">
                  <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-[#274060]"/>
                  <span className="ml-3 text-[#6B7A8C]">Loading startups...</span>
                </div>)}

              {/* Startup Grid */}
              {!isLoadingStartups && !startupError && (<>
                  {startups.length === 0 ? (<div className="text-center py-20">
                      <p className="text-[#6B7A8C] text-lg">No startups found.</p>
                      <p className="text-[#6B7A8C] text-sm mt-2">
                        Try adjusting the page or check back later.
                      </p>
                    </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {startups.map((startup) => (<div key={startup.id} className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-11 h-11 bg-[#274060] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {startup.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-[#0F1720] truncate">
                                {startup.name}
                              </h4>
                              <p className="text-xs text-[#6B7A8C]">{startup.location}</p>
                            </div>
                          </div>
                          <p className="text-sm text-[#6B7A8C] line-clamp-3 mb-4">
                            {startup.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-[#F5F7FA]">
                            <span className="text-xs text-[#6B7A8C]">
                              Founded{' '}
                              {startup.foundedAt
                            ? new Date(startup.foundedAt).getFullYear()
                            : '—'}
                            </span>
                            {startup.websiteUrl && (<a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#274060] hover:text-[#3A5A7A] transition-colors">
                                <lucide_react_1.ExternalLink className="w-4 h-4"/>
                              </a>)}
                          </div>
                        </div>))}
                    </div>)}

                  {/* Pagination */}
                  {totalPages > 1 && (<div className="flex justify-center gap-2 mt-6">
                      <button onClick={() => fetchStartups(startupPage - 1)} disabled={startupPage === 1} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${startupPage === 1
                        ? 'border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed'
                        : 'border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'}`}>
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (<button key={p} onClick={() => fetchStartups(p)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${p === startupPage
                            ? 'bg-[#274060] text-white'
                            : 'border border-[#DCE3E8] text-[#0F1720] hover:border-[#274060] hover:text-[#274060]'}`}>
                          {p}
                        </button>))}
                      <button onClick={() => fetchStartups(startupPage + 1)} disabled={startupPage === totalPages} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${startupPage === totalPages
                        ? 'border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed'
                        : 'border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'}`}>
                        Next
                      </button>
                    </div>)}
                </>)}
            </div>)}

          {/* ─── ANALYTICS ─── */}
          {activeSection === 'analytics' && (<div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Returns Over Time (mock bar chart) */}
                <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                  <h3 className="font-semibold text-[#0F1720] mb-6">
                    Monthly Returns (Mock)
                  </h3>
                  <div className="flex items-end gap-3 h-40">
                    {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-[#274060] rounded-t-md transition-all" style={{ height: `${h}%` }}/>
                        <span className="text-xs text-[#6B7A8C]">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
                        </span>
                      </div>))}
                  </div>
                </div>

                {/* Performance Summary */}
                <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                  <h3 className="font-semibold text-[#0F1720] mb-5">
                    Performance Summary
                  </h3>
                  <div className="space-y-4">
                    {[
                { label: 'Best Performer', value: 'MedLink (+32%)', color: 'text-green-600' },
                { label: 'Worst Performer', value: 'EcoTrack (-8%)', color: 'text-red-600' },
                { label: 'Avg. ROI', value: `+${returnsPercent}%`, color: 'text-[#274060]' },
                { label: 'Total Invested', value: `$${totalInvested.toLocaleString()}`, color: 'text-[#0F1720]' },
                { label: 'Portfolio Value', value: `$${totalCurrentValue.toLocaleString()}`, color: 'text-[#0F1720]' },
            ].map((row) => (<div key={row.label} className="flex items-center justify-between py-2 border-b border-[#F5F7FA] last:border-0">
                        <span className="text-sm text-[#6B7A8C]">{row.label}</span>
                        <span className={`text-sm font-semibold ${row.color}`}>
                          {row.value}
                        </span>
                      </div>))}
                  </div>
                </div>
              </div>
            </div>)}

          {/* ─── MESSAGES ─── */}
          {activeSection === 'messages' && (<div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-12 text-center">
              <lucide_react_1.MessageSquare className="w-12 h-12 text-[#DCE3E8] mx-auto mb-4"/>
              <h3 className="text-lg font-semibold text-[#0F1720] mb-2">
                No Messages Yet
              </h3>
              <p className="text-[#6B7A8C] text-sm">
                Your conversations with founders will appear here.
              </p>
            </div>)}

          {/* ─── SETTINGS ─── */}
          {activeSection === 'settings' && (<div className="max-w-2xl space-y-6">
              <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                <h3 className="font-semibold text-[#0F1720] mb-6 text-lg">
                  Account Settings
                </h3>
                <div className="space-y-4">
                  {[
                { label: 'Email', value: (_h = user === null || user === void 0 ? void 0 : user.email) !== null && _h !== void 0 ? _h : '—' },
                { label: 'Role', value: 'Investor' },
                { label: 'User ID', value: (_j = user === null || user === void 0 ? void 0 : user.userId) !== null && _j !== void 0 ? _j : '—' },
            ].map((field) => (<div key={field.label} className="flex items-center justify-between py-3 border-b border-[#F5F7FA] last:border-0">
                      <span className="text-sm font-medium text-[#6B7A8C]">
                        {field.label}
                      </span>
                      <span className="text-sm text-[#0F1720] font-semibold">
                        {field.value}
                      </span>
                    </div>))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm p-6">
                <h3 className="font-semibold text-[#0F1720] mb-4">Danger Zone</h3>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                  <lucide_react_1.LogOut className="w-4 h-4"/>
                  Log Out
                </button>
              </div>
            </div>)}
        </main>
      </div>
    </div>);
}
