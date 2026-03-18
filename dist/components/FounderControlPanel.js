"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FounderControlPanel;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function SidebarItem({ icon, label, active, onClick }) {
    return (<button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200 relative group cursor-pointer ${active
            ? 'bg-[#274060] text-white'
            : 'text-white hover:bg-[#3A5A7A]'}`}>
      {active && (<div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6C7A89]"/>)}
      <div className={`transition-colors duration-200 ${active ? 'text-white' : 'text-[#6C7A89] group-hover:text-white'}`}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>);
}
function SectionTitle({ title }) {
    return (<div className="px-4 py-2 mt-6 mb-2">
      <h3 className="text-xs font-semibold text-[#6C7A89] uppercase tracking-wider">
        {title}
      </h3>
    </div>);
}
function FounderControlPanel({ onNavigate }) {
    var _a;
    const [activeSection, setActiveSection] = (0, react_1.useState)('dashboard-overview');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = (0, react_1.useState)(false);
    const [isStartupsDropdownOpen, setIsStartupsDropdownOpen] = (0, react_1.useState)(false);
    const [isAnalyticsDropdownOpen, setIsAnalyticsDropdownOpen] = (0, react_1.useState)(false);
    const [isInvestorsDropdownOpen, setIsInvestorsDropdownOpen] = (0, react_1.useState)(false);
    const [isAIReportExpanded, setIsAIReportExpanded] = (0, react_1.useState)(false);
    const [language, setLanguage] = (0, react_1.useState)('EN');
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = (0, react_1.useState)(false);
    const [selectedStartup, setSelectedStartup] = (0, react_1.useState)('FinFlow');
    const [isStartupDropdownOpen, setIsStartupDropdownOpen] = (0, react_1.useState)(false);
    const [checkedItems, setCheckedItems] = (0, react_1.useState)({
        financial: false,
        pitchDeck: false,
        companyInfo: false,
        teamMembers: false,
        investorInquiries: false
    });
    const [expandedStartupRow, setExpandedStartupRow] = (0, react_1.useState)(null);
    const [expandedAISection, setExpandedAISection] = (0, react_1.useState)(null);
    const startups = [
        { name: 'FinFlow', industry: 'Fintech' },
        { name: 'MedLink', industry: 'HealthTech' },
        { name: 'CloudSuite', industry: 'SaaS' }
    ];
    const toggleCheckItem = (item) => {
        setCheckedItems(prev => (Object.assign(Object.assign({}, prev), { [item]: !prev[item] })));
    };
    const toggleStartupRow = (startupName) => {
        setExpandedStartupRow(expandedStartupRow === startupName ? null : startupName);
    };
    const toggleAISection = (startupName) => {
        setExpandedAISection(expandedAISection === startupName ? null : startupName);
    };
    return (<div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#172A45] flex flex-col">
        {/* Logo Area */}
        <div onClick={() => onNavigate && onNavigate('home')} className="px-6 py-5 border-b border-[#3A5A7A] cursor-pointer hover:bg-[#1a2f4a] transition-colors duration-200">
          <h1 className="text-2xl font-semibold text-white">EquityFlow</h1>
          <p className="text-xs text-[#6C7A89] mt-1">Founder Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <SidebarItem icon={<lucide_react_1.Home className="w-5 h-5"/>} label="Home" onClick={() => setActiveSection('home')} active={activeSection === 'home'}/>
          <SidebarItem icon={<lucide_react_1.Rocket className="w-5 h-5"/>} label="Getting Started" onClick={() => setActiveSection('getting-started')} active={activeSection === 'getting-started'}/>

          {/* Analytics Dropdown */}
          <div>
            <button onClick={() => setIsAnalyticsDropdownOpen(!isAnalyticsDropdownOpen)} className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 text-white hover:bg-[#3A5A7A] group">
              <div className="flex items-center space-x-3">
                <lucide_react_1.BarChart3 className={`w-5 h-5 transition-colors duration-200 ${isAnalyticsDropdownOpen ? 'text-white' : 'text-[#6C7A89]'}`}/>
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <lucide_react_1.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAnalyticsDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {/* Analytics Dropdown List */}
            {isAnalyticsDropdownOpen && (<div className="bg-[#0A192F]/50">
                <button onClick={() => setActiveSection('dashboard-overview')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'dashboard-overview'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.LayoutDashboard className="w-4 h-4"/>
                  <span>Dashboard Overview</span>
                </button>
                <button onClick={() => setActiveSection('ai-analysis')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'ai-analysis'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Sparkles className="w-4 h-4"/>
                  <span>AI Insights</span>
                </button>
                <button onClick={() => setActiveSection('reports')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'reports'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.FileBarChart className="w-4 h-4"/>
                  <span>Reports</span>
                </button>
              </div>)}
          </div>
          
          {/* My Startups Dropdown */}
          <div>
            <button onClick={() => setIsStartupsDropdownOpen(!isStartupsDropdownOpen)} className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 text-white hover:bg-[#3A5A7A] group">
              <div className="flex items-center space-x-3">
                <lucide_react_1.Building2 className={`w-5 h-5 transition-colors duration-200 ${isStartupsDropdownOpen ? 'text-white' : 'text-[#6C7A89]'}`}/>
                <span className="text-sm font-medium">My Startups</span>
              </div>
              <lucide_react_1.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isStartupsDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {/* Dropdown List */}
            {isStartupsDropdownOpen && (<div className="bg-[#0A192F]/50">
                <button onClick={() => setActiveSection('startup-finflow')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'startup-finflow'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Briefcase className="w-4 h-4"/>
                  <span>FinFlow</span>
                </button>
                <button onClick={() => setActiveSection('startup-medlink')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'startup-medlink'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Briefcase className="w-4 h-4"/>
                  <span>MedLink</span>
                </button>
                <button onClick={() => setActiveSection('startup-cloudsuite')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'startup-cloudsuite'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Briefcase className="w-4 h-4"/>
                  <span>CloudSuite</span>
                </button>
                <button onClick={() => setActiveSection('startup-techventure')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'startup-techventure'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Briefcase className="w-4 h-4"/>
                  <span>TechVenture</span>
                </button>
                <button onClick={() => setActiveSection('create-startup')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'create-startup'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Plus className="w-4 h-4"/>
                  <span>Create New Startup</span>
                </button>
              </div>)}
          </div>

          {/* Investors Dropdown */}
          <div>
            <button onClick={() => setIsInvestorsDropdownOpen(!isInvestorsDropdownOpen)} className="w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 text-white hover:bg-[#3A5A7A] group">
              <div className="flex items-center space-x-3">
                <lucide_react_1.Users className={`w-5 h-5 transition-colors duration-200 ${isInvestorsDropdownOpen ? 'text-white' : 'text-[#6C7A89]'}`}/>
                <span className="text-sm font-medium">Investors</span>
              </div>
              <lucide_react_1.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isInvestorsDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {/* Investors Dropdown List */}
            {isInvestorsDropdownOpen && (<div className="bg-[#0A192F]/50">
                <button onClick={() => setActiveSection('investor-relationships')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'investor-relationships'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Handshake className="w-4 h-4"/>
                  <span>Investor Relationships</span>
                </button>
                <button onClick={() => setActiveSection('investor-analytics')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'investor-analytics'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.PieChart className="w-4 h-4"/>
                  <span>Investor Analytics</span>
                </button>
                <button onClick={() => setActiveSection('ai-investor-intelligence')} className={`w-full flex items-center space-x-3 px-4 py-2.5 pl-12 text-left transition-all duration-200 text-sm ${activeSection === 'ai-investor-intelligence'
                ? 'bg-[#274060] text-white'
                : 'text-[#DCE3E8] hover:bg-[#3A5A7A] hover:text-white'}`}>
                  <lucide_react_1.Brain className="w-4 h-4"/>
                  <span>AI Investor Intelligence</span>
                </button>
              </div>)}
          </div>
          <SidebarItem icon={<lucide_react_1.MessageSquare className="w-5 h-5"/>} label="Messages" onClick={() => setActiveSection('messages')} active={activeSection === 'messages'}/>
        </nav>

        {/* Bottom Profile Section */}
        <div className="border-t border-[#3A5A7A] p-4 relative">
          <div className="w-full flex items-center space-x-3 hover:bg-[#3A5A7A] p-2 rounded-lg transition-colors duration-200">
            {/* Avatar */}
            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center space-x-3 flex-1 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#6C7A89] text-white text-sm font-semibold flex-shrink-0">
                FU
              </div>
              
              {/* Name and Role */}
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white">Founder User</p>
                <p className="text-xs text-[#6C7A89]">Founder</p>
              </div>

              {/* Chevron */}
              <lucide_react_1.ChevronDown className={`w-4 h-4 text-[#6C7A89] transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {/* Bell Icon - Separate Button */}
            <button className="p-1 hover:bg-[#274060] rounded transition-colors duration-200 cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            // Handle notification click
        }}>
              <lucide_react_1.Bell className="w-4 h-4 text-[#6C7A89] hover:text-white"/>
            </button>
          </div>

          {/* Profile Dropdown (Opens Upward) */}
          {isProfileDropdownOpen && (<div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-[#DCE3E8]">
                <p className="text-sm font-semibold text-[#0F1720]">Founder User</p>
                <p className="text-xs text-[#6B7A8C] mt-1">founder@equityflow.com</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.User className="w-4 h-4"/>
                  <span>My Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.Users className="w-4 h-4"/>
                  <span>Team Members</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.Building2 className="w-4 h-4"/>
                  <span>My Companies</span>
                </button>

                {/* Language Selector */}
                <div className="relative">
                  <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center justify-between cursor-pointer">
                    <span className="flex items-center space-x-2">
                      <span>Language: {language}</span>
                    </span>
                    <lucide_react_1.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>
                  
                  {isLanguageDropdownOpen && (<div className="px-4 py-2 bg-[#F5F7FA]">
                      {['EN', 'RU', 'UZ'].map((lang) => (<button key={lang} onClick={() => {
                        setLanguage(lang);
                        setIsLanguageDropdownOpen(false);
                    }} className={`w-full px-3 py-2 text-left text-sm rounded transition-colors duration-200 cursor-pointer ${language === lang
                        ? 'bg-[#274060] text-white'
                        : 'text-[#0F1720] hover:bg-white'}`}>
                          {lang}
                        </button>))}
                    </div>)}
                </div>

                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.HelpCircle className="w-4 h-4"/>
                  <span>Help & Support</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.RefreshCw className="w-4 h-4"/>
                  <span>Switch Role</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-[#DCE3E8] py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060] transition-colors duration-200 flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.LogOut className="w-4 h-4"/>
                  <span>Logout</span>
                </button>
              </div>
            </div>)}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {activeSection === 'home' ? (<>
            {/* Home Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">Home</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">Welcome to EquityFlow.</p>
                </div>
              </div>
            </header>

            {/* Home Page Content - Empty for now */}
            <div className="p-8">
              {/* Empty content area */}
            </div>
          </>) : activeSection === 'ai-analysis' ? (<>
            {/* AI Insights Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">AI Insights</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">AI-powered insights and analysis for all your startups.</p>
                </div>
                <button className="px-6 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.Plus className="w-5 h-5"/>
                  <span>Create New Startup</span>
                </button>
              </div>
            </header>

            {/* AI Analysis Page Content - Row-Based Startup List */}
            <div className="p-8">
              <div className="space-y-4">
                {/* Startup Rows with AI Analysis */}
                {startups.map((startup, index) => {
                const isExpanded = expandedStartupRow === startup.name;
                const startupData = {
                    'FinFlow': { revenue: '$42,500', burn: '$8,000', runway: '14 mo', funding: '64%', score: 84, badge: 'Healthy', badgeColor: '#2F6F5E' },
                    'MedLink': { revenue: '$28,200', burn: '$5,500', runway: '18 mo', funding: '42%', score: 72, badge: 'Moderate', badgeColor: '#B38B2D' },
                    'CloudSuite': { revenue: '$12,800', burn: '$3,200', runway: '22 mo', funding: '28%', score: 68, badge: 'Risk', badgeColor: '#A94442' }
                }[startup.name] || { revenue: '$0', burn: '$0', runway: '0 mo', funding: '0%', score: 0, badge: 'N/A', badgeColor: '#6B7A8C' };
                return (<div key={startup.name} className="bg-white rounded-xl border border-[#DCE3E8] shadow-sm overflow-hidden">
                      {/* Collapsed Row Content */}
                      <button onClick={() => toggleStartupRow(startup.name)} className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                        {/* Left - Logo and Info */}
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {startup.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="text-left">
                            <h3 className="font-bold text-[#0F1720]">{startup.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-[#6C7A89] text-white rounded text-xs font-medium">
                                {startup.industry}
                              </span>
                              <span className="px-2 py-0.5 bg-[#172A45] text-white rounded text-xs font-medium">
                                {startup.name === 'FinFlow' ? 'Series A' : startup.name === 'MedLink' ? 'Seed' : 'Pre-Seed'}
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
                          <lucide_react_1.ChevronRight className={`w-5 h-5 text-[#6B7A8C] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}/>
                        </div>
                      </button>

                      {/* Expandable Section */}
                      {isExpanded && (<div className="px-6 py-6 bg-[#F5F7FA] border-t border-[#DCE3E8]">
                          {/* Detailed Statistics Grid */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-[#0F1720] mb-4">Detailed Statistics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {[
                            ['Monthly Revenue', startupData.revenue],
                            ['Growth Rate', startup.name === 'FinFlow' ? '+12%' : startup.name === 'MedLink' ? '+8%' : '+5%'],
                            ['Active Users', startup.name === 'FinFlow' ? '2,840' : startup.name === 'MedLink' ? '1,520' : '680'],
                            ['CAC', startup.name === 'FinFlow' ? '$85' : startup.name === 'MedLink' ? '$120' : '$180'],
                            ['LTV', startup.name === 'FinFlow' ? '$1,240' : startup.name === 'MedLink' ? '$980' : '$750'],
                            ['Retention Rate', startup.name === 'FinFlow' ? '89%' : startup.name === 'MedLink' ? '82%' : '75%'],
                            ['Valuation', startup.name === 'FinFlow' ? '$8.5M' : startup.name === 'MedLink' ? '$4.2M' : '$2.1M'],
                            ['Total Investors', startup.name === 'FinFlow' ? '147' : startup.name === 'MedLink' ? '89' : '42'],
                            ['Customer Churn', startup.name === 'FinFlow' ? '3.2%' : startup.name === 'MedLink' ? '5.8%' : '8.5%'],
                            ['Market Size', startup.name === 'FinFlow' ? '$2.5B' : startup.name === 'MedLink' ? '$5.8B' : '$18B'],
                            ['Funding Goal', startup.name === 'FinFlow' ? '$500K' : startup.name === 'MedLink' ? '$300K' : '$150K'],
                            ['Days Remaining', startup.name === 'FinFlow' ? '23' : startup.name === 'MedLink' ? '45' : '67'],
                        ].map(([label, value]) => (<div key={label} className="bg-white p-3 rounded-lg border border-[#DCE3E8]">
                                  <p className="text-xs text-[#6B7A8C] mb-1">{label}</p>
                                  <p className="text-base font-bold text-[#0F1720]">{value}</p>
                                </div>))}
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
                                  <p className="text-xl font-bold text-white">{startup.name === 'FinFlow' ? 'Moderate' : startup.name === 'MedLink' ? 'Moderate' : 'High'}</p>
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1`} style={{ backgroundColor: `${startupData.badgeColor}4D`, color: 'white', borderColor: `${startupData.badgeColor}66`, borderWidth: '1px' }}>
                                    {startup.name === 'FinFlow' ? 'Balanced' : startup.name === 'MedLink' ? 'Monitor' : 'Watch'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-xs text-[#DCE3E8] mb-1">Predicted 12-Mo Growth</p>
                                  <p className="text-xl font-bold text-white">{startup.name === 'FinFlow' ? '+18%' : startup.name === 'MedLink' ? '+12%' : '+8%'}</p>
                                </div>
                              </div>

                              {/* AI Analysis Text */}
                              <div className="space-y-3 text-sm text-white">
                                <div>
                                  <span className="font-semibold">Revenue Trend:</span>
                                  <span className="text-[#DCE3E8]"> {startup.name === 'FinFlow' ? 'Consistent month-over-month growth.' : startup.name === 'MedLink' ? 'Steady growth with seasonal variations.' : 'Slow but consistent growth in early stage.'}</span>
                                </div>
                                <div>
                                  <span className="font-semibold">Risk Signals:</span>
                                  <span className="text-[#DCE3E8]"> {startup.name === 'FinFlow' ? 'Burn rate increasing slightly.' : startup.name === 'MedLink' ? 'Customer acquisition costs trending upward.' : 'High customer acquisition costs, lower retention.'}</span>
                                </div>
                                <div>
                                  <span className="font-semibold">Opportunity Signals:</span>
                                  <span className="text-[#DCE3E8]"> {startup.name === 'FinFlow' ? 'Strong investor engagement and improving retention.' : startup.name === 'MedLink' ? 'Expanding into new healthcare segments.' : 'Large addressable market with potential for scale.'}</span>
                                </div>
                              </div>

                              {/* Expandable Button */}
                              <button onClick={() => toggleAISection(startup.name)} className="mt-6 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center gap-2">
                                <span>View Full AI Report</span>
                                <lucide_react_1.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedAISection === startup.name ? 'rotate-180' : ''}`}/>
                              </button>

                              {/* Expandable AI Details */}
                              {expandedAISection === startup.name && (<div className="mt-6 space-y-4 pt-6 border-t border-white/10">
                                  {/* Financial Health Score */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#2F6F5E]"></div>
                                      Financial Health Score
                                    </h5>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Revenue Stability:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? '92/100' : startup.name === 'MedLink' ? '85/100' : '72/100'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Burn Rate Efficiency:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? '78/100' : startup.name === 'MedLink' ? '82/100' : '65/100'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Cash Flow Management:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? '88/100' : startup.name === 'MedLink' ? '90/100' : '70/100'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Profitability Trajectory:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? '85/100' : startup.name === 'MedLink' ? '75/100' : '68/100'}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Market Opportunity */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#3F5E8C]"></div>
                                      Market Opportunity Analysis
                                    </h5>
                                    <div className="space-y-2 text-sm text-[#DCE3E8]">
                                      <p><span className="text-white font-semibold">TAM:</span> {startup.name === 'FinFlow' ? '$2.5B with 12% CAGR' : startup.name === 'MedLink' ? '$5.8B with 18% CAGR' : '$18B with 25% CAGR'}</p>
                                      <p><span className="text-white font-semibold">Market Position:</span> {startup.name === 'FinFlow' ? 'Strong foothold in SMB segment with expansion potential' : startup.name === 'MedLink' ? 'Early mover advantage in telehealth integrations' : 'Entering competitive but high-growth cloud infrastructure space'}</p>
                                      <p><span className="text-white font-semibold">Competitive Edge:</span> {startup.name === 'FinFlow' ? 'Proprietary ML-driven financial insights' : startup.name === 'MedLink' ? 'HIPAA-compliant platform with EMR integrations' : 'Developer-first approach with superior API documentation'}</p>
                                    </div>
                                  </div>

                                  {/* Team Assessment */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#6C7A89]"></div>
                                      Team & Execution Assessment
                                    </h5>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Founder Experience:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? 'Excellent' : startup.name === 'MedLink' ? 'Strong' : 'Moderate'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Team Completeness:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? '90%' : startup.name === 'MedLink' ? '85%' : '70%'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#DCE3E8]">Execution Velocity:</span>
                                        <span className="text-white font-semibold">{startup.name === 'FinFlow' ? 'High' : startup.name === 'MedLink' ? 'Medium-High' : 'Medium'}</span>
                                      </div>
                                      <p className="text-[#DCE3E8] pt-2">{startup.name === 'FinFlow' ? 'Founders have 15+ years combined fintech experience. Strong technical co-founder with ML background.' : startup.name === 'MedLink' ? 'CEO has healthcare operations background. CTO previously at major EHR company.' : 'Young team with strong technical skills but limited enterprise sales experience.'}</p>
                                    </div>
                                  </div>

                                  {/* Risk Breakdown */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#B38B2D]"></div>
                                      Risk Breakdown
                                    </h5>
                                    <div className="space-y-3 text-sm">
                                      <div>
                                        <div className="flex justify-between mb-1">
                                          <span className="text-[#DCE3E8]">Market Risk:</span>
                                          <span className="text-white font-semibold">{startup.name === 'FinFlow' ? 'Low' : startup.name === 'MedLink' ? 'Medium' : 'Medium-High'}</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                          <div className="bg-[#B38B2D] h-1.5 rounded-full" style={{ width: startup.name === 'FinFlow' ? '25%' : startup.name === 'MedLink' ? '45%' : '60%' }}></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between mb-1">
                                          <span className="text-[#DCE3E8]">Execution Risk:</span>
                                          <span className="text-white font-semibold">{startup.name === 'FinFlow' ? 'Low-Medium' : startup.name === 'MedLink' ? 'Medium' : 'High'}</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                          <div className="bg-[#B38B2D] h-1.5 rounded-full" style={{ width: startup.name === 'FinFlow' ? '35%' : startup.name === 'MedLink' ? '50%' : '75%' }}></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between mb-1">
                                          <span className="text-[#DCE3E8]">Financial Risk:</span>
                                          <span className="text-white font-semibold">{startup.name === 'FinFlow' ? 'Medium' : startup.name === 'MedLink' ? 'Low-Medium' : 'Medium-High'}</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                          <div className="bg-[#B38B2D] h-1.5 rounded-full" style={{ width: startup.name === 'FinFlow' ? '40%' : startup.name === 'MedLink' ? '30%' : '65%' }}></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between mb-1">
                                          <span className="text-[#DCE3E8]">Competitive Risk:</span>
                                          <span className="text-white font-semibold">{startup.name === 'FinFlow' ? 'Medium' : startup.name === 'MedLink' ? 'Medium-High' : 'High'}</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-1.5">
                                          <div className="bg-[#B38B2D] h-1.5 rounded-full" style={{ width: startup.name === 'FinFlow' ? '50%' : startup.name === 'MedLink' ? '55%' : '80%' }}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Investment Recommendation */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#2F6F5E]"></div>
                                      AI Investment Recommendation
                                    </h5>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                        <span className="text-[#DCE3E8]">Recommendation:</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${startup.name === 'FinFlow' ? 'bg-[#2F6F5E] text-white' : startup.name === 'MedLink' ? 'bg-[#B38B2D] text-white' : 'bg-[#A94442]/30 text-white border border-[#A94442]/40'}`}>
                                          {startup.name === 'FinFlow' ? 'STRONG BUY' : startup.name === 'MedLink' ? 'MODERATE BUY' : 'HOLD'}
                                        </span>
                                      </div>
                                      <p className="text-[#DCE3E8] pt-2">
                                        {startup.name === 'FinFlow'
                                ? 'Strong fundamentals with proven traction. Revenue growth is consistent and team execution is exceptional. Recommended investment at current valuation with potential for 3-5x return in 24-36 months.'
                                : startup.name === 'MedLink'
                                    ? 'Solid opportunity in growing market. Some execution risks remain but team has relevant experience. Consider investment with close monitoring of CAC trends. Potential 2-4x return in 36-48 months.'
                                    : 'Early stage with significant risks. Team needs strengthening and unit economics require improvement. Consider smaller investment or wait for next milestone. High risk/high reward profile with potential 5-10x if successful.'}
                                      </p>
                                      <div className="flex items-center gap-2 pt-2">
                                        <span className="text-[#DCE3E8]">Confidence Level:</span>
                                        <div className="flex-1 bg-white/10 rounded-full h-2">
                                          <div className="bg-gradient-to-r from-[#2F6F5E] to-[#6C7A89] h-2 rounded-full" style={{ width: startup.name === 'FinFlow' ? '84%' : startup.name === 'MedLink' ? '72%' : '68%' }}></div>
                                        </div>
                                        <span className="text-white font-bold text-xs">{startup.name === 'FinFlow' ? '84' : startup.name === 'MedLink' ? '72' : '68'}%</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Key Metrics to Watch */}
                                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                    <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-[#3F5E8C]"></div>
                                      Key Metrics to Monitor
                                    </h5>
                                    <ul className="space-y-2 text-sm text-[#DCE3E8]">
                                      {startup.name === 'FinFlow' ? (<>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>Monthly burn rate sustainability - currently trending upward</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>Customer retention above 85% (currently 89%)</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>Series A funding completion timeline and dilution</span>
                                          </li>
                                        </>) : startup.name === 'MedLink' ? (<>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>CAC reduction initiatives and payback period</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>New healthcare partnership announcements</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>Regulatory compliance and certification milestones</span>
                                          </li>
                                        </>) : (<>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>Customer churn reduction from current 8.5%</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>LTV:CAC ratio improvement (currently 4.2:1, target 5:1)</span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="text-white">•</span>
                                            <span>Enterprise customer acquisition and expansion revenue</span>
                                          </li>
                                        </>)}
                                    </ul>
                                  </div>
                                </div>)}

                              {/* Disclaimer */}
                              <p className="text-xs text-[#DCE3E8]/70 mt-4">
                                AI insights are predictive and not financial advice.
                              </p>
                            </div>
                          </div>
                        </div>)}
                    </div>);
            })}
              </div>
            </div>
          </>) : activeSection === 'getting-started' ? (<>
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
                    <div className="bg-[#274060] h-3 rounded-full transition-all duration-300" style={{ width: '65%' }}/>
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
                        <lucide_react_1.Circle className="w-5 h-5"/>
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
                        <lucide_react_1.Circle className="w-5 h-5"/>
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
                        <lucide_react_1.CheckCircle2 className="w-5 h-5"/>
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
                        <lucide_react_1.Circle className="w-5 h-5"/>
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
                        <lucide_react_1.Circle className="w-5 h-5"/>
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
                            <lucide_react_1.BarChart3 className="w-5 h-5"/>
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
                            <lucide_react_1.FileText className="w-5 h-5"/>
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
                            <lucide_react_1.FileBarChart className="w-5 h-5"/>
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
                            <lucide_react_1.MessageSquare className="w-5 h-5"/>
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
          </>) : activeSection === 'startup-finflow' || activeSection === 'startup-medlink' || activeSection === 'startup-cloudsuite' || activeSection === 'startup-techventure' ? (<>
            {/* Startup Detail Page */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">
                    {activeSection === 'startup-finflow' ? 'FinFlow' :
                activeSection === 'startup-medlink' ? 'MedLink' :
                    activeSection === 'startup-cloudsuite' ? 'CloudSuite' :
                        'TechVenture'}
                  </h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">
                    {activeSection === 'startup-finflow' ? 'Financial Management Platform for SMBs' :
                activeSection === 'startup-medlink' ? 'Telehealth Platform for Healthcare Providers' :
                    activeSection === 'startup-cloudsuite' ? 'Cloud Infrastructure Management Solution' :
                        'AI-Powered Business Analytics Platform'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${activeSection === 'startup-finflow' ? 'bg-[#2F6F5E]/20 text-[#2F6F5E]' :
                activeSection === 'startup-medlink' ? 'bg-[#3F5E8C]/20 text-[#3F5E8C]' :
                    'bg-[#B38B2D]/20 text-[#B38B2D]'}`}>
                    {activeSection === 'startup-finflow' ? 'Series A' :
                activeSection === 'startup-medlink' ? 'Seed' :
                    activeSection === 'startup-cloudsuite' ? 'Seed' :
                        'Pre-Seed'}
                  </span>
                </div>
              </div>
            </header>

            {/* Startup Detail Content */}
            <div className="p-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#6B7A8C]">Monthly Revenue</span>
                    <lucide_react_1.TrendingUp className="w-4 h-4 text-[#2F6F5E]"/>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    {activeSection === 'startup-finflow' ? '$125K' :
                activeSection === 'startup-medlink' ? '$85K' :
                    activeSection === 'startup-cloudsuite' ? '$42K' :
                        '$18K'}
                  </p>
                  <p className="text-xs text-[#2F6F5E] mt-1">
                    {activeSection === 'startup-finflow' ? '+22% MoM' :
                activeSection === 'startup-medlink' ? '+18% MoM' :
                    activeSection === 'startup-cloudsuite' ? '+12% MoM' :
                        '+8% MoM'}
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#6B7A8C]">Active Users</span>
                    <lucide_react_1.Users className="w-4 h-4 text-[#3F5E8C]"/>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    {activeSection === 'startup-finflow' ? '1,247' :
                activeSection === 'startup-medlink' ? '892' :
                    activeSection === 'startup-cloudsuite' ? '456' :
                        '213'}
                  </p>
                  <p className="text-xs text-[#2F6F5E] mt-1">
                    {activeSection === 'startup-finflow' ? '+15% this month' :
                activeSection === 'startup-medlink' ? '+12% this month' :
                    activeSection === 'startup-cloudsuite' ? '+8% this month' :
                        '+5% this month'}
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#6B7A8C]">Funding Raised</span>
                    <lucide_react_1.DollarSign className="w-4 h-4 text-[#B38B2D]"/>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    {activeSection === 'startup-finflow' ? '$3.2M' :
                activeSection === 'startup-medlink' ? '$1.8M' :
                    activeSection === 'startup-cloudsuite' ? '$950K' :
                        '$400K'}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">
                    {activeSection === 'startup-finflow' ? 'Series A target: $8M' :
                activeSection === 'startup-medlink' ? 'Series A target: $5M' :
                    activeSection === 'startup-cloudsuite' ? 'Series A target: $3M' :
                        'Seed target: $2M'}
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#6B7A8C]">Burn Rate</span>
                    <lucide_react_1.BarChart3 className="w-4 h-4 text-[#A94442]"/>
                  </div>
                  <p className="text-2xl font-bold text-[#0F1720]">
                    {activeSection === 'startup-finflow' ? '$85K/mo' :
                activeSection === 'startup-medlink' ? '$62K/mo' :
                    activeSection === 'startup-cloudsuite' ? '$48K/mo' :
                        '$28K/mo'}
                  </p>
                  <p className="text-xs text-[#6B7A8C] mt-1">
                    {activeSection === 'startup-finflow' ? '18 months runway' :
                activeSection === 'startup-medlink' ? '14 months runway' :
                    activeSection === 'startup-cloudsuite' ? '12 months runway' :
                        '10 months runway'}
                  </p>
                </div>
              </div>

              {/* Company Overview */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Company Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-[#6B7A8C] mb-2">About</h4>
                    <p className="text-sm text-[#0F1720]">
                      {activeSection === 'startup-finflow'
                ? 'FinFlow is a comprehensive financial management platform designed specifically for small and medium-sized businesses. Our ML-driven insights help businesses make better financial decisions and improve cash flow management.'
                : activeSection === 'startup-medlink'
                    ? 'MedLink connects healthcare providers with patients through a secure, HIPAA-compliant telehealth platform. We integrate seamlessly with major EMR systems to streamline patient care and administrative workflows.'
                    : activeSection === 'startup-cloudsuite'
                        ? 'CloudSuite provides enterprise-grade cloud infrastructure management with a developer-first approach. Our platform simplifies multi-cloud deployments and provides real-time monitoring and cost optimization.'
                        : 'TechVenture leverages AI to provide actionable business analytics for growing companies. Our platform aggregates data from multiple sources to deliver insights that drive revenue growth and operational efficiency.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#6B7A8C] mb-2">Key Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6B7A8C]">Founded:</span>
                        <span className="text-[#0F1720] font-medium">
                          {activeSection === 'startup-finflow' ? '2022' :
                activeSection === 'startup-medlink' ? '2023' :
                    activeSection === 'startup-cloudsuite' ? '2023' :
                        '2024'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7A8C]">Industry:</span>
                        <span className="text-[#0F1720] font-medium">
                          {activeSection === 'startup-finflow' ? 'FinTech' :
                activeSection === 'startup-medlink' ? 'HealthTech' :
                    activeSection === 'startup-cloudsuite' ? 'Cloud Infrastructure' :
                        'AI & Analytics'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7A8C]">Team Size:</span>
                        <span className="text-[#0F1720] font-medium">
                          {activeSection === 'startup-finflow' ? '24 employees' :
                activeSection === 'startup-medlink' ? '18 employees' :
                    activeSection === 'startup-cloudsuite' ? '12 employees' :
                        '8 employees'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7A8C]">Location:</span>
                        <span className="text-[#0F1720] font-medium">
                          {activeSection === 'startup-finflow' ? 'San Francisco, CA' :
                activeSection === 'startup-medlink' ? 'Boston, MA' :
                    activeSection === 'startup-cloudsuite' ? 'Seattle, WA' :
                        'Austin, TX'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200">
                    <lucide_react_1.Upload className="w-4 h-4"/>
                    <span className="text-sm font-medium">Upload Documents</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#DCE3E8] text-[#0F1720] rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200">
                    <lucide_react_1.FileText className="w-4 h-4"/>
                    <span className="text-sm font-medium">View Pitch Deck</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-[#DCE3E8] text-[#0F1720] rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200">
                    <lucide_react_1.Settings className="w-4 h-4"/>
                    <span className="text-sm font-medium">Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </>) : activeSection === 'investor-relationships' ? (<>
            {/* Investor Relationships Page - CRM Layout */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F1720]">Investor Relationships</h2>
                <p className="text-sm text-[#6B7A8C] mt-1">Manage communication and investment status.</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
              {/* Top Summary Cards */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Investors</p>
                  <p className="text-2xl font-bold text-[#0F1720]">47</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Active Conversations</p>
                  <p className="text-2xl font-bold text-[#0F1720]">23</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Capital Raised</p>
                  <p className="text-2xl font-bold text-[#0F1720]">$4.2M</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Avg Investment</p>
                  <p className="text-2xl font-bold text-[#0F1720]">$89K</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Avg Match Score</p>
                  <p className="text-2xl font-bold text-[#0F1720]">82/100</p>
                </div>
              </div>

              {/* Investor Table */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F5F7FA] border-b border-[#DCE3E8]">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Investor Name</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Startup</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Investment Amount</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">Last Interaction</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-[#6B7A8C] uppercase tracking-wider">AI Match Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DCE3E8]">
                      {[
                { name: 'Michael Chen', startup: 'FinFlow', status: 'Invested', amount: '$250K', lastInteraction: '2 days ago', matchScore: 92 },
                { name: 'Sarah Williams', startup: 'MedLink', status: 'Negotiating', amount: '$150K', lastInteraction: '5 hours ago', matchScore: 88 },
                { name: 'David Park', startup: 'FinFlow', status: 'Interested', amount: '-', lastInteraction: '1 week ago', matchScore: 75 },
                { name: 'Emma Thompson', startup: 'CloudSuite', status: 'Invested', amount: '$100K', lastInteraction: '3 days ago', matchScore: 85 },
                { name: 'James Rodriguez', startup: 'TechVenture', status: 'Interested', amount: '-', lastInteraction: '4 days ago', matchScore: 78 },
                { name: 'Lisa Anderson', startup: 'MedLink', status: 'Negotiating', amount: '$200K', lastInteraction: '1 day ago', matchScore: 90 },
            ].map((investor, index) => (<tr key={index} className="hover:bg-[#F5F7FA] transition-colors duration-150">
                          <td className="px-6 py-4 text-sm font-medium text-[#0F1720]">{investor.name}</td>
                          <td className="px-6 py-4 text-sm text-[#6B7A8C]">{investor.startup}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${investor.status === 'Invested' ? 'bg-[#2F6F5E] text-white' :
                    investor.status === 'Negotiating' ? 'bg-[#B38B2D] text-white' :
                        'bg-[#3F5E8C] text-white'}`}>
                              {investor.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-[#0F1720]">{investor.amount}</td>
                          <td className="px-6 py-4 text-sm text-[#6B7A8C]">{investor.lastInteraction}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-[#DCE3E8] rounded-full h-2 max-w-[80px]">
                                <div className="bg-gradient-to-r from-[#2F6F5E] to-[#3F5E8C] h-2 rounded-full" style={{ width: `${investor.matchScore}%` }}></div>
                              </div>
                              <span className="text-sm font-semibold text-[#0F1720]">{investor.matchScore}</span>
                            </div>
                          </td>
                        </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>) : activeSection === 'investor-analytics' ? (<>
            {/* Investor Analytics Page */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F1720]">Investor Analytics</h2>
                <p className="text-sm text-[#6B7A8C] mt-1">Analyze investor behavior and engagement patterns.</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
              {/* Summary Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Conversion Rate</p>
                  <p className="text-2xl font-bold text-[#0F1720]">18.4%</p>
                  <p className="text-xs text-[#2F6F5E] mt-1">↑ 2.3% from last month</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Avg Response Time</p>
                  <p className="text-2xl font-bold text-[#0F1720]">4.2h</p>
                  <p className="text-xs text-[#2F6F5E] mt-1">↓ 1.5h faster</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Retention Rate</p>
                  <p className="text-2xl font-bold text-[#0F1720]">87%</p>
                  <p className="text-xs text-[#2F6F5E] mt-1">↑ 3% increase</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#DCE3E8] shadow-sm">
                  <p className="text-xs font-medium text-[#6B7A8C] mb-1">Capital Growth Rate</p>
                  <p className="text-2xl font-bold text-[#0F1720]">+45%</p>
                  <p className="text-xs text-[#2F6F5E] mt-1">Year over year</p>
                </div>
              </div>

              {/* Engagement Funnel */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Engagement Funnel</h3>
                <div className="space-y-4">
                  {[
                { stage: 'Viewed Profile', count: 284, percentage: 100 },
                { stage: 'Requested Info', count: 127, percentage: 45 },
                { stage: 'Negotiation', count: 68, percentage: 24 },
                { stage: 'Invested', count: 52, percentage: 18 },
            ].map((stage, index) => (<div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-[#0F1720]">{stage.stage}</span>
                        <span className="text-sm font-semibold text-[#0F1720]">{stage.count} ({stage.percentage}%)</span>
                      </div>
                      <div className="w-full bg-[#DCE3E8] rounded-full h-3">
                        <div className="bg-gradient-to-r from-[#3F5E8C] to-[#2F6F5E] h-3 rounded-full transition-all duration-500" style={{ width: `${stage.percentage}%` }}></div>
                      </div>
                    </div>))}
                </div>
              </div>

              {/* Investor Segmentation & Capital Distribution */}
              <div className="grid grid-cols-2 gap-6">
                {/* Investor Segmentation */}
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Investor Segmentation</h3>
                  <div className="space-y-3">
                    {[
                { type: 'Angel Investors', count: 18, color: '#3F5E8C' },
                { type: 'VC Firms', count: 12, color: '#2F6F5E' },
                { type: 'Private Investors', count: 11, color: '#B38B2D' },
                { type: 'Strategic Partners', count: 6, color: '#6C7A89' },
            ].map((segment, index) => (<div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                          <span className="text-sm text-[#0F1720]">{segment.type}</span>
                        </div>
                        <span className="text-sm font-semibold text-[#0F1720]">{segment.count}</span>
                      </div>))}
                  </div>
                </div>

                {/* Capital Distribution */}
                <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#0F1720] mb-4">Capital Distribution Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Total Capital Raised</p>
                      <p className="text-3xl font-bold text-[#0F1720]">$4.2M</p>
                    </div>
                    <div className="pt-3 border-t border-[#DCE3E8]">
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Top Investor Contribution</p>
                      <p className="text-xl font-semibold text-[#0F1720]">$250K</p>
                      <p className="text-xs text-[#6B7A8C] mt-1">Michael Chen</p>
                    </div>
                    <div className="pt-3 border-t border-[#DCE3E8]">
                      <p className="text-xs font-medium text-[#6B7A8C] mb-1">Average Investment Size</p>
                      <p className="text-xl font-semibold text-[#0F1720]">$89K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>) : activeSection === 'ai-investor-intelligence' ? (<>
            {/* AI Investor Intelligence Page */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F1720]">AI Investor Intelligence</h2>
                <p className="text-sm text-[#6B7A8C] mt-1">AI-powered insights and predictions for your investor relationships.</p>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-[#F5F7FA] p-8">
              {/* Large AI Summary Card */}
              <div className="bg-gradient-to-br from-[#0A192F] via-[#172A45] to-[#274060] rounded-xl p-8 mb-6 shadow-lg border border-white/10">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-medium text-[#DCE3E8] mb-2">AI Portfolio Sentiment</p>
                    <p className="text-3xl font-bold text-white mb-1">Positive</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-[#2F6F5E] h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm text-[#DCE3E8]">78%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#DCE3E8] mb-2">Predicted Funding Close Probability</p>
                    <p className="text-3xl font-bold text-white">72%</p>
                    <p className="text-xs text-[#DCE3E8] mt-1">Next 30 days</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#DCE3E8] mb-2">Investor Match Quality</p>
                    <p className="text-3xl font-bold text-white">81<span className="text-xl text-[#DCE3E8]">/100</span></p>
                    <p className="text-xs text-[#2F6F5E] mt-1">Above average</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Risk Signals */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#B38B2D]"></div>
                      Risk Signals
                    </h4>
                    <ul className="space-y-2 text-sm text-[#DCE3E8]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#B38B2D]">•</span>
                        <span>Decreasing activity this week</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#B38B2D]">•</span>
                        <span>2 inactive major investors</span>
                      </li>
                    </ul>
                  </div>

                  {/* Opportunity Signals */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#2F6F5E]"></div>
                      Opportunity Signals
                    </h4>
                    <ul className="space-y-2 text-sm text-[#DCE3E8]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2F6F5E]">•</span>
                        <span>High engagement from fintech-focused angels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2F6F5E]">•</span>
                        <span>Increased profile views</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* AI Recommended Actions */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 mb-4">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <lucide_react_1.Sparkles className="w-4 h-4"/>
                    AI Recommended Actions
                  </h4>
                  <ul className="space-y-2 text-sm text-[#DCE3E8]">
                    <li className="flex items-start gap-2">
                      <lucide_react_1.CheckCircle2 className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                      <span>Follow up within 24h with active investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <lucide_react_1.CheckCircle2 className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                      <span>Share updated metrics with interested parties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <lucide_react_1.CheckCircle2 className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                      <span>Target Series A-focused funds for next round</span>
                    </li>
                  </ul>
                </div>

                {/* View Full AI Report Button */}
                <button onClick={() => setIsAIReportExpanded(!isAIReportExpanded)} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200">
                  <lucide_react_1.Eye className="w-4 h-4"/>
                  <span className="text-sm font-medium">{isAIReportExpanded ? 'Hide Full AI Report' : 'View Full AI Report'}</span>
                  <lucide_react_1.ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isAIReportExpanded ? 'rotate-180' : ''}`}/>
                </button>

                {/* Expanded AI Report Section */}
                {isAIReportExpanded && (<div className="space-y-6 mt-6 animate-in slide-in-from-top duration-300">
                    {/* Top Investor Matches */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <lucide_react_1.TrendingUp className="w-5 h-5 text-[#2F6F5E]"/>
                      Top Investor Matches for Your Startups
                    </h3>
                    <div className="space-y-4">
                      {[
                    {
                        name: 'Michael Chen',
                        startup: 'FinFlow',
                        matchScore: 92,
                        investmentSize: '$250K',
                        compatibility: 'Excellent',
                        strengths: ['Fintech expertise', 'Active mentor', 'Strong network'],
                        investmentPattern: 'Series A focus, typically $200K-$500K',
                        responseTime: '2.3 days avg',
                        likelihood: 85
                    },
                    {
                        name: 'Lisa Anderson',
                        startup: 'MedLink',
                        matchScore: 90,
                        investmentSize: '$200K',
                        compatibility: 'Excellent',
                        strengths: ['Healthcare background', 'Regulatory knowledge', 'Patient'],
                        investmentPattern: 'Early stage, $150K-$300K',
                        responseTime: '1.8 days avg',
                        likelihood: 78
                    },
                    {
                        name: 'Sarah Williams',
                        startup: 'MedLink',
                        matchScore: 88,
                        investmentSize: '$150K',
                        compatibility: 'Very Good',
                        strengths: ['Medical device expertise', 'Strategic advisor', 'Follow-on investor'],
                        investmentPattern: 'Seed to Series A, $100K-$250K',
                        responseTime: '3.1 days avg',
                        likelihood: 72
                    },
                    {
                        name: 'Emma Thompson',
                        startup: 'CloudSuite',
                        matchScore: 85,
                        investmentSize: '$100K',
                        compatibility: 'Very Good',
                        strengths: ['Enterprise SaaS focus', 'Go-to-market support', 'Well connected'],
                        investmentPattern: 'Series A, $75K-$150K',
                        responseTime: '4.2 days avg',
                        likelihood: 68
                    },
                ].map((investor, index) => (<div key={index} className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors duration-200">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-base font-semibold text-white mb-1">{investor.name}</h4>
                              <p className="text-sm text-[#DCE3E8]">Investing in: <span className="font-medium text-white">{investor.startup}</span></p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-[#DCE3E8]">Match Score</span>
                                <span className="text-2xl font-bold text-[#2F6F5E]">{investor.matchScore}</span>
                              </div>
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${investor.compatibility === 'Excellent' ? 'bg-[#2F6F5E] text-white' : 'bg-[#3F5E8C] text-white'}`}>
                                {investor.compatibility}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-[#DCE3E8] mb-1">Investment Size</p>
                              <p className="text-sm font-semibold text-white">{investor.investmentSize}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#DCE3E8] mb-1">Investment Pattern</p>
                              <p className="text-sm text-white">{investor.investmentPattern}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#DCE3E8] mb-1">Avg Response Time</p>
                              <p className="text-sm font-semibold text-white">{investor.responseTime}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#DCE3E8] mb-1">Investment Likelihood</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/10 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-[#2F6F5E] to-[#3F5E8C] h-2 rounded-full" style={{ width: `${investor.likelihood}%` }}></div>
                                </div>
                                <span className="text-sm font-semibold text-white">{investor.likelihood}%</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-[#DCE3E8] mb-2">Key Strengths</p>
                            <div className="flex flex-wrap gap-2">
                              {investor.strengths.map((strength, idx) => (<span key={idx} className="px-3 py-1 bg-white/10 border border-white/10 text-xs text-white rounded-full">
                                  {strength}
                                </span>))}
                            </div>
                          </div>
                        </div>))}
                    </div>
                  </div>

                  {/* AI Investment Strategy Recommendations */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <lucide_react_1.Brain className="w-5 h-5 text-[#3F5E8C]"/>
                      AI Investment Strategy Recommendations
                    </h3>
                    <div className="space-y-6">
                      {/* Priority Actions */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Priority Actions (Next 48 Hours)</h4>
                        <div className="space-y-3">
                          {[
                    { action: 'Follow up with Michael Chen on FinFlow deal', urgency: 'High', reason: 'Match score 92%, showed strong interest in last meeting' },
                    { action: 'Send updated financials to Lisa Anderson', urgency: 'High', reason: 'Requested 3 days ago, fast responder (1.8 days avg)' },
                    { action: 'Schedule call with Sarah Williams for MedLink', urgency: 'Medium', reason: 'Good match (88%), currently in negotiation phase' },
                ].map((item, index) => (<div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                              <div className={`w-2 h-2 rounded-full mt-1.5 ${item.urgency === 'High' ? 'bg-[#B38B2D]' : 'bg-[#3F5E8C]'}`}></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-medium text-white">{item.action}</p>
                                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${item.urgency === 'High' ? 'bg-[#B38B2D] text-white' : 'bg-[#3F5E8C] text-white'}`}>
                                    {item.urgency}
                                  </span>
                                </div>
                                <p className="text-xs text-[#DCE3E8]">{item.reason}</p>
                              </div>
                            </div>))}
                        </div>
                      </div>

                      {/* Best Matched Investors by Startup */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Best Matched Investors by Startup</h4>
                        <div className="space-y-3">
                          {[
                    { startup: 'FinFlow', topInvestor: 'Michael Chen', score: 92, nextBest: 'David Park (75)' },
                    { startup: 'MedLink', topInvestor: 'Lisa Anderson', score: 90, nextBest: 'Sarah Williams (88)' },
                    { startup: 'CloudSuite', topInvestor: 'Emma Thompson', score: 85, nextBest: 'Not enough data' },
                ].map((item, index) => (<div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                              <div>
                                <p className="text-sm font-semibold text-white mb-1">{item.startup}</p>
                                <p className="text-xs text-[#DCE3E8]">Next best: {item.nextBest}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs text-[#DCE3E8] mb-1">Best Match</p>
                                <p className="text-sm font-bold text-white">{item.topInvestor}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="w-16 bg-white/10 rounded-full h-1.5">
                                    <div className="bg-[#2F6F5E] h-1.5 rounded-full" style={{ width: `${item.score}%` }}></div>
                                  </div>
                                  <span className="text-xs font-semibold text-[#2F6F5E]">{item.score}</span>
                                </div>
                              </div>
                            </div>))}
                        </div>
                      </div>

                      {/* Investment Timing Insights */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Investment Timing Insights</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-xs text-[#DCE3E8] mb-2">Optimal Time to Close</p>
                            <p className="text-xl font-bold text-white mb-1">2-3 weeks</p>
                            <p className="text-xs text-[#DCE3E8]">Based on current momentum and investor engagement patterns</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-xs text-[#DCE3E8] mb-2">Expected Close Rate</p>
                            <p className="text-xl font-bold text-[#2F6F5E] mb-1">72%</p>
                            <p className="text-xs text-[#DCE3E8]">Probability of closing with at least 2 top investors</p>
                          </div>
                        </div>
                      </div>

                      {/* Strategic Recommendations */}
                      <div className="p-5 bg-white/10 rounded-lg border border-white/20">
                        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <lucide_react_1.Lightbulb className="w-4 h-4"/>
                          Strategic Recommendations
                        </h4>
                        <ul className="space-y-2 text-sm text-[#DCE3E8]">
                          <li className="flex items-start gap-2">
                            <lucide_react_1.ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                            <span><strong className="text-white">Focus on Michael Chen (FinFlow):</strong> Highest match score and strong investment likelihood. Prioritize closing this deal first.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <lucide_react_1.ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                            <span><strong className="text-white">Leverage Lisa Anderson's expertise:</strong> Use her healthcare knowledge to strengthen MedLink's regulatory strategy.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <lucide_react_1.ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                            <span><strong className="text-white">Re-engage David Park:</strong> Last interaction was 1 week ago. Lower match score (75%) but has shown interest in FinFlow.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <lucide_react_1.ArrowUpRight className="w-4 h-4 text-[#2F6F5E] flex-shrink-0 mt-0.5"/>
                            <span><strong className="text-white">Prepare for CloudSuite fundraising:</strong> Emma Thompson is your best match. Consider timing your ask for Q2 2026.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>)}
              </div>

              {/* Disclaimer */}
              <div className="bg-white rounded-lg border border-[#DCE3E8] p-4">
                <p className="text-xs text-[#6B7A8C] leading-relaxed">
                  <strong>Disclaimer:</strong> AI predictions are based on historical data and pattern analysis. 
                  These insights should be used as guidance only and not as definitive investment advice. 
                  Always conduct thorough due diligence before making investment decisions.
                </p>
              </div>
            </div>
          </>) : activeSection === 'messages' ? (<>
            {/* Messages Page - Telegram Desktop Style */}
            <div className="h-full flex">
              {/* Left Panel - Conversations List */}
              <div className="w-[35%] bg-white border-r border-[#DCE3E8] flex flex-col">
                {/* Search Bar */}
                <div className="p-4 border-b border-[#DCE3E8]">
                  <input type="text" placeholder="Search messages…" className="w-full px-4 py-2 bg-[#F5F7FA] border border-[#DCE3E8] rounded-lg text-sm text-[#0F1720] placeholder-[#6B7A8C] focus:outline-none focus:border-[#274060] transition-colors duration-200"/>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                  {[
                { name: 'Michael Chen', startup: 'FinFlow', lastMessage: 'Thanks for the updated pitch deck. The financials look promising...', time: '2h ago', unread: 2, online: true },
                { name: 'Sarah Williams', startup: 'MedLink', lastMessage: 'I would like to schedule a call to discuss the regulatory pathway', time: '5h ago', unread: 0, online: false },
                { name: 'David Park', startup: 'CloudSuite', lastMessage: 'Great progress on customer acquisition!', time: '1d ago', unread: 0, online: false },
                { name: 'Emma Thompson', startup: 'FinFlow', lastMessage: 'Can you provide more details on your go-to-market strategy?', time: '2d ago', unread: 1, online: false },
                { name: 'James Rodriguez', startup: 'TechVenture', lastMessage: 'Your team composition looks strong', time: '3d ago', unread: 0, online: false },
            ].map((chat, index) => (<div key={index} className={`px-4 py-4 border-b border-[#DCE3E8] hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer relative ${index === 0 ? 'bg-[#F5F7FA]' : ''}`}>
                      {index === 0 && (<div className="absolute left-0 top-0 bottom-0 w-1 bg-[#274060]"/>)}
                      <div className="flex items-start space-x-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-sm">
                            {chat.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {chat.online && (<div className="absolute bottom-0 right-0 w-3 h-3 bg-[#2F6F5E] border-2 border-white rounded-full"></div>)}
                        </div>

                        {/* Chat Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-[#0F1720] text-sm">{chat.name}</h4>
                            <span className="text-xs text-[#6B7A8C]">{chat.time}</span>
                          </div>
                          <p className="text-xs text-[#6B7A8C] mb-1">{chat.startup}</p>
                          <p className="text-sm text-[#6B7A8C] truncate">{chat.lastMessage}</p>
                        </div>

                        {/* Unread Badge */}
                        {chat.unread > 0 && (<div className="flex-shrink-0 w-5 h-5 bg-[#274060] text-white rounded-full flex items-center justify-center text-xs font-semibold">
                            {chat.unread}
                          </div>)}
                      </div>
                    </div>))}
                </div>
              </div>

              {/* Right Panel - Active Chat */}
              <div className="flex-1 flex flex-col bg-[#F5F7FA]">
                {/* Chat Header */}
                <div className="bg-white border-b border-[#DCE3E8] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs">
                        MC
                      </div>
                      {/* Info */}
                      <div>
                        <h3 className="font-bold text-[#0F1720]">Michael Chen</h3>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-[#6B7A8C]">FinFlow</p>
                          <span className="text-xs text-[#6B7A8C]">•</span>
                          <p className="text-xs text-[#2F6F5E]">Online</p>
                        </div>
                      </div>
                    </div>
                    {/* More Options */}
                    <button className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors duration-200">
                      <lucide_react_1.Settings className="w-5 h-5 text-[#6B7A8C]"/>
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Date Label */}
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-[#6B7A8C] border border-[#DCE3E8]">Today</span>
                  </div>

                  {/* Investor Message */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      MC
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-white border border-[#DCE3E8] rounded-lg px-4 py-3">
                        <p className="text-sm text-[#0F1720]">Hi! I reviewed your pitch deck for FinFlow. The financials look solid, especially your revenue projections.</p>
                      </div>
                      <p className="text-xs text-[#6B7A8C] mt-1 ml-1">10:24 AM</p>
                    </div>
                  </div>

                  {/* Investor Message 2 */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      MC
                    </div>
                    <div className="max-w-[70%]">
                      <div className="bg-white border border-[#DCE3E8] rounded-lg px-4 py-3">
                        <p className="text-sm text-[#0F1720]">I would like to schedule a call next week to discuss your go-to-market strategy in more detail.</p>
                      </div>
                      <p className="text-xs text-[#6B7A8C] mt-1 ml-1">10:26 AM</p>
                    </div>
                  </div>

                  {/* Founder Message (You) */}
                  <div className="flex items-end justify-end space-x-3">
                    <div className="max-w-[70%]">
                      <div className="bg-[#274060] rounded-lg px-4 py-3">
                        <p className="text-sm text-white">Thank you for reviewing! I would be happy to discuss our go-to-market strategy. I am available Tuesday or Thursday afternoon.</p>
                      </div>
                      <p className="text-xs text-[#6B7A8C] mt-1 mr-1 text-right">10:30 AM</p>
                    </div>
                  </div>

                  {/* Founder Message 2 */}
                  <div className="flex items-end justify-end space-x-3">
                    <div className="max-w-[70%]">
                      <div className="bg-[#274060] rounded-lg px-4 py-3">
                        <p className="text-sm text-white">I can also send you our updated customer acquisition metrics if that would be helpful.</p>
                      </div>
                      <p className="text-xs text-[#6B7A8C] mt-1 mr-1 text-right">10:31 AM</p>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A5A7A] to-[#274060] flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      MC
                    </div>
                    <div className="bg-white border border-[#DCE3E8] rounded-lg px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-[#6B7A8C] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#6B7A8C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#6B7A8C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="bg-white border-t border-[#DCE3E8] px-6 py-4">
                  {/* AI Suggest Reply Button */}
                  <div className="mb-3">
                    <button className="px-3 py-1.5 text-xs font-medium text-[#274060] border border-[#274060] rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                      AI Suggest Reply
                    </button>
                  </div>
                  
                  {/* Input Box */}
                  <div className="flex items-center space-x-3">
                    {/* Attachment Button */}
                    <button className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors duration-200">
                      <lucide_react_1.Upload className="w-5 h-5 text-[#6B7A8C]"/>
                    </button>

                    {/* Text Input */}
                    <input type="text" placeholder="Write a message…" className="flex-1 px-4 py-3 bg-[#F5F7FA] border border-[#DCE3E8] rounded-lg text-sm text-[#0F1720] placeholder-[#6B7A8C] focus:outline-none focus:border-[#274060] transition-colors duration-200"/>

                    {/* Send Button */}
                    <button className="p-3 bg-[#274060] hover:bg-[#3A5A7A] rounded-lg transition-colors duration-200 cursor-pointer">
                      <lucide_react_1.MessageSquare className="w-5 h-5 text-white"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>) : (<>
            {/* Dashboard Overview Page Header */}
            <header className="bg-white border-b border-[#DCE3E8] px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#0F1720]">Dashboard Overview</h2>
                  <p className="text-sm text-[#6B7A8C] mt-1">Monitor performance and manage your startup activity.</p>
                </div>
                <button className="px-6 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium flex items-center space-x-2 cursor-pointer">
                  <lucide_react_1.Plus className="w-5 h-5"/>
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
              <button onClick={() => setIsStartupDropdownOpen(!isStartupDropdownOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#274060] text-white font-bold text-sm">
                    {selectedStartup.substring(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-[#0F1720]">{selectedStartup}</p>
                    <span className="text-xs text-[#6B7A8C]">
                      {(_a = startups.find(s => s.name === selectedStartup)) === null || _a === void 0 ? void 0 : _a.industry}
                    </span>
                  </div>
                </div>
                <lucide_react_1.ChevronDown className={`w-5 h-5 text-[#6B7A8C] transition-transform duration-200 ${isStartupDropdownOpen ? 'rotate-180' : ''}`}/>
              </button>

              {/* Dropdown Menu */}
              {isStartupDropdownOpen && (<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden z-10">
                  {startups.map((startup) => (<button key={startup.name} onClick={() => {
                        setSelectedStartup(startup.name);
                        setIsStartupDropdownOpen(false);
                    }} className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-200 cursor-pointer ${selectedStartup === startup.name
                        ? 'bg-[#274060] text-white'
                        : 'hover:bg-[#F5F7FA] text-[#0F1720]'}`}>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs ${selectedStartup === startup.name
                        ? 'bg-white text-[#274060]'
                        : 'bg-[#274060] text-white'}`}>
                        {startup.name.substring(0, 2)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{startup.name}</p>
                        <p className={`text-xs ${selectedStartup === startup.name ? 'text-white/80' : 'text-[#6B7A8C]'}`}>
                          {startup.industry}
                        </p>
                      </div>
                    </button>))}
                  <button onClick={() => {
                    setIsStartupDropdownOpen(false);
                    // Handle create new startup
                }} className="w-full flex items-center space-x-3 px-4 py-3 text-left border-t border-[#DCE3E8] hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F7FA]">
                      <lucide_react_1.Plus className="w-4 h-4 text-[#274060]"/>
                    </div>
                    <span className="font-medium text-[#274060]">Create New Startup</span>
                  </button>
                </div>)}
            </div>
          </div>

          {/* General Statistics Row - 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Card 1 - Total Funding Raised */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Total Funding Raised</h3>
                <div className="flex items-center space-x-1 text-[#2F6F5E]">
                  <lucide_react_1.ArrowUpRight className="w-4 h-4"/>
                  <span className="text-xs font-medium">+12%</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#274060]">$2.4M</p>
            </div>

            {/* Card 2 - Active Investors */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Active Investors</h3>
                <div className="flex items-center space-x-1 text-[#2F6F5E]">
                  <lucide_react_1.ArrowUpRight className="w-4 h-4"/>
                  <span className="text-xs font-medium">+8%</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#274060]">147</p>
            </div>

            {/* Card 3 - Funding Progress */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Funding Progress</h3>
                <div className="flex items-center space-x-1 text-[#2F6F5E]">
                  <lucide_react_1.ArrowUpRight className="w-4 h-4"/>
                  <span className="text-xs font-medium">+5%</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#274060]">64%</p>
            </div>

            {/* Card 4 - Profile Completion */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Profile Completion</h3>
              </div>
              <p className="text-3xl font-bold text-[#274060]">78%</p>
            </div>
          </div>

          {/* Additional Statistics Row - 6 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Card 1 - Monthly Revenue */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Monthly Revenue</h3>
                <div className="flex items-center space-x-1 text-[#2F6F5E]">
                  <lucide_react_1.ArrowUpRight className="w-4 h-4"/>
                  <span className="text-xs font-medium">+8%</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#274060]">$24,500</p>
              <p className="text-xs text-[#6B7A8C] mt-2">Compared to last month</p>
            </div>

            {/* Card 2 - Monthly Active Users */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Monthly Active Users</h3>
                <div className="flex items-center space-x-1 text-[#2F6F5E]">
                  <lucide_react_1.ArrowUpRight className="w-4 h-4"/>
                  <span className="text-xs font-medium">+15%</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#274060]">3,420</p>
            </div>

            {/* Card 3 - Investor Conversion Rate */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Investor Conversion Rate</h3>
                <div className="flex items-center space-x-1 text-[#2F6F5E]">
                  <lucide_react_1.ArrowUpRight className="w-4 h-4"/>
                  <span className="text-xs font-medium">+3%</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#274060]">12.4%</p>
            </div>

            {/* Card 4 - Burn Rate */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Burn Rate</h3>
              </div>
              <p className="text-3xl font-bold text-[#274060]">$8,000</p>
              <p className="text-xs text-[#6B7A8C] mt-2">per month</p>
            </div>

            {/* Card 5 - Runway */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Runway</h3>
              </div>
              <p className="text-3xl font-bold text-[#274060]">14</p>
              <p className="text-xs text-[#6B7A8C] mt-2">months remaining at current burn rate</p>
            </div>

            {/* Card 6 - Startup Visibility Score */}
            <div className="bg-white p-6 rounded-lg border border-[#DCE3E8] shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-[#6B7A8C]">Startup Visibility Score</h3>
              </div>
              <p className="text-3xl font-bold text-[#274060]">82<span className="text-xl text-[#6B7A8C]"> / 100</span></p>
              <div className="w-full bg-[#F5F7FA] rounded-full h-2 mt-3">
                <div className="bg-[#274060] h-2 rounded-full transition-all duration-300" style={{ width: '82%' }}/>
              </div>
            </div>
          </div>

          {/* Funding Status Section */}
          <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#0F1720] mb-6">Current Funding Status</h3>
            
            <div className="space-y-6">
              {/* Funding Goal and Raised */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#6B7A8C] mb-1">Funding Goal</p>
                  <p className="text-2xl font-bold text-[#274060]">$500,000</p>
                </div>
                <div>
                  <p className="text-sm text-[#6B7A8C] mb-1">Amount Raised</p>
                  <p className="text-2xl font-bold text-[#2F6F5E]">$320,000</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#0F1720]">Progress</span>
                  <span className="text-sm font-bold text-[#274060]">64%</span>
                </div>
                <div className="w-full bg-[#F5F7FA] rounded-full h-3">
                  <div className="bg-[#274060] h-3 rounded-full transition-all duration-300" style={{ width: '64%' }}/>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between pt-4 border-t border-[#DCE3E8]">
                <div>
                  <p className="text-sm text-[#6B7A8C]">Round Type</p>
                  <p className="text-sm font-semibold text-[#0F1720]">Series A</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#6B7A8C]">Days Remaining</p>
                  <p className="text-sm font-semibold text-[#B38B2D]">23 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & To-Do Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-[#DCE3E8] shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#0F1720] mb-6">Recent Activity</h3>
              <div className="space-y-1">
                {[
                { icon: <lucide_react_1.Eye className="w-4 h-4"/>, text: 'New investor viewed your startup', time: '2 hours ago' },
                { icon: <lucide_react_1.MessageSquare className="w-4 h-4"/>, text: 'Message received', time: '5 hours ago' },
                { icon: <lucide_react_1.Upload className="w-4 h-4"/>, text: 'Document uploaded', time: '1 day ago' },
                { icon: <lucide_react_1.User className="w-4 h-4"/>, text: 'Profile updated', time: '2 days ago' }
            ].map((activity, idx) => (<div key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F7FA] text-[#274060] flex-shrink-0 mt-0.5">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#0F1720]">{activity.text}</p>
                      <p className="text-xs text-[#6B7A8C] mt-1">{activity.time}</p>
                    </div>
                  </div>))}
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
            ].map((item) => (<button key={item.id} onClick={() => toggleCheckItem(item.id)} className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-[#F5F7FA] transition-colors duration-200 cursor-pointer">
                    {item.checked ? (<lucide_react_1.CheckCircle2 className="w-5 h-5 text-[#2F6F5E] flex-shrink-0"/>) : (<lucide_react_1.Circle className="w-5 h-5 text-[#6B7A8C] flex-shrink-0"/>)}
                    <span className={`text-sm ${item.checked ? 'text-[#6B7A8C] line-through' : 'text-[#0F1720]'}`}>
                      {item.label}
                    </span>
                  </button>))}
              </div>
              <p className="text-xs text-[#6B7A8C] mt-6 pt-4 border-t border-[#DCE3E8]">
                Complete tasks to improve visibility score.
              </p>
            </div>
          </div>
            </div>
          </>)}
      </main>
    </div>);
}
