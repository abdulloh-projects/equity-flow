import { CheckCircle, Bookmark, TrendingUp, Users, Calendar } from 'lucide-react';

interface Startup {
  id: number;
  name: string;
  logo: string;
  industry: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  revenue: string;
  monthlyGrowth: string;
  investorsCount: number;
  daysLeft: number;
  verified: boolean;
}

interface StartupCardProps {
  startup: Startup;
  viewMode: 'grid' | 'list';
  onStartupClick?: (id: number) => void;
}

export default function StartupCard({ startup, viewMode, onStartupClick }: StartupCardProps) {
  const fundingPercentage = (startup.amountRaised / startup.fundingGoal) * 100;
  
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
              {startup.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-[#0F1720]">{startup.name}</h3>
                {startup.verified && (
                  <CheckCircle className="w-5 h-5 text-[#2F6F5E]" />
                )}
              </div>
              <span className="inline-block px-3 py-1 bg-[#6C7A89] text-white rounded-full text-sm">
                {startup.industry}
              </span>
            </div>
          </div>

          {/* Middle: Description and Metrics */}
          <div className="flex-grow">
            <p className="text-[#6B7A8C] mb-4">{startup.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[#6B7A8C]">Revenue</p>
                <p className="font-semibold text-[#0F1720]">{startup.revenue}</p>
              </div>
              <div>
                <p className="text-[#6B7A8C]">Growth</p>
                <p className="font-semibold text-[#0F1720]">{startup.monthlyGrowth}</p>
              </div>
              <div>
                <p className="text-[#6B7A8C]">Investors</p>
                <p className="font-semibold text-[#0F1720]">{startup.investorsCount}</p>
              </div>
              <div>
                <p className="text-[#6B7A8C]">Days Left</p>
                <p className="font-semibold text-[#0F1720]">{startup.daysLeft}</p>
              </div>
            </div>
          </div>

          {/* Right: Funding Progress and Actions */}
          <div className="flex flex-col justify-between md:w-64 flex-shrink-0">
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
                <span className="text-[#0F1720] font-semibold">${(startup.amountRaised / 1000).toFixed(0)}K</span>
                <span className="text-[#6B7A8C]">of ${(startup.fundingGoal / 1000).toFixed(0)}K</span>
              </div>
            </div>
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
              {startup.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#0F1720]">{startup.name}</h3>
                {startup.verified && (
                  <CheckCircle className="w-4 h-4 text-[#2F6F5E]" />
                )}
              </div>
              <span className="inline-block mt-1 px-2 py-1 bg-[#6C7A89] text-white rounded-full text-xs">
                {startup.industry}
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
            <span className="text-[#0F1720] font-semibold">${(startup.amountRaised / 1000).toFixed(0)}K raised</span>
            <span className="text-[#6B7A8C]">of ${(startup.fundingGoal / 1000).toFixed(0)}K</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#DCE3E8]">
          <div>
            <p className="text-xs text-[#6B7A8C] mb-1">Revenue</p>
            <p className="text-sm font-semibold text-[#0F1720]">{startup.revenue}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7A8C] mb-1">Growth</p>
            <p className="text-sm font-semibold text-[#0F1720] flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#274060]" />
              {startup.monthlyGrowth}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6B7A8C] mb-1">Investors</p>
            <p className="text-sm font-semibold text-[#0F1720] flex items-center gap-1">
              <Users className="w-4 h-4 text-[#274060]" />
              {startup.investorsCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#6B7A8C] mb-1">Days Left</p>
            <p className="text-sm font-semibold text-[#0F1720] flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#274060]" />
              {startup.daysLeft}
            </p>
          </div>
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
