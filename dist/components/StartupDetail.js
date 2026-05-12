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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StartupDetail;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const startupService_1 = require("../services/startupService");
const investService_1 = require("../services/investService");
const analysisService_1 = require("../services/analysisService");
const svg_y9jn7u1z55_1 = __importDefault(require("../imports/svg-y9jn7u1z55"));
const _3bc67c5fea0e71fdd060e346f5201d8a2983a709_png_1 = __importDefault(require("iwf:asset/3bc67c5fea0e71fdd060e346f5201d8a2983a709.png"));
const b20dac887cc802b7143fe802759e332e0bd5dfa9_png_1 = __importDefault(require("iwf:asset/b20dac887cc802b7143fe802759e332e0bd5dfa9.png"));
function StartupDetail({ startupId, onBack }) {
    var _a;
    const [startup, setStartup] = (0, react_1.useState)(null);
    const [campaign, setCampaign] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [analysis, setAnalysis] = (0, react_1.useState)(null);
    const [analysisLoading, setAnalysisLoading] = (0, react_1.useState)(false);
    const [showInvestModal, setShowInvestModal] = (0, react_1.useState)(false);
    const [investAmount, setInvestAmount] = (0, react_1.useState)(0);
    const [investLoading, setInvestLoading] = (0, react_1.useState)(false);
    const [investMsg, setInvestMsg] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!startupId)
            return;
        setLoading(true);
        setError(null);
        Promise.all([
            startupService_1.startupService.getStartup(startupId).catch(() => null),
            startupService_1.startupService.getCampaignsByStartup(startupId).catch(() => null),
        ]).then(([startupRes, campaignsRes]) => {
            var _a;
            if (startupRes) {
                setStartup(startupRes);
            }
            else {
                setError('Failed to load startup details');
            }
            if (campaignsRes && ((_a = campaignsRes.campaigns) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                setCampaign(campaignsRes.campaigns[0]);
            }
        }).catch((err) => {
            setError(err instanceof Error ? err.message : 'Failed to load startup');
        }).finally(() => {
            setLoading(false);
        });
    }, [startupId]);
    (0, react_1.useEffect)(() => {
        if (!startupId)
            return;
        setAnalysisLoading(true);
        analysisService_1.analysisService.analyzeStartup(startupId)
            .then(res => setAnalysis(res.analysis))
            .catch(() => { })
            .finally(() => setAnalysisLoading(false));
    }, [startupId]);
    const handleInvest = () => __awaiter(this, void 0, void 0, function* () {
        if (!startupId || !campaign || investAmount < (campaign.minInvestment || 1))
            return;
        setInvestLoading(true);
        setInvestMsg(null);
        try {
            const res = yield investService_1.investService.invest({
                startup_id: startupId,
                campaign_id: campaign.id,
                amount: investAmount,
            });
            if (res.success) {
                setInvestMsg(`Investment of $${investAmount.toLocaleString()} recorded! The founder will be in touch.`);
            }
            else {
                setInvestMsg(res.message || 'Investment failed.');
            }
        }
        catch (err) {
            setInvestMsg(err instanceof Error ? err.message : 'Investment failed.');
        }
        finally {
            setInvestLoading(false);
        }
    });
    const startName = (startup === null || startup === void 0 ? void 0 : startup.name) || 'Startup';
    const startLogo = startName.substring(0, 2).toUpperCase();
    const startLocation = (startup === null || startup === void 0 ? void 0 : startup.location) || 'Unknown';
    const targetAmount = (campaign === null || campaign === void 0 ? void 0 : campaign.targetAmount) || 500000;
    const raisedAmount = (campaign === null || campaign === void 0 ? void 0 : campaign.raisedAmount) || 0;
    const fundingPct = targetAmount > 0 ? ((raisedAmount / targetAmount) * 100).toFixed(0) : '0';
    if (loading) {
        return (<div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-[#274060]"/>
        <span className="ml-3 text-[#6B7A8C]">Loading startup details...</span>
      </div>);
    }
    if (error) {
        return (<div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center gap-4">
        <lucide_react_1.AlertCircle className="w-12 h-12 text-red-500"/>
        <p className="text-red-700 font-medium">{error}</p>
        <button onClick={onBack} className="px-4 py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A]">
          Back to Startups
        </button>
      </div>);
    }
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
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-xl flex items-center justify-center text-white">
                    <span className="text-3xl font-bold">{startLogo}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <h1 className="text-4xl font-bold text-[#0F1720]">{startName}</h1>
                    <div className="flex flex-wrap gap-2">
                      {campaign && (<span className="px-4 py-1.5 bg-[#6C7A89] text-white rounded-full text-sm font-medium capitalize">{campaign.status}</span>)}
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7A8C]">
                      <lucide_react_1.MapPin className="w-4 h-4"/>
                      <span>{startLocation}</span>
                    </div>
                  </div>
                </div>

                {campaign && (<div className="pt-4 border-t border-[#DCE3E8]">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Revenue</div>
                      <div className="text-xl font-bold text-[#274060]">${(campaign.revenue || 0).toLocaleString()}</div>
                      <div className="text-xs text-[#6B7A8C]">monthly</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Burn Rate</div>
                      <div className="text-xl font-bold text-[#274060]">${(campaign.burnRate || 0).toLocaleString()}</div>
                      <div className="text-xs text-[#6B7A8C]">/ month</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Runway</div>
                      <div className="text-xl font-bold text-[#274060]">{campaign.runway || 0}</div>
                      <div className="text-xs text-[#6B7A8C]">months</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Valuation</div>
                      <div className="text-xl font-bold text-[#274060]">${(campaign.valuation || 0).toLocaleString()}</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Gross Margin</div>
                      <div className="text-xl font-bold text-[#274060]">{(campaign.grossMargin || 0).toFixed(0)}%</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Min Investment</div>
                      <div className="text-xl font-bold text-[#274060]">${(campaign.minInvestment || 0).toLocaleString()}</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Revenue Share</div>
                      <div className="text-xl font-bold text-[#274060]">{(campaign.revenueShare || 0).toFixed(0)}%</div>
                    </div>
                    <div className="space-y-1.5 p-3 border border-[#DCE3E8] rounded-lg bg-[#F5F7FA]/30">
                      <div className="text-xs font-medium text-[#6B7A8C] uppercase tracking-wide">Active Customers</div>
                      <div className="text-xl font-bold text-[#274060]">{campaign.activeCustomers || 0}</div>
                    </div>
                  </div>
                </div>)}

                {!campaign && (startup === null || startup === void 0 ? void 0 : startup.description) && (<div className="pt-4 border-t border-[#DCE3E8]">
                    <p className="text-[#6B7A8C] leading-relaxed">{startup.description}</p>
                    {startup.websiteUrl && (<a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm text-[#274060] hover:underline">Visit Website →</a>)}
                  </div>)}
              </div>

              {/* Right Side - Investment Panel */}
              <div className="bg-white border-2 border-[#274060] rounded-xl p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-[#6B7A8C]">Funding Goal</div>
                      <div className="text-2xl font-bold text-[#0F1720]">${targetAmount.toLocaleString()}</div>
                    </div>
                    <button className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors duration-200">
                      <lucide_react_1.Bookmark className="w-5 h-5 text-[#274060]"/>
                    </button>
                  </div>
                  
                  <div>
                    <div className="text-sm text-[#6B7A8C] mb-1">Amount Raised</div>
                    <div className="text-3xl font-bold text-[#274060]">${raisedAmount.toLocaleString()}</div>
                  </div>

                  {targetAmount > 0 && (<div className="space-y-2">
                    <div className="w-full bg-[#DCE3E8] rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-[#274060] rounded-full transition-all duration-500" style={{ width: `${Math.min(Number(fundingPct), 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#274060] font-semibold">{fundingPct}% funded</span>
                      {(campaign === null || campaign === void 0 ? void 0 : campaign.deadline) && (<span className="text-[#6B7A8C]">{Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} days left</span>)}
                    </div>
                  </div>)}
                </div>

                <div className="pt-4 border-t border-[#DCE3E8] space-y-4">
                  {campaign && (<div className="flex justify-between">
                    <span className="text-[#6B7A8C]">Minimum Investment</span>
                    <span className="font-semibold text-[#0F1720]">${(campaign.minInvestment || 0).toLocaleString()}</span>
                  </div>)}
                  <button onClick={() => { setInvestMsg(null); setInvestAmount((campaign === null || campaign === void 0 ? void 0 : campaign.minInvestment) || 0); setShowInvestModal(true); }} className="w-full py-3 bg-[#274060] text-white rounded-lg font-semibold hover:bg-[#3A5A7A] transition-colors duration-200">Invest Now</button>
                  <p className="text-xs text-[#6B7A8C] text-center">Investment involves risk. Please read our risk disclosure.</p>
                </div>
              </div>
            </div>

            {/* AI Investment Insight Panel - Full Width (Ollama-powered) */}
            <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0A192F] via-[#172A45] to-[#274060]">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(108,122,137,0.15)] via-transparent to-transparent pointer-events-none"></div>
              <div className="relative p-8">
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
                    Machine-assisted risk and growth evaluation based on financial, traction, and market signals via local Ollama Qwen2.5.
                  </p>
                </div>

                {analysisLoading ? (<div className="flex items-center justify-center py-12 text-[#DCE3E8]">
                    <lucide_react_1.Loader2 className="w-6 h-6 animate-spin mr-3"/>
                    Running analysis via local AI...
                  </div>) : analysis ? (<>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                        <div className="text-sm font-medium text-[#DCE3E8] mb-3">Chance of Winning</div>
                        <div className="flex items-end gap-2 mb-3">
                          <span className="text-5xl font-bold text-white">{analysis.chance_of_winning}</span>
                          <span className="text-2xl text-[#DCE3E8] pb-2">/ 100</span>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${analysis.recommendation === 'Strong Buy' ? 'bg-[#2F6F5E]/30 text-white border border-[#2F6F5E]/40' :
                analysis.recommendation === 'Moderate Buy' ? 'bg-[#3F5E8C]/30 text-white border border-[#3F5E8C]/40' :
                    analysis.recommendation === 'Hold' ? 'bg-[#B38B2D]/30 text-white border border-[#B38B2D]/40' :
                        'bg-[#A94442]/30 text-white border border-[#A94442]/40'}`}>
                          {analysis.recommendation}
                        </span>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                        <div className="text-sm font-medium text-[#DCE3E8] mb-3">Risk Level</div>
                        <div className="text-3xl font-bold text-white mb-3">{analysis.risk_level}</div>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-white border border-white/20">
                          AI Confidence: {analysis.confidence_score}%
                        </span>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                        <div className="text-sm font-medium text-[#DCE3E8] mb-3">Predicted 12-Month Growth</div>
                        <div className="text-xl font-bold text-white mb-3 leading-relaxed">{analysis.growth_prediction}</div>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <p className="text-[#DCE3E8] leading-relaxed mb-4">{analysis.summary}</p>
                      {analysis.strengths.length > 0 && (<div className="mb-4">
                          <h4 className="text-white font-semibold mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {analysis.strengths.map((s, i) => (<li key={i} className="text-[#DCE3E8] text-sm flex items-start gap-2">
                                <span className="text-[#2F6F5E] mt-0.5">•</span>{s}
                              </li>))}
                          </ul>
                        </div>)}
                      {analysis.risks.length > 0 && (<div>
                          <h4 className="text-white font-semibold mb-2">Risks</h4>
                          <ul className="space-y-1">
                            {analysis.risks.map((r, i) => (<li key={i} className="text-[#DCE3E8] text-sm flex items-start gap-2">
                                <span className="text-[#B38B2D] mt-0.5">•</span>{r}
                              </li>))}
                          </ul>
                        </div>)}
                    </div>
                    <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <p className="text-xs text-[#DCE3E8] leading-relaxed">
                        <span className="font-semibold text-white">Disclaimer:</span> AI insights are generated by a local Ollama model (Qwen2.5:3b) based on available data and do not guarantee investment outcomes.
                      </p>
                    </div>
                  </>) : (<div className="text-[#DCE3E8] text-sm py-4 text-center">
                    AI analysis unavailable. Ensure Ollama is running locally.
                  </div>)}
              </div>
            </div>

            {/* Invest Modal */}
            {showInvestModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                  <button onClick={() => setShowInvestModal(false)} className="absolute top-4 right-4 text-[#0F1720] opacity-60 hover:opacity-100 transition-opacity">
                    <lucide_react_1.X className="w-6 h-6"/>
                  </button>
                  <h3 className="text-2xl font-bold text-[#0F1720] mb-2">Invest in {startName}</h3>
                  <p className="text-sm text-[#6B7A8C] mb-6">
                    {campaign && <>Min investment: ${(_a = campaign.minInvestment) === null || _a === void 0 ? void 0 : _a.toLocaleString()}</>}
                  </p>
                  {investMsg && (<div className={`mb-4 p-3 rounded-lg text-sm ${investMsg.includes('recorded') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                      {investMsg}
                    </div>)}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Investment Amount ($)</label>
                    <input type="number" min={(campaign === null || campaign === void 0 ? void 0 : campaign.minInvestment) || 1} value={investAmount || ''} onChange={e => setInvestAmount(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]"/>
                  </div>
                  <button onClick={handleInvest} disabled={investLoading || investAmount < ((campaign === null || campaign === void 0 ? void 0 : campaign.minInvestment) || 1)} className="w-full py-3 bg-[#274060] text-white font-semibold rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {investLoading ? 'Processing...' : `Invest $${investAmount.toLocaleString()}`}
                  </button>
                </div>
              </div>)}
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
                  <h3 className="font-semibold text-[#0F1720] mb-2">About</h3>
                  <p className="text-[#6B7A8C] leading-relaxed">
                    {(startup === null || startup === void 0 ? void 0 : startup.description) || 'No description available.'}
                  </p>
                </div>
                
                {(startup === null || startup === void 0 ? void 0 : startup.websiteUrl) && (<div>
                    <h3 className="font-semibold text-[#0F1720] mb-2">Website</h3>
                    <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#274060] hover:underline">
                      {startup.websiteUrl}
                    </a>
                  </div>)}
                
                {(startup === null || startup === void 0 ? void 0 : startup.foundedAt) && (<div>
                    <h3 className="font-semibold text-[#0F1720] mb-2">Founded</h3>
                    <p className="text-[#6B7A8C]">{new Date(startup.foundedAt).getFullYear()}</p>
                  </div>)}
                
                {(startup === null || startup === void 0 ? void 0 : startup.location) && (<div>
                    <h3 className="font-semibold text-[#0F1720] mb-2">Location</h3>
                    <p className="text-[#6B7A8C]">{startup.location}</p>
                  </div>)}
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
