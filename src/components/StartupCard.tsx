import { CheckCircle, Bookmark, TrendingUp, Users, Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { StartupSummary, CampaignSummary } from '../services/startupService';

interface StartupCardProps {
  startup: StartupSummary & { logo?: string; industry?: string; fundingGoal?: number; amountRaised?: number; revenue?: string; monthlyGrowth?: string; investorsCount?: number; daysLeft?: number; verified?: boolean; winChance?: number };
  viewMode: 'grid' | 'list';
  onStartupClick?: (id: number) => void;
  campaign?: CampaignSummary;
}

function computeWinChance(campaign?: CampaignSummary): number | null {
  if (!campaign) return null;
  const fundingScore = campaign.targetAmount > 0 ? Math.min(100, (campaign.raisedAmount / campaign.targetAmount) * 100) : 0;
  const revenueScore = campaign.revenue > 0 ? Math.min(100, ((campaign.revenue - (campaign.burnRate || 0)) / campaign.revenue) * 100 + 50) : 30;
  const runwayScore = Math.min(100, (campaign.runway || 0) * 6);
  return Math.round(fundingScore * 0.3 + revenueScore * 0.4 + runwayScore * 0.3);
}

export default function StartupCard({ startup, viewMode, onStartupClick, campaign }: StartupCardProps) {
  const logo = startup.logo || startup.name.substring(0, 2).toUpperCase();
  const industry = startup.industry || 'Startup';
  const fundingGoal = startup.fundingGoal || campaign?.targetAmount || 0;
  const amountRaised = startup.amountRaised || campaign?.raisedAmount || 0;
  const fundingPercentage = fundingGoal > 0 ? (amountRaised / fundingGoal) * 100 : 0;
  const verified = startup.verified ?? true;
  const winChance = startup.winChance ?? computeWinChance(campaign);
  
  const handleClick = () => {
    if (onStartupClick) {
      onStartupClick(startup.id);
    }
  };
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-[#DCE3E8] rounded-xl p-6 hover:shadow-lg hover:border-[#274060] transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Logo and Basic Info */}
          <div className="flex items-start gap-4 flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-semibold text-xl">
              {logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-[#0F1720]">{startup.name}</h3>
                {verified && (
                  <CheckCircle className="w-5 h-5 text-[#2F6F5E]" />
                )}
              </div>
              <span className="inline-block px-3 py-1 bg-[#6C7A89] text-white rounded-full text-sm">
                {industry}
              </span>
              {startup.location && (
                <div className="flex items-center gap-1 mt-1 text-xs text-[#6B7A8C]">
                  <MapPin className="w-3 h-3" />
                  {startup.location}
                </div>
              )}
            </div>
          </div>

          {/* Middle: Description and Metrics */}
          <div className="flex-grow">
            <p className="text-[#6B7A8C] mb-4">{startup.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[#6B7A8C]">Revenue</p>
                <p className="font-semibold text-[#0F1720]">{startup.revenue || (campaign ? `$${campaign.revenue?.toLocaleString()}` : '—')}</p>
              </div>
              <div>
                <p className="text-[#6B7A8C]">Growth</p>
                <p className="font-semibold text-[#0F1720]">{startup.monthlyGrowth || '—'}</p>
              </div>
              <div>
                <p className="text-[#6B7A8C]">Investors</p>
                <p className="font-semibold text-[#0F1720]">{startup.investorsCount || '—'}</p>
              </div>
              <div>
                <p className="text-[#6B7A8C]">Days Left</p>
                <p className="font-semibold text-[#0F1720]">{startup.daysLeft || (campaign?.deadline ? Math.max(0, Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000*60*60*24))) : '—')}</p>
              </div>
            </div>
          </div>

          {/* Right: Funding Progress and Actions */}
          <div className="flex flex-col justify-between md:w-64 flex-shrink-0">
            {winChance !== null && (
              <div className="mb-3 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  winChance >= 70 ? 'bg-[#2F6F5E] text-white' :
                  winChance >= 45 ? 'bg-[#B38B2D] text-white' :
                  'bg-[#A94442] text-white'
                }`}>
                  Win Chance: {winChance}%
                </span>
              </div>
            )}
            {fundingGoal > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#6B7A8C]">Funding Progress</span>
                  <span className="text-sm font-semibold text-[#274060]">{fundingPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-[#DCE3E8] rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-[#274060] to-[#3A5A7A] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#0F1720] font-semibold">${(amountRaised / 1000).toFixed(0)}K</span>
                  <span className="text-[#6B7A8C]">of ${(fundingGoal / 1000).toFixed(0)}K</span>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button 
                onClick={handleClick}
                className="flex-grow px-4 py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200"
              >
                View Details
              </button>
              <button className="p-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] hover:bg-[#F5F7FA] transition-all duration-200">
                <Bookmark className="w-5 h-5 text-[#6B7A8C]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DCE3E8] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#274060] transition-all duration-300 group">
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-semibold">
              {logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#0F1720]">{startup.name}</h3>
                {verified && (
                  <CheckCircle className="w-4 h-4 text-[#2F6F5E]" />
                )}
                {winChance !== null && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    winChance >= 70 ? 'bg-[#2F6F5E] text-white' :
                    winChance >= 45 ? 'bg-[#B38B2D] text-white' :
                    'bg-[#A94442] text-white'
                  }`}>
                    {winChance}%
                  </span>
                )}
              </div>
              <span className="inline-block mt-1 px-2 py-1 bg-[#6C7A89] text-white rounded-full text-xs">
                {industry}
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors duration-200">
            <Bookmark className="w-5 h-5 text-[#6B7A8C]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-[#6B7A8C] mb-4 line-clamp-2">
          {startup.description}
        </p>

        {/* Funding Section */}
        {fundingGoal > 0 && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#6B7A8C]">Funding Progress</span>
              <span className="text-sm font-semibold text-[#274060]">{fundingPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-[#DCE3E8] rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-[#274060] to-[#3A5A7A] h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#0F1720] font-semibold">${(amountRaised / 1000).toFixed(0)}K raised</span>
              <span className="text-[#6B7A8C]">of ${(fundingGoal / 1000).toFixed(0)}K</span>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#DCE3E8]">
          <div>
            <p className="text-xs text-[#6B7A8C] mb-1">Location</p>
            <p className="text-sm font-semibold text-[#0F1720]">{startup.location || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7A8C] mb-1">Website</p>
            <p className="text-sm font-semibold text-[#0F1720]">
              {startup.websiteUrl ? (
                <a href={startup.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#274060] hover:underline">
                  <ExternalLink className="w-3 h-3" />
                  Link
                </a>
              ) : '—'}
            </p>
          </div>
          {startup.foundedAt && (
            <div>
              <p className="text-xs text-[#6B7A8C] mb-1">Founded</p>
              <p className="text-sm font-semibold text-[#0F1720]">{new Date(startup.foundedAt).getFullYear()}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-6">
        <button 
          onClick={handleClick}
          className="w-full px-4 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-all duration-200 group-hover:shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
