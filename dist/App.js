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
const InvestorDashboard_1 = __importDefault(require("./components/InvestorDashboard"));
const ChatWidget_1 = __importDefault(require("./components/ChatWidget"));
const lucide_react_1 = require("lucide-react");
const AuthContext_1 = require("./context/AuthContext");
const startupService_1 = require("./services/startupService");
function App() {
    const { isAuthenticated, user } = (0, AuthContext_1.useAuth)();
    const [currentPage, setCurrentPage] = (0, react_1.useState)("home");
    const [viewMode, setViewMode] = (0, react_1.useState)("grid");
    const [marketplacePage, setMarketplacePage] = (0, react_1.useState)(1);
    const [selectedStartupId, setSelectedStartupId] = (0, react_1.useState)(null);
    const startupsPerPage = 9;
    const [startups, setStartups] = (0, react_1.useState)([]);
    const [startupTotal, setStartupTotal] = (0, react_1.useState)(0);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [filters, setFilters] = (0, react_1.useState)({});
    const fetchStartups = (page, extraFilters) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        setLoading(true);
        setError(null);
        try {
            const merged = Object.assign(Object.assign(Object.assign({}, filters), extraFilters), { page, limit: startupsPerPage });
            const res = yield startupService_1.startupService.listStartups(merged);
            setStartups((_a = res.startups) !== null && _a !== void 0 ? _a : []);
            setStartupTotal((_b = res.total) !== null && _b !== void 0 ? _b : 0);
            setMarketplacePage(page);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load startups");
        }
        finally {
            setLoading(false);
        }
    });
    (0, react_1.useEffect)(() => {
        if (currentPage === "startups") {
            fetchStartups(marketplacePage);
        }
    }, [currentPage]);
    const handleNavigation = (page) => {
        setCurrentPage(page);
        setSelectedStartupId(null);
    };
    const handleStartupClick = (id) => {
        setSelectedStartupId(id);
        setCurrentPage("startup-detail");
    };
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        fetchStartups(1, newFilters);
    };
    const handlePageChange = (page) => {
        fetchStartups(page);
    };
    // Founder Control Panel page content
    if (currentPage === "control-panel") {
        return <FounderControlPanel_1.default onNavigate={handleNavigation}/>;
    }
    // Investor Dashboard
    if (currentPage === "investor-dashboard") {
        return <InvestorDashboard_1.default onNavigate={handleNavigation}/>;
    }
    // Register page content
    if (currentPage === "register") {
        return (<RegisterPage_1.default onBackToHome={() => handleNavigation("home")} onNavigate={handleNavigation}/>);
    }
    // Login page content
    if (currentPage === "login") {
        return (<LoginPage_1.default onBackToHome={() => handleNavigation("home")} onNavigate={handleNavigation}/>);
    }
    // Investors page content
    if (currentPage === "investors") {
        return (<div className="min-h-screen bg-white">
        <Navbar_1.default currentPage={currentPage} onNavigate={handleNavigation}/>
        <InvestorsPage_1.default />
        <Footer_1.default />
        <ChatWidget_1.default />
      </div>);
    }
    // Startup Detail page content
    if (currentPage === "startup-detail") {
        return (<div className="min-h-screen bg-white">
        <Navbar_1.default currentPage="startups" onNavigate={handleNavigation}/>
        <StartupDetail_1.default startupId={selectedStartupId} onBack={() => handleNavigation("startups")}/>
        <Footer_1.default />
        <ChatWidget_1.default />
      </div>);
    }
    // Startups page content
    if (currentPage === "startups") {
        const totalPages = Math.ceil(startupTotal / startupsPerPage);
        const startIndex = (marketplacePage - 1) * startupsPerPage;
        const endIndex = startIndex + startups.length;
        return (<div className="min-h-screen bg-[#F5F7FA]">
        <Navbar_1.default currentPage={currentPage} onNavigate={handleNavigation}/>
        <MarketplaceHero_1.default />
        <FeaturedSection_1.default />

        <FilterPanel_1.default onFilterChange={handleFilterChange} viewMode={viewMode} onViewModeChange={setViewMode}/>

        {/* Main Listing Section */}
        <section className="bg-[#F5F7FA] py-12 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count / Status */}
            <div className="mb-6">
              {loading ? (<p className="text-[#6B7A8C]">Loading startups...</p>) : error ? (<div className="flex items-center gap-2 text-red-600">
                  <lucide_react_1.AlertCircle className="w-4 h-4"/>
                  <span>{error}</span>
                  <button onClick={() => fetchStartups(marketplacePage)} className="ml-2 text-sm font-semibold underline hover:no-underline">Retry</button>
                </div>) : (<p className="text-[#6B7A8C]">
                  Showing {startIndex + 1}-{Math.min(endIndex, startupTotal)}{" "}
                  of {startupTotal} startups
                </p>)}
            </div>

            {/* Loading State */}
            {loading && (<div className="flex items-center justify-center py-20">
                <lucide_react_1.Loader2 className="w-8 h-8 animate-spin text-[#274060]"/>
                <span className="ml-3 text-[#6B7A8C]">Loading startups...</span>
              </div>)}

            {/* Error State */}
            {!loading && error && (<div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <lucide_react_1.AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3"/>
                <p className="text-red-700 font-medium">Failed to load startups</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button onClick={() => fetchStartups(1)} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Try Again
                </button>
              </div>)}

            {/* Startup Grid/List */}
            {!loading && !error && (<>
                {startups.length === 0 ? (<div className="text-center py-20">
                    <p className="text-[#6B7A8C] text-lg">No startups found.</p>
                    <p className="text-[#6B7A8C] text-sm mt-2">Check back later for new listings.</p>
                  </div>) : (<div className={`${viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"} mb-12`}>
                    {startups.map((startup) => (<StartupCard_1.default key={startup.id} startup={startup} viewMode={viewMode} onStartupClick={handleStartupClick} campaign={startup.campaign}/>))}
                  </div>)}

                {/* Pagination */}
                {totalPages > 1 && (<div className="flex justify-center items-center gap-2">
                    <button onClick={() => handlePageChange(marketplacePage - 1)} disabled={marketplacePage === 1} className={`p-2 rounded-lg border transition-all duration-200 ${marketplacePage === 1
                        ? "border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed"
                        : "border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white"}`}>
                      <lucide_react_1.ChevronLeft className="w-5 h-5"/>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (<button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-lg transition-all duration-200 ${marketplacePage === page
                            ? "bg-[#274060] text-white"
                            : "border border-[#DCE3E8] text-[#0F1720] hover:border-[#274060] hover:text-[#274060]"}`}>
                          {page}
                        </button>))}

                    <button onClick={() => handlePageChange(marketplacePage + 1)} disabled={marketplacePage === totalPages} className={`p-2 rounded-lg border transition-all duration-200 ${marketplacePage === totalPages
                        ? "border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed"
                        : "border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white"}`}>
                      <lucide_react_1.ChevronRight className="w-5 h-5"/>
                    </button>
                  </div>)}
              </>)}
          </div>
        </section>

        <TrustSection_1.default />
        <Footer_1.default />
        <ChatWidget_1.default />
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
      <ChatWidget_1.default />
    </div>);
}
