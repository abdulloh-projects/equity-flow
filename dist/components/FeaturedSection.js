"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeaturedSection;
const lucide_react_1 = require("lucide-react");
const featuredStartups = [
    {
        id: 1,
        name: 'PayStream',
        logo: 'PS',
        industry: 'Fintech',
        description: 'Next-generation payment processing for global businesses',
        badge: 'hot',
        amountRaised: 480000,
        fundingGoal: 500000
    },
    {
        id: 2,
        name: 'HealthAI',
        logo: 'HA',
        industry: 'HealthTech',
        description: 'AI-powered diagnostics for early disease detection',
        badge: 'closing',
        amountRaised: 890000,
        fundingGoal: 1000000
    },
    {
        id: 3,
        name: 'EduVerse',
        logo: 'EV',
        industry: 'EdTech',
        description: 'Immersive VR platform for online education',
        badge: 'new',
        amountRaised: 120000,
        fundingGoal: 750000
    },
    {
        id: 4,
        name: 'GreenGrid',
        logo: 'GG',
        industry: 'CleanTech',
        description: 'Smart energy management for sustainable cities',
        badge: 'hot',
        amountRaised: 650000,
        fundingGoal: 800000
    }
];
function FeaturedSection() {
    const getBadgeConfig = (badge) => {
        switch (badge) {
            case 'hot':
                return { icon: lucide_react_1.Flame, label: 'Hot', color: 'from-[#B38B2D] to-[#F59E0B]' }; // Warning color + Orange
            case 'closing':
                return { icon: lucide_react_1.Clock, label: 'Almost Funded', color: 'from-[#274060] to-[#3A5A7A]' };
            case 'new':
                return { icon: lucide_react_1.Sparkles, label: 'New', color: 'from-[#3A5A7A] to-[#6C7A89]' };
            default:
                return { icon: lucide_react_1.Sparkles, label: 'Featured', color: 'from-[#274060] to-[#3A5A7A]' };
        }
    };
    return (<section className="bg-gradient-to-br from-[#F5F7FA] to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-[#0F1720] mb-2">Trending This Week</h2>
            <p className="text-[#6B7A8C]">High-performing startups with momentum</p>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredStartups.map((startup) => {
            const badgeConfig = getBadgeConfig(startup.badge);
            const BadgeIcon = badgeConfig.icon;
            const fundingPercentage = (startup.amountRaised / startup.fundingGoal) * 100;
            return (<div key={startup.id} 
            // eslint-disable-next-line
            className="flex-shrink-0 w-80 bg-white border-2 border-[#DCE3E8] rounded-xl overflow-hidden hover:shadow-2xl hover:border-[#274060] transition-all duration-300 group">
                  {/* Badge Ribbon */}
                  <div className={`bg-gradient-to-r ${badgeConfig.color} px-4 py-2 flex items-center justify-center gap-2`}>
                    <BadgeIcon className="w-4 h-4 text-white"/>
                    <span className="text-white text-sm font-semibold">{badgeConfig.label}</span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                        {startup.logo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0F1720] text-lg">{startup.name}</h3>
                        <span className="text-sm text-[#6B7A8C]">{startup.industry}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[#6B7A8C] mb-4">
                      {startup.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-[#6B7A8C]">{fundingPercentage.toFixed(0)}% Funded</span>
                        <span className="text-sm font-semibold text-[#274060]">${(startup.amountRaised / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full bg-[#DCE3E8] rounded-full h-2">
                        <div className="bg-gradient-to-r from-[#274060] to-[#3A5A7A] h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min(fundingPercentage, 100)}%` }}></div>
                      </div>
                    </div>

                    <button className="w-full px-4 py-3 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-all duration-200 group-hover:shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>);
        })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>);
}
