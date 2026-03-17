"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StartupDetail;
const lucide_react_1 = require("lucide-react");
const svg_y9jn7u1z55_1 = __importDefault(require("../imports/svg-y9jn7u1z55"));
const _3bc67c5fea0e71fdd060e346f5201d8a2983a709_png_1 = __importDefault(require("iwf:asset/3bc67c5fea0e71fdd060e346f5201d8a2983a709.png"));
const b20dac887cc802b7143fe802759e332e0bd5dfa9_png_1 = __importDefault(require("iwf:asset/b20dac887cc802b7143fe802759e332e0bd5dfa9.png"));
function StartupDetail({ onBack }) {
    return (<div className="min-h-screen bg-[#F5F7FA]">
      {/* Back Button */}
      {onBack && (<div className="bg-white border-b border-[#DCE3E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button onClick={onBack} className="flex items-center gap-2 text-[#274060] hover:text-[#3A5A7A] transition-colors duration-200">
              <lucide_react_1.ArrowLeft className="w-5 h-5"/>
              <span className="font-medium">Back to Startups</span>
            </button>
          </div>
        </div>)}
      
      {/* Startup Header Section */}
      <div className="bg-white py-8 border-b border-[#DCE3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-[#DCE3E8]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Startup Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-start gap-6">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-xl flex items-center justify-center text-white">
                    <span className="text-3xl font-bold">FF</span>
                  </div>
                  
                  {/* Name and Info */}
                  <div className="flex-1 space-y-3">
                    <h1 className="text-4xl font-bold text-[#0F1720]">FinFlow</h1>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 bg-[#6C7A89] text-white rounded-full text-sm font-medium">
                        Fintech
                      </span>
                      <span className="px-4 py-1.5 bg-[#172A45] text-white rounded-full text-sm font-medium">
                        Series A
                      </span>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center gap-2 text-[#6B7A8C]">
                      <lucide_react_1.MapPin className="w-4 h-4"/>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                {/* Key Statistics */}
                <div className="pt-4 border-t border-[#DCE3E8]">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* Revenue */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Revenue</div>
                      <div className="text-xl font-bold text-[#274060]">$42,500</div>
                      <div className="text-xs text-[#6B7A8C]">/ month</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#2F6F5E]/10 text-[#2F6F5E]">
                        +12% MoM
                      </span>
                    </div>

                    {/* Burn Rate */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Burn Rate</div>
                      <div className="text-xl font-bold text-[#274060]">$8,000</div>
                      <div className="text-xs text-[#6B7A8C]">/ month</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#6C7A89]/10 text-[#6C7A89]">
                        Stable
                      </span>
                    </div>

                    {/* Runway */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Runway</div>
                      <div className="text-xl font-bold text-[#274060]">14</div>
                      <div className="text-xs text-[#6B7A8C]">months</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#2F6F5E]/10 text-[#2F6F5E]">
                        Healthy
                      </span>
                    </div>

                    {/* Investor Interest */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Investor Interest</div>
                      <div className="text-xl font-bold text-[#274060]">147</div>
                      <div className="text-xs text-[#6B7A8C]">investors</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#3F5E8C]/10 text-[#3F5E8C]">
                        Trending
                      </span>
                    </div>

                    {/* Active Customers */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Active Customers</div>
                      <div className="text-xl font-bold text-[#274060]">2,840</div>
                      <div className="text-xs text-[#6B7A8C]">paying users</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#2F6F5E]/10 text-[#2F6F5E]">
                        +24% growth
                      </span>
                    </div>

                    {/* Valuation */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Valuation</div>
                      <div className="text-xl font-bold text-[#274060]">$8.5M</div>
                      <div className="text-xs text-[#6B7A8C]">pre-money</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#3F5E8C]/10 text-[#3F5E8C]">
                        Series A
                      </span>
                    </div>

                    {/* Team Size */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Team Size</div>
                      <div className="text-xl font-bold text-[#274060]">24</div>
                      <div className="text-xs text-[#6B7A8C]">employees</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#6C7A89]/10 text-[#6C7A89]">
                        Scaling
                      </span>
                    </div>

                    {/* Gross Margin */}
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Gross Margin</div>
                      <div className="text-xl font-bold text-[#274060]">68%</div>
                      <div className="text-xs text-[#6B7A8C]">profitability</div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#2F6F5E]/10 text-[#2F6F5E]">
                        Strong
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Investment Panel */}
              <div className="bg-white border-2 border-[#274060] rounded-xl p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-[#6B7A8C]">Funding Goal</div>
                      <div className="text-2xl font-bold text-[#0F1720]">$500,000</div>
                    </div>
                    <button className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors duration-200">
                      <lucide_react_1.Bookmark className="w-5 h-5 text-[#274060]"/>
                    </button>
                  </div>
                  
                  <div>
                    <div className="text-sm text-[#6B7A8C] mb-1">Amount Raised</div>
                    <div className="text-3xl font-bold text-[#274060]">$320,000</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-[#DCE3E8] rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-[#274060] rounded-full transition-all duration-500" style={{ width: '64%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#274060] font-semibold">64% funded</span>
                      <span className="text-[#6B7A8C]">23 days left</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE3E8] space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#6B7A8C]">Minimum Investment</span>
                    <span className="font-semibold text-[#0F1720]">$1,000</span>
                  </div>
                  
                  <button className="w-full py-3 bg-[#274060] text-white rounded-lg font-semibold hover:bg-[#3A5A7A] transition-colors duration-200">
                    Invest Now
                  </button>
                  
                  <p className="text-xs text-[#6B7A8C] text-center">
                    Investment involves risk. Please read our risk disclosure.
                  </p>
                </div>
              </div>
            </div>

            {/* AI Investment Insight Panel - Full Width */}
            <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0A192F] via-[#172A45] to-[#274060]">
              {/* Subtle highlight overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(108,122,137,0.15)] via-transparent to-transparent pointer-events-none"></div>
              
              <div className="relative p-8">
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">AI Investment Insight</h2>
                  </div>
                  <p className="text-sm text-[#DCE3E8] leading-relaxed">
                    Machine-assisted risk and growth evaluation based on financial, traction, and market signals.
                  </p>
                </div>

                {/* AI Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* AI Confidence Score */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="text-sm font-medium text-[#DCE3E8] mb-3">AI Confidence Score</div>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-5xl font-bold text-white">82</span>
                      <span className="text-2xl text-[#DCE3E8] pb-2">/ 100</span>
                    </div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-[#2F6F5E]/30 text-white border border-[#2F6F5E]/40">
                      Moderate-High Potential
                    </span>
                  </div>

                  {/* Risk Level */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="text-sm font-medium text-[#DCE3E8] mb-3">Risk Level</div>
                    <div className="text-3xl font-bold text-white mb-3">Medium</div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-[#B38B2D]/30 text-white border border-[#B38B2D]/40">
                      Balanced Risk Profile
                    </span>
                  </div>

                  {/* Predicted Growth */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                    <div className="text-sm font-medium text-[#DCE3E8] mb-3">Predicted 12-Month Growth</div>
                    <div className="text-3xl font-bold text-white mb-3">+18–25%</div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-[#3F5E8C]/30 text-white border border-[#3F5E8C]/40">
                      Growth Trajectory
                    </span>
                  </div>
                </div>

                {/* Analysis Preview & Expandable Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-[#DCE3E8] leading-relaxed mb-4">
                    <p className="line-clamp-2">
                      Our model indicates steady growth driven by recurring revenue and strong customer retention. Market conditions remain favorable with increasing demand in the fintech sector.
                    </p>
                  </div>

                  {/* Expand Button */}
                  <button onClick={() => {
            const expandable = document.getElementById('ai-analysis-expandable');
            const button = document.getElementById('ai-analysis-button');
            const icon = document.getElementById('ai-analysis-icon');
            if (expandable && button && icon) {
                const isExpanded = expandable.style.display !== 'none';
                expandable.style.display = isExpanded ? 'none' : 'block';
                button.textContent = isExpanded ? 'View Full AI Analysis' : 'Hide AI Analysis';
                icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-all duration-200">
                    <span id="ai-analysis-button">View Full AI Analysis</span>
                    <lucide_react_1.ChevronRight id="ai-analysis-icon" className="w-4 h-4 transition-transform duration-200"/>
                  </button>

                  {/* Expandable Content */}
                  <div id="ai-analysis-expandable" style={{ display: 'none' }} className="space-y-6 pt-6 mt-6 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Revenue Stability */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#2F6F5E]/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#2F6F5E]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h4 className="text-white font-semibold">Revenue Stability</h4>
                        </div>
                        <p className="text-[#DCE3E8] text-sm leading-relaxed pl-10">
                          Revenue has grown consistently over the past 6 months with low volatility. Monthly recurring revenue shows strong predictability with minimal churn.
                        </p>
                      </div>

                      {/* Market Position */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#3F5E8C]/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#3F5E8C]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                            </svg>
                          </div>
                          <h4 className="text-white font-semibold">Market Position</h4>
                        </div>
                        <p className="text-[#DCE3E8] text-sm leading-relaxed pl-10">
                          Operates in a competitive but expanding fintech niche with increasing demand. The addressable market is projected to grow 22% annually through 2028.
                        </p>
                      </div>

                      {/* Risk Factors */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#B38B2D]/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#B38B2D]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h4 className="text-white font-semibold">Risk Factors</h4>
                        </div>
                        <ul className="space-y-2 text-[#DCE3E8] text-sm pl-10">
                          <li className="flex items-start gap-2">
                            <span className="text-[#B38B2D] mt-0.5">•</span>
                            <span>Customer acquisition cost rising slightly, requiring monitoring.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#B38B2D] mt-0.5">•</span>
                            <span>High dependency on top 3 enterprise clients (62% of revenue).</span>
                          </li>
                        </ul>
                      </div>

                      {/* Opportunity Signals */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#2F6F5E]/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#2F6F5E]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h4 className="text-white font-semibold">Opportunity Signals</h4>
                        </div>
                        <ul className="space-y-2 text-[#DCE3E8] text-sm pl-10">
                          <li className="flex items-start gap-2">
                            <span className="text-[#2F6F5E] mt-0.5">•</span>
                            <span>Strong month-over-month growth trajectory with positive momentum.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#2F6F5E] mt-0.5">•</span>
                            <span>Healthy runway provides stability for execution and scaling.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#2F6F5E] mt-0.5">•</span>
                            <span>Positive investor engagement indicates strong market validation.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <p className="text-xs text-[#DCE3E8] leading-relaxed">
                    <span className="font-semibold text-white">Disclaimer:</span> AI insights are predictive estimates based on available data and do not guarantee investment outcomes. Please conduct your own due diligence and consult with financial advisors before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#0F1720]">About the Startup</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#0F1720] mb-2">Mission</h3>
                  <p className="text-[#6B7A8C] leading-relaxed">
                    FinFlow is revolutionizing digital banking for millennials and Gen Z by providing AI-powered 
                    financial planning tools that make money management intuitive, automated, and accessible to everyone.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#0F1720] mb-2">The Problem</h3>
                  <p className="text-[#6B7A8C] leading-relaxed">
                    Traditional banking apps are complex, unintuitive, and fail to provide personalized financial guidance. 
                    Young professionals struggle with budgeting, saving, and investment decisions due to lack of 
                    accessible financial education and tools.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#0F1720] mb-2">Our Solution</h3>
                  <p className="text-[#6B7A8C] leading-relaxed">
                    FinFlow combines a sleek digital banking interface with AI-driven insights that automatically 
                    categorize expenses, suggest savings opportunities, and provide personalized investment recommendations 
                    based on individual financial goals and risk tolerance.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-[#0F1720] mb-2">Market Opportunity</h3>
                  <p className="text-[#6B7A8C] leading-relaxed">
                    The digital banking market is projected to reach $8.5 trillion by 2028, with millennials and Gen Z 
                    representing 65% of new account openings. Our target demographic is actively seeking alternatives 
                    to traditional banking that align with their digital-first lifestyle.
                  </p>
                </div>
              </div>

              {/* Pitch & Demo Video Section */}
              <div className="pt-8 border-t border-[#DCE3E8]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-6 text-[#274060]">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                      <path d={svg_y9jn7u1z55_1.default.p1c4d0dc0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      <path d={svg_y9jn7u1z55_1.default.p4207a00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F1720]">Pitch & Demo Video</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Pitch Video */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#DCE3E8] hover:border-[#274060] transition-all duration-300">
                      <img src={_3bc67c5fea0e71fdd060e346f5201d8a2983a709_png_1.default} alt="Company Pitch Video" className="w-full h-48 object-cover"/>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"/>
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#274060] transition-all duration-300 shadow-xl">
                          <lucide_react_1.Play className="w-7 h-7 text-[#274060] group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor"/>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 bg-[#0A192F]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        3:42
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <h4 className="font-semibold text-[#0F1720] group-hover:text-[#274060] transition-colors duration-200">Company Pitch (2026)</h4>
                      <p className="text-sm text-[#6B7A8C]">Watch our latest pitch presentation</p>
                    </div>
                  </div>

                  {/* Product Demo Video */}
                  <div className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl border-2 border-[#DCE3E8] hover:border-[#274060] transition-all duration-300">
                      <img src={b20dac887cc802b7143fe802759e332e0bd5dfa9_png_1.default} alt="Product Demo" className="w-full h-48 object-cover"/>
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"/>
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-[#274060] transition-all duration-300 shadow-xl">
                          <lucide_react_1.Play className="w-7 h-7 text-[#274060] group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor"/>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute top-3 right-3 bg-[#0A192F]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        5:18
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <h4 className="font-semibold text-[#0F1720] group-hover:text-[#274060] transition-colors duration-200">Product Demo</h4>
                      <p className="text-sm text-[#6B7A8C]">See FinFlow in action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#0F1720]">Key Metrics</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">$2.5M</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Annual Revenue</div>
                  </div>
                </div>
                
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">15%</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Monthly Growth</div>
                  </div>
                </div>
                
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">45K</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Active Users</div>
                  </div>
                </div>
                
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">$8.5B</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Market Size</div>
                  </div>
                </div>
                
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">$12M</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Valuation</div>
                  </div>
                </div>
                
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">18 mo</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Runway</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#0F1720]">Founding Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                  <div className="w-16 h-16 bg-[#6C7A89] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                      <path d={svg_y9jn7u1z55_1.default.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1720]">Sarah Chen</h3>
                    <p className="text-sm text-[#274060] mb-2">CEO & Co-Founder</p>
                    <p className="text-sm text-[#6B7A8C]">Former VP at Goldman Sachs, 15 years in fintech</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                  <div className="w-16 h-16 bg-[#6C7A89] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                      <path d={svg_y9jn7u1z55_1.default.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1720]">Michael Rodriguez</h3>
                    <p className="text-sm text-[#274060] mb-2">CTO & Co-Founder</p>
                    <p className="text-sm text-[#6B7A8C]">Ex-Google engineer, AI/ML specialist</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                  <div className="w-16 h-16 bg-[#6C7A89] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                      <path d={svg_y9jn7u1z55_1.default.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1720]">Emily Thompson</h3>
                    <p className="text-sm text-[#274060] mb-2">CPO & Co-Founder</p>
                    <p className="text-sm text-[#6B7A8C]">Product leader from Stripe, UX expert</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                  <div className="w-16 h-16 bg-[#6C7A89] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                      <path d={svg_y9jn7u1z55_1.default.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                      <path d={svg_y9jn7u1z55_1.default.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1720]">David Kim</h3>
                    <p className="text-sm text-[#274060] mb-2">CFO</p>
                    <p className="text-sm text-[#6B7A8C]">Former CFO at fintech unicorn, growth specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Documents Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-6 space-y-4">
              <h3 className="font-semibold text-[#0F1720] flex items-center gap-2">
                <lucide_react_1.FileText className="w-5 h-5 text-[#274060]"/>
                Documents & Resources
              </h3>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 border border-[#DCE3E8] rounded-lg hover:border-[#274060] hover:bg-[#F5F7FA] transition-colors duration-200 group">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Download className="w-4 h-4 text-[#274060]"/>
                    <span className="text-sm text-[#0F1720]">Pitch Deck</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-[#0F1720] opacity-40 group-hover:opacity-100"/>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-[#DCE3E8] rounded-lg hover:border-[#274060] hover:bg-[#F5F7FA] transition-colors duration-200 group">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Download className="w-4 h-4 text-[#274060]"/>
                    <span className="text-sm text-[#0F1720]">Financial Report</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-[#0F1720] opacity-40 group-hover:opacity-100"/>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-[#DCE3E8] rounded-lg hover:border-[#274060] hover:bg-[#F5F7FA] transition-colors duration-200 group">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Download className="w-4 h-4 text-[#274060]"/>
                    <span className="text-sm text-[#0F1720]">Business Plan</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-[#0F1720] opacity-40 group-hover:opacity-100"/>
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-[#DCE3E8] rounded-lg hover:border-[#274060] hover:bg-[#F5F7FA] transition-colors duration-200 group">
                  <div className="flex items-center gap-3">
                    <lucide_react_1.Download className="w-4 h-4 text-[#274060]"/>
                    <span className="text-sm text-[#0F1720]">Legal Documents</span>
                  </div>
                  <lucide_react_1.ChevronRight className="w-4 h-4 text-[#0F1720] opacity-40 group-hover:opacity-100"/>
                </button>
              </div>
            </div>

            {/* Risk Disclosure */}
            <div className="bg-[#F5F7FA] rounded-xl p-6 space-y-3 border border-[#DCE3E8]">
              <h3 className="font-semibold text-[#0F1720] flex items-center gap-2">
                <lucide_react_1.TrendingUp className="w-5 h-5 text-[#B38B2D]"/>
                Risk Disclosure
              </h3>
              <p className="text-sm text-[#6B7A8C] leading-relaxed">
                Investing in startups involves significant risk including illiquidity, lack of dividends, 
                loss of investment, and dilution. Please carefully review all offering materials and 
                consult with your financial advisor before investing.
              </p>
              <button className="text-sm text-[#274060] font-medium hover:text-[#3A5A7A] transition-colors duration-200">
                Read Full Disclosure →
              </button>
            </div>

            {/* Similar Startups */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-6 space-y-4">
              <h3 className="font-semibold text-[#0F1720]">Similar Opportunities</h3>
              
              <div className="space-y-3">
                <button className="w-full p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#172A45] rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                      <span className="text-sm font-bold">SP</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F1720]">SmartPay</div>
                      <div className="text-xs text-[#6B7A8C]">Fintech</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#274060] font-medium">72% funded</div>
                </button>
                
                <button className="w-full p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#172A45] rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                      <span className="text-sm font-bold">DV</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F1720]">DataVault</div>
                      <div className="text-xs text-[#6B7A8C]">SaaS</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#274060] font-medium">65% funded</div>
                </button>
              </div>
            </div>

            {/* Startup Updates */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-6 space-y-4">
              <h3 className="font-semibold text-[#0F1720]">Startup Updates</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-[#274060] pl-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-[#6B7A8C] mb-2">
                    <lucide_react_1.Calendar className="w-4 h-4"/>
                    <span>February 10, 2026</span>
                  </div>
                  <h4 className="font-semibold text-[#0F1720] mb-2">Series A Funding Round Opened</h4>
                  <p className="text-sm text-[#6B7A8C]">
                    We're excited to announce the opening of our Series A funding round. This capital will help us 
                    expand to 5 new markets and grow our engineering team.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#3A5A7A] pl-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-[#6B7A8C] mb-2">
                    <lucide_react_1.Calendar className="w-4 h-4"/>
                    <span>January 28, 2026</span>
                  </div>
                  <h4 className="font-semibold text-[#0F1720] mb-2">Reached 45,000 Active Users</h4>
                  <p className="text-sm text-[#6B7A8C]">
                    Major milestone achieved! Our user base has grown 300% in the last quarter, with 
                    exceptional retention rates of 85%.
                  </p>
                </div>
                
                <div className="border-l-4 border-[#3A5A7A] pl-4 py-2">
                  <div className="flex items-center gap-2 text-sm text-[#6B7A8C] mb-2">
                    <lucide_react_1.Calendar className="w-4 h-4"/>
                    <span>January 15, 2026</span>
                  </div>
                  <h4 className="font-semibold text-[#0F1720] mb-2">New AI Features Launched</h4>
                  <p className="text-sm text-[#6B7A8C]">
                    Introduced advanced AI-powered budgeting recommendations and automated savings tools. 
                    Early user feedback has been overwhelmingly positive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
