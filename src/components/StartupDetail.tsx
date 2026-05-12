import { useState, useEffect } from 'react';
import { MapPin, Bookmark, TrendingUp, Calendar, FileText, Download, ChevronRight, ArrowLeft, Play, Loader2, AlertCircle, X, ExternalLink } from 'lucide-react';
import { startupService, StartupSummary, CampaignSummary, StartupDocument } from '../services/startupService';
import { investService } from '../services/investService';
import { analysisService, AnalysisResponse } from '../services/analysisService';
import svgPaths from "../imports/svg-y9jn7u1z55";

interface StartupDetailProps {
  startupId?: number | null;
  onBack?: () => void;
}

export default function StartupDetail({ startupId, onBack }: StartupDetailProps) {
  const [startup, setStartup] = useState<StartupSummary | null>(null);
  const [campaign, setCampaign] = useState<CampaignSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse['analysis'] | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investAmount, setInvestAmount] = useState(0);
  const [investLoading, setInvestLoading] = useState(false);
  const [investMsg, setInvestMsg] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);
  const [documents, setDocuments] = useState<StartupDocument[]>([]);

  useEffect(() => {
    if (!startupId) return;
    setLoading(true);
    setError(null);
    Promise.all([
      startupService.getStartup(startupId).catch(() => null),
      startupService.getCampaignsByStartup(startupId).catch(() => null),
    ]).then(([startupRes, campaignsRes]) => {
      if (startupRes) {
        setStartup(startupRes as unknown as StartupSummary);
      } else {
        setError('Failed to load startup details');
      }
      if (campaignsRes && campaignsRes.campaigns?.length > 0) {
        setCampaign(campaignsRes.campaigns[0]);
      }
    }).catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to load startup');
    }).finally(() => {
      setLoading(false);
    });
  }, [startupId]);

  useEffect(() => {
    if (!startupId) return;
    startupService.getVideo(startupId).then(r => { if (r.youtube_url) setYoutubeUrl(r.youtube_url); }).catch(() => {});
    startupService.getDocuments(startupId).then(r => setDocuments(r.documents ?? [])).catch(() => {});
  }, [startupId]);

  useEffect(() => {
    if (!startupId) return;
    setAnalysisLoading(true);
    analysisService.analyzeStartup(startupId)
      .then(res => setAnalysis(res.analysis))
      .catch(() => {})
      .finally(() => setAnalysisLoading(false));
  }, [startupId]);

  const handleInvest = async () => {
    if (!startupId || !campaign || investAmount < (campaign.minInvestment || 1)) return;
    setInvestLoading(true);
    setInvestMsg(null);
    try {
      const res = await investService.invest({
        startup_id: startupId,
        campaign_id: campaign.id,
        amount: investAmount,
      });
      if (res.success) {
        setInvestMsg(`Investment of $${investAmount.toLocaleString()} recorded! The founder will be in touch.`);
      } else {
        setInvestMsg(res.message || 'Investment failed.');
      }
    } catch (err) {
      setInvestMsg(err instanceof Error ? err.message : 'Investment failed.');
    } finally {
      setInvestLoading(false);
    }
  };

  const getYoutubeEmbedId = (url: string): string | null => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
      return u.searchParams.get('v');
    } catch { return null; }
  };

  const startName = startup?.name || 'Startup';
  const startLogo = startName.substring(0, 2).toUpperCase();
  const startLocation = startup?.location || 'Unknown';
  const targetAmount = campaign?.targetAmount || 500000;
  const raisedAmount = campaign?.raisedAmount || 0;
  const fundingPct = targetAmount > 0 ? ((raisedAmount / targetAmount) * 100).toFixed(0) : '0';

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#274060]" />
        <span className="ml-3 text-[#6B7A8C]">Loading startup details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-700 font-medium">{error}</p>
        <button onClick={onBack} className="px-4 py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A]">
          Back to Startups
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Back Button */}
      {onBack && (
        <div className="bg-white border-b border-[#DCE3E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[#274060] hover:text-[#3A5A7A] transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Startups</span>
            </button>
          </div>
        </div>
      )}
      
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
                      {campaign && (
                        <span className="px-4 py-1.5 bg-[#6C7A89] text-white rounded-full text-sm font-medium capitalize">{campaign.status}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#6B7A8C]">
                      <MapPin className="w-4 h-4" />
                      <span>{startLocation}</span>
                    </div>
                  </div>
                </div>

                {campaign && (
                <div className="pt-4 border-t border-[#DCE3E8]">
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
                </div>
                )}

                {!campaign && startup?.description && (
                  <div className="pt-4 border-t border-[#DCE3E8]">
                    <p className="text-[#6B7A8C] leading-relaxed">{startup.description}</p>
                    {startup.websiteUrl && (
                      <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-sm text-[#274060] hover:underline">Visit Website →</a>
                    )}
                  </div>
                )}
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
                      <Bookmark className="w-5 h-5 text-[#274060]" />
                    </button>
                  </div>
                  
                  <div>
                    <div className="text-sm text-[#6B7A8C] mb-1">Amount Raised</div>
                    <div className="text-3xl font-bold text-[#274060]">${raisedAmount.toLocaleString()}</div>
                  </div>

                  {targetAmount > 0 && (
                  <div className="space-y-2">
                    <div className="w-full bg-[#DCE3E8] rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-[#274060] rounded-full transition-all duration-500" style={{ width: `${Math.min(Number(fundingPct), 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#274060] font-semibold">{fundingPct}% funded</span>
                      {campaign?.deadline && (
                        <span className="text-[#6B7A8C]">{Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000*60*60*24)))} days left</span>
                      )}
                    </div>
                  </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#DCE3E8] space-y-4">
                  {campaign && (
                  <div className="flex justify-between">
                    <span className="text-[#6B7A8C]">Minimum Investment</span>
                    <span className="font-semibold text-[#0F1720]">${(campaign.minInvestment || 0).toLocaleString()}</span>
                  </div>
                  )}
                  <button onClick={() => { setInvestMsg(null); setInvestAmount(campaign?.minInvestment || 0); setShowInvestModal(true); }}
                    className="w-full py-3 bg-[#274060] text-white rounded-lg font-semibold hover:bg-[#3A5A7A] transition-colors duration-200">Invest Now</button>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">AI Investment Insight</h2>
                  </div>
                  <p className="text-sm text-[#DCE3E8] leading-relaxed">
                    Machine-assisted risk and growth evaluation based on financial, traction, and market signals via local Ollama Qwen2.5.
                  </p>
                </div>

                {analysisLoading ? (
                  <div className="flex items-center justify-center py-12 text-[#DCE3E8]">
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Running analysis via local AI...
                  </div>
                ) : analysis ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                        <div className="text-sm font-medium text-[#DCE3E8] mb-3">Chance of Winning</div>
                        <div className="flex items-end gap-2 mb-3">
                          <span className="text-5xl font-bold text-white">{analysis.chance_of_winning}</span>
                          <span className="text-2xl text-[#DCE3E8] pb-2">/ 100</span>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${
                          analysis.recommendation === 'Strong Buy' ? 'bg-[#2F6F5E]/30 text-white border border-[#2F6F5E]/40' :
                          analysis.recommendation === 'Moderate Buy' ? 'bg-[#3F5E8C]/30 text-white border border-[#3F5E8C]/40' :
                          analysis.recommendation === 'Hold' ? 'bg-[#B38B2D]/30 text-white border border-[#B38B2D]/40' :
                          'bg-[#A94442]/30 text-white border border-[#A94442]/40'
                        }`}>
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
                      {analysis.strengths.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white font-semibold mb-2">Strengths</h4>
                          <ul className="space-y-1">
                            {analysis.strengths.map((s, i) => (
                              <li key={i} className="text-[#DCE3E8] text-sm flex items-start gap-2">
                                <span className="text-[#2F6F5E] mt-0.5">•</span>{s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysis.risks.length > 0 && (
                        <div>
                          <h4 className="text-white font-semibold mb-2">Risks</h4>
                          <ul className="space-y-1">
                            {analysis.risks.map((r, i) => (
                              <li key={i} className="text-[#DCE3E8] text-sm flex items-start gap-2">
                                <span className="text-[#B38B2D] mt-0.5">•</span>{r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <p className="text-xs text-[#DCE3E8] leading-relaxed">
                        <span className="font-semibold text-white">Disclaimer:</span> AI insights are generated by a local Ollama model (Qwen2.5:3b) based on available data and do not guarantee investment outcomes.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-[#DCE3E8] text-sm py-4 text-center">
                    AI analysis unavailable. Ensure Ollama is running locally.
                  </div>
                )}
              </div>
            </div>

            {/* Invest Modal */}
            {showInvestModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
                  <button onClick={() => setShowInvestModal(false)}
                    className="absolute top-4 right-4 text-[#0F1720] opacity-60 hover:opacity-100 transition-opacity">
                    <X className="w-6 h-6" />
                  </button>
                  <h3 className="text-2xl font-bold text-[#0F1720] mb-2">Invest in {startName}</h3>
                  <p className="text-sm text-[#6B7A8C] mb-6">
                    {campaign && <>Min investment: ${campaign.minInvestment?.toLocaleString()}</>}
                  </p>
                  {investMsg && (
                    <div className={`mb-4 p-3 rounded-lg text-sm ${investMsg.includes('recorded') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                      {investMsg}
                    </div>
                  )}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#0F1720] mb-2">Investment Amount ($)</label>
                    <input type="number" min={campaign?.minInvestment || 1} value={investAmount || ''}
                      onChange={e => setInvestAmount(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:ring-2 focus:ring-[#274060] focus:border-[#274060]" />
                  </div>
                  <button onClick={handleInvest} disabled={investLoading || investAmount < (campaign?.minInvestment || 1)}
                    className="w-full py-3 bg-[#274060] text-white font-semibold rounded-lg hover:bg-[#3A5A7A] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {investLoading ? 'Processing...' : `Invest $${investAmount.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
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
                    {startup?.description || 'No description available.'}
                  </p>
                </div>
                
                {startup?.websiteUrl && (
                  <div>
                    <h3 className="font-semibold text-[#0F1720] mb-2">Website</h3>
                    <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#274060] hover:underline">
                      {startup.websiteUrl}
                    </a>
                  </div>
                )}
                
                {startup?.foundedAt && (
                  <div>
                    <h3 className="font-semibold text-[#0F1720] mb-2">Founded</h3>
                    <p className="text-[#6B7A8C]">{new Date(startup.foundedAt).getFullYear()}</p>
                  </div>
                )}
                
                {startup?.location && (
                  <div>
                    <h3 className="font-semibold text-[#0F1720] mb-2">Location</h3>
                    <p className="text-[#6B7A8C]">{startup.location}</p>
                  </div>
                )}
              </div>

              {/* Pitch & Demo Video Section */}
              <div className="pt-8 border-t border-[#DCE3E8]">
                <div className="flex items-center gap-3 mb-6">
                  <Play className="w-5 h-5 text-[#274060]" fill="currentColor" />
                  <h3 className="text-xl font-semibold text-[#0F1720]">Pitch & Demo Video</h3>
                </div>
                {youtubeUrl && getYoutubeEmbedId(youtubeUrl) ? (
                  <div className="rounded-xl overflow-hidden border-2 border-[#DCE3E8] aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYoutubeEmbedId(youtubeUrl)}`}
                      title="Pitch & Demo Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 rounded-xl border-2 border-dashed border-[#DCE3E8] text-center">
                    <Play className="w-10 h-10 text-[#DCE3E8]" />
                    <p className="text-[#6B7A8C] text-sm">No pitch video added yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Metrics Section */}
            {campaign && (
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#0F1720]">Key Metrics</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">${(campaign.revenue || 0).toLocaleString()}</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Monthly Revenue</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">{(campaign.grossMargin || 0).toFixed(0)}%</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Gross Margin</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">{campaign.activeCustomers || 0}</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Active Customers</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">${(campaign.targetAmount || 0).toLocaleString()}</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Funding Goal</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">${(campaign.valuation || 0).toLocaleString()}</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Valuation</div>
                  </div>
                </div>

                <div className="bg-white border border-[#DCE3E8] rounded-lg p-6 hover:border-[#274060] transition-colors duration-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#274060]">{campaign.runway || 0} mo</div>
                    <div className="text-sm text-[#6B7A8C] mt-2">Runway</div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Team Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#DCE3E8] p-8 space-y-6">
              <h2 className="text-2xl font-bold text-[#0F1720]">Founding Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                  <div className="w-16 h-16 bg-[#6C7A89] rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32">
                      <path d={svgPaths.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
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
                      <path d={svgPaths.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
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
                      <path d={svgPaths.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
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
                      <path d={svgPaths.p27a3200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p2ee517c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p18f42980} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
                      <path d={svgPaths.p37b568c0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.67" />
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
                <FileText className="w-5 h-5 text-[#274060]" />
                Documents & Resources
              </h3>
              {documents.length === 0 ? (
                <p className="text-sm text-[#6B7A8C]">No documents uploaded yet.</p>
              ) : (
                <div className="space-y-2">
                  {documents.map(doc => (
                    <a
                      key={doc.id}
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-3 border border-[#DCE3E8] rounded-lg hover:border-[#274060] hover:bg-[#F5F7FA] transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Download className="w-4 h-4 text-[#274060] flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-sm text-[#0F1720] block truncate">{doc.title}</span>
                          <span className="text-xs text-[#6B7A8C] capitalize">{doc.doc_type.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[#0F1720] opacity-40 group-hover:opacity-100 flex-shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Disclosure */}
            <div className="bg-[#F5F7FA] rounded-xl p-6 space-y-3 border border-[#DCE3E8]">
              <h3 className="font-semibold text-[#0F1720] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#B38B2D]" />
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
                    <Calendar className="w-4 h-4" />
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
                    <Calendar className="w-4 h-4" />
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
                    <Calendar className="w-4 h-4" />
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
    </div>
  );
}
