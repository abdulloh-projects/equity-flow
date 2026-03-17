"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_1 = require("react");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const Hero_1 = __importDefault(require("./components/Hero"));
const RoleCards_1 = __importDefault(require("./components/RoleCards"));
const Statistics_1 = __importDefault(require("./components/Statistics"));
const HowItWorks_1 = __importDefault(require("./components/HowItWorks"));
const Footer_1 = __importDefault(require("./components/Footer"));
const MarketplaceHero_1 = __importDefault(require("./components/MarketplaceHero"));
const FilterPanel_1 = __importDefault(require("./components/FilterPanel"));
const StartupCard_1 = __importDefault(require("./components/StartupCard"));
const FeaturedSection_1 = __importDefault(require("./components/FeaturedSection"));
const TrustSection_1 = __importDefault(require("./components/TrustSection"));
const StartupDetail_1 = __importDefault(require("./components/StartupDetail"));
const InvestorsPage_1 = __importDefault(require("./components/InvestorsPage"));
const LoginPage_1 = __importDefault(require("./components/LoginPage"));
const RegisterPage_1 = __importDefault(require("./components/RegisterPage"));
const FounderControlPanel_1 = __importDefault(require("./components/FounderControlPanel"));
const lucide_react_1 = require("lucide-react");
// Mock startup data
const startups = [
    {
        id: 1,
        name: 'FinFlow',
        logo: 'FF',
        industry: 'Fintech',
        description: 'Revolutionary digital banking platform for millennials and Gen Z with AI-powered financial planning',
        fundingGoal: 500000,
        amountRaised: 320000,
        revenue: '$2.5M ARR',
        monthlyGrowth: '15%',
        investorsCount: 147,
        daysLeft: 23,
        verified: true
    },
    {
        id: 2,
        name: 'MedLink',
        logo: 'ML',
        industry: 'HealthTech',
        description: 'Telemedicine platform connecting patients with specialists worldwide in real-time',
        fundingGoal: 750000,
        amountRaised: 680000,
        revenue: '$4.2M ARR',
        monthlyGrowth: '22%',
        investorsCount: 203,
        daysLeft: 12,
        verified: true
    },
    {
        id: 3,
        name: 'CloudSuite',
        logo: 'CS',
        industry: 'SaaS',
        description: 'All-in-one business management software for SMBs with integrated CRM and analytics',
        fundingGoal: 1000000,
        amountRaised: 450000,
        revenue: '$1.8M ARR',
        monthlyGrowth: '18%',
        investorsCount: 89,
        daysLeft: 45,
        verified: true
    },
    {
        id: 4,
        name: 'LearnHub',
        logo: 'LH',
        industry: 'EdTech',
        description: 'Adaptive learning platform using AI to personalize education for K-12 students',
        fundingGoal: 600000,
        amountRaised: 380000,
        revenue: '$950K ARR',
        monthlyGrowth: '25%',
        investorsCount: 156,
        daysLeft: 30,
        verified: true
    },
    {
        id: 5,
        name: 'ShopSmart',
        logo: 'SS',
        industry: 'E-commerce',
        description: 'AI-powered shopping assistant that finds the best deals across thousands of online stores',
        fundingGoal: 400000,
        amountRaised: 290000,
        revenue: '$3.1M ARR',
        monthlyGrowth: '28%',
        investorsCount: 178,
        daysLeft: 18,
        verified: true
    },
    {
        id: 6,
        name: 'EcoTrack',
        logo: 'ET',
        industry: 'CleanTech',
        description: 'Carbon footprint tracking and offset platform for environmentally conscious businesses',
        fundingGoal: 800000,
        amountRaised: 520000,
        revenue: '$1.2M ARR',
        monthlyGrowth: '20%',
        investorsCount: 134,
        daysLeft: 38,
        verified: true
    },
    {
        id: 7,
        name: 'DataVault',
        logo: 'DV',
        industry: 'SaaS',
        description: 'Enterprise-grade data security and compliance platform with blockchain verification',
        fundingGoal: 1200000,
        amountRaised: 780000,
        revenue: '$5.6M ARR',
        monthlyGrowth: '12%',
        investorsCount: 267,
        daysLeft: 25,
        verified: true
    },
    {
        id: 8,
        name: 'FitAI',
        logo: 'FA',
        industry: 'HealthTech',
        description: 'Personalized fitness and nutrition app powered by machine learning algorithms',
        fundingGoal: 350000,
        amountRaised: 310000,
        revenue: '$890K ARR',
        monthlyGrowth: '30%',
        investorsCount: 192,
        daysLeft: 8,
        verified: true
    },
    {
        id: 9,
        name: 'TravelEase',
        logo: 'TE',
        industry: 'E-commerce',
        description: 'Smart travel booking platform with AI itinerary planning and real-time price optimization',
        fundingGoal: 550000,
        amountRaised: 410000,
        revenue: '$2.8M ARR',
        monthlyGrowth: '16%',
        investorsCount: 145,
        daysLeft: 42,
        verified: true
    },
    {
        id: 10,
        name: 'CodeMentor',
        logo: 'CM',
        industry: 'EdTech',
        description: 'Live coding mentorship platform connecting developers with expert instructors',
        fundingGoal: 450000,
        amountRaised: 270000,
        revenue: '$1.5M ARR',
        monthlyGrowth: '24%',
        investorsCount: 98,
        daysLeft: 35,
        verified: true
    },
    {
        id: 11,
        name: 'SmartPay',
        logo: 'SP',
        industry: 'Fintech',
        description: 'Cryptocurrency payment gateway for e-commerce with instant conversion and low fees',
        fundingGoal: 900000,
        amountRaised: 650000,
        revenue: '$3.4M ARR',
        monthlyGrowth: '19%',
        investorsCount: 221,
        daysLeft: 28,
        verified: true
    },
    {
        id: 12,
        name: 'AgriTech',
        logo: 'AT',
        industry: 'CleanTech',
        description: 'IoT-based precision farming solution for sustainable agriculture and crop optimization',
        fundingGoal: 700000,
        amountRaised: 420000,
        revenue: '$1.6M ARR',
        monthlyGrowth: '14%',
        investorsCount: 112,
        daysLeft: 50,
        verified: true
    },
    {
        id: 13,
        name: 'RoboFleet',
        logo: 'RF',
        industry: 'AI',
        description: 'Autonomous delivery robots for last-mile logistics with advanced navigation systems',
        fundingGoal: 1500000,
        amountRaised: 920000,
        revenue: '$4.8M ARR',
        monthlyGrowth: '21%',
        investorsCount: 289,
        daysLeft: 33,
        verified: true
    },
    {
        id: 14,
        name: 'SecureNet',
        logo: 'SN',
        industry: 'SaaS',
        description: 'Cybersecurity platform with real-time threat detection and automated response systems',
        fundingGoal: 850000,
        amountRaised: 670000,
        revenue: '$3.9M ARR',
        monthlyGrowth: '17%',
        investorsCount: 195,
        daysLeft: 21,
        verified: true
    },
    {
        id: 15,
        name: 'VoiceAI',
        logo: 'VA',
        industry: 'AI',
        description: 'Natural language processing API for customer service automation and voice assistants',
        fundingGoal: 950000,
        amountRaised: 780000,
        revenue: '$6.2M ARR',
        monthlyGrowth: '26%',
        investorsCount: 312,
        daysLeft: 16,
        verified: true
    },
    {
        id: 16,
        name: 'GreenEnergy',
        logo: 'GE',
        industry: 'CleanTech',
        description: 'Solar panel marketplace and installation management platform for residential properties',
        fundingGoal: 650000,
        amountRaised: 485000,
        revenue: '$2.1M ARR',
        monthlyGrowth: '13%',
        investorsCount: 167,
        daysLeft: 40,
        verified: true
    },
    {
        id: 17,
        name: 'StyleBox',
        logo: 'SB',
        industry: 'E-commerce',
        description: 'AI-powered personal styling service with subscription-based fashion box delivery',
        fundingGoal: 480000,
        amountRaised: 395000,
        revenue: '$2.9M ARR',
        monthlyGrowth: '23%',
        investorsCount: 208,
        daysLeft: 27,
        verified: true
    },
    {
        id: 18,
        name: 'WellnessHub',
        logo: 'WH',
        industry: 'HealthTech',
        description: 'Integrated mental health platform combining therapy, meditation, and wellness tracking',
        fundingGoal: 720000,
        amountRaised: 540000,
        revenue: '$3.7M ARR',
        monthlyGrowth: '29%',
        investorsCount: 243,
        daysLeft: 14,
        verified: true
    }
];
function App() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)('home');
    const [viewMode, setViewMode] = (0, react_1.useState)('grid');
    const [marketplacePage, setMarketplacePage] = (0, react_1.useState)(1);
    const [selectedStartupId, setSelectedStartupId] = (0, react_1.useState)(null);
    const startupsPerPage = 9;
    const handleNavigation = (page) => {
        setCurrentPage(page);
        setSelectedStartupId(null);
    };
    const handleStartupClick = (id) => {
        setSelectedStartupId(id);
        setCurrentPage('startup-detail');
    };
    const handleFilterChange = (filters) => {
        console.log('Filters applied:', filters);
    };
    const handlePageChange = (page) => {
        setMarketplacePage(page);
    };
    // Founder Control Panel page content
    if (currentPage === 'control-panel') {
        return <FounderControlPanel_1.default onNavigate={handleNavigation}/>;
    }
    // Register page content
    if (currentPage === 'register') {
        return <RegisterPage_1.default onBackToHome={() => handleNavigation('home')}/>;
    }
    // Login page content
    if (currentPage === 'login') {
        return <LoginPage_1.default onBackToHome={() => handleNavigation('home')}/>;
    }
    // Investors page content
    if (currentPage === 'investors') {
        return (<div className="min-h-screen bg-white">
        <Navbar_1.default currentPage={currentPage} onNavigate={handleNavigation}/>
        <InvestorsPage_1.default />
        <Footer_1.default />
      </div>);
    }
    // Startup Detail page content
    if (currentPage === 'startup-detail') {
        return (<div className="min-h-screen bg-white">
        <Navbar_1.default currentPage="startups" onNavigate={handleNavigation}/>
        <StartupDetail_1.default onBack={() => handleNavigation('startups')}/>
        <Footer_1.default />
      </div>);
    }
    // Startups page content
    if (currentPage === 'startups') {
        const totalPages = Math.ceil(startups.length / startupsPerPage);
        const startIndex = (marketplacePage - 1) * startupsPerPage;
        const endIndex = startIndex + startupsPerPage;
        const currentStartups = startups.slice(startIndex, endIndex);
        return (<div className="min-h-screen bg-[#F5F7FA]">
        <Navbar_1.default currentPage={currentPage} onNavigate={handleNavigation}/>
        <MarketplaceHero_1.default />
        <FeaturedSection_1.default />
        
        <FilterPanel_1.default onFilterChange={handleFilterChange} viewMode={viewMode} onViewModeChange={setViewMode}/>

        {/* Main Listing Section */}
        <section className="bg-[#F5F7FA] py-12 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-[#6B7A8C]">
                Showing {startIndex + 1}-{Math.min(endIndex, startups.length)} of {startups.length} startups
              </p>
            </div>

            {/* Startup Grid/List */}
            <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-6'} mb-12`}>
              {currentStartups.map((startup) => (<StartupCard_1.default key={startup.id} startup={startup} viewMode={viewMode} onStartupClick={handleStartupClick}/>))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2">
              <button onClick={() => handlePageChange(marketplacePage - 1)} disabled={marketplacePage === 1} className={`p-2 rounded-lg border transition-all duration-200 ${marketplacePage === 1
                ? 'border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed'
                : 'border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'}`}>
                <lucide_react_1.ChevronLeft className="w-5 h-5"/>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-lg transition-all duration-200 ${marketplacePage === page
                    ? 'bg-[#274060] text-white'
                    : 'border border-[#DCE3E8] text-[#0F1720] hover:border-[#274060] hover:text-[#274060]'}`}>
                  {page}
                </button>))}

              <button onClick={() => handlePageChange(marketplacePage + 1)} disabled={marketplacePage === totalPages} className={`p-2 rounded-lg border transition-all duration-200 ${marketplacePage === totalPages
                ? 'border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed'
                : 'border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white'}`}>
                <lucide_react_1.ChevronRight className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </section>

        <TrustSection_1.default />
        <Footer_1.default />
      </div>);
    }
    // Homepage content
    return (<div className="min-h-screen bg-[#F5F7FA]">
      <Navbar_1.default currentPage={currentPage} onNavigate={handleNavigation}/>
      <Hero_1.default />
      <RoleCards_1.default />
      <Statistics_1.default />
      <HowItWorks_1.default />
      <Footer_1.default />
    </div>);
}
