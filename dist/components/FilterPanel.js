"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FilterPanel;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function FilterPanel({ onFilterChange, viewMode, onViewModeChange }) {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [industry, setIndustry] = (0, react_1.useState)('');
    const [fundingStage, setFundingStage] = (0, react_1.useState)('');
    const [location, setLocation] = (0, react_1.useState)('');
    const [minInvestment, setMinInvestment] = (0, react_1.useState)('');
    const [sortBy, setSortBy] = (0, react_1.useState)('newest');
    const industries = ['All', 'Fintech', 'AI', 'SaaS', 'HealthTech', 'EdTech', 'E-commerce', 'CleanTech'];
    const fundingStages = ['All', 'Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C'];
    const locations = ['All', 'USA', 'Europe', 'Asia', 'Latin America', 'Middle East'];
    const sortOptions = [
        { value: 'newest', label: 'Newest' },
        { value: 'trending', label: 'Trending' },
        { value: 'most-funded', label: 'Most Funded' },
        { value: 'closing-soon', label: 'Closing Soon' },
        { value: 'highest-growth', label: 'Highest Growth' }
    ];
    const handleClearFilters = () => {
        setSearchQuery('');
        setIndustry('');
        setFundingStage('');
        setLocation('');
        setMinInvestment('');
        setSortBy('newest');
        onFilterChange({});
    };
    return (<div className="bg-white border-b border-[#DCE3E8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <lucide_react_1.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C7A89]"/>
            <input type="text" placeholder="Search by startup name, industry, keyword..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-[#DCE3E8] rounded-lg focus:outline-none focus:border-[#274060] transition-colors duration-200"/>
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Industry Filter */}
          <div className="relative">
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#274060] transition-colors duration-200 bg-white">
              <option value="">All Industries</option>
              {industries.map((ind) => (<option key={ind} value={ind}>{ind}</option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C7A89] pointer-events-none"/>
          </div>

          {/* Funding Stage Filter */}
          <div className="relative">
            <select value={fundingStage} onChange={(e) => setFundingStage(e.target.value)} className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#274060] transition-colors duration-200 bg-white">
              <option value="">All Funding Stages</option>
              {fundingStages.map((stage) => (<option key={stage} value={stage}>{stage}</option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C7A89] pointer-events-none"/>
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#274060] transition-colors duration-200 bg-white">
              <option value="">All Locations</option>
              {locations.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C7A89] pointer-events-none"/>
          </div>

          {/* Min Investment */}
          <div className="relative">
            <input type="text" placeholder="Min. Investment ($)" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} className="w-full px-4 py-3 border border-[#DCE3E8] rounded-lg focus:outline-none focus:border-[#274060] transition-colors duration-200"/>
          </div>
        </div>

        {/* Sort and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Sort By */}
            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border border-[#DCE3E8] rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#274060] transition-colors duration-200 bg-white pr-10">
                {sortOptions.map((option) => (<option key={option.value} value={option.value}>
                    {option.label}
                  </option>))}
              </select>
              <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6C7A89] pointer-events-none"/>
            </div>

            {/* Clear Filters */}
            <button onClick={handleClearFilters} className="flex items-center gap-2 px-4 py-2 text-[#274060] hover:text-[#3A5A7A] transition-colors duration-200">
              <lucide_react_1.X className="w-4 h-4"/>
              Clear Filters
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-[#F5F7FA] rounded-lg p-1">
            <button onClick={() => onViewModeChange('grid')} className={`p-2 rounded transition-all duration-200 ${viewMode === 'grid'
            ? 'bg-[#274060] text-white'
            : 'text-[#6C7A89] hover:text-[#274060]'}`}>
              <lucide_react_1.Grid3x3 className="w-5 h-5"/>
            </button>
            <button onClick={() => onViewModeChange('list')} className={`p-2 rounded transition-all duration-200 ${viewMode === 'list'
            ? 'bg-[#274060] text-white'
            : 'text-[#6C7A89] hover:text-[#274060]'}`}>
              <lucide_react_1.List className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
    </div>);
}
