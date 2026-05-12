import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RoleCards from "./components/RoleCards";
import Statistics from "./components/Statistics";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import MarketplaceHero from "./components/MarketplaceHero";
import FilterPanel from "./components/FilterPanel";
import StartupCard from "./components/StartupCard";
import FeaturedSection from "./components/FeaturedSection";
import TrustSection from "./components/TrustSection";
import StartupDetail from "./components/StartupDetail";
import InvestorsPage from "./components/InvestorsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import FounderControlPanel from "./components/FounderControlPanel";
import InvestorDashboard from "./components/InvestorDashboard";
import ChatWidget from "./components/ChatWidget";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { startupService, StartupSummary, CampaignSummary } from "./services/startupService";

export default function App() {
  const { isAuthenticated, user } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [marketplacePage, setMarketplacePage] = useState(1);
  const [selectedStartupId, setSelectedStartupId] = useState<number | null>(null);
  const startupsPerPage = 9;

  const [startups, setStartups] = useState<(StartupSummary & { campaign?: CampaignSummary })[]>([]);
  const [startupTotal, setStartupTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchStartups = async (page: number, extraFilters?: Record<string, string>) => {
    setLoading(true);
    setError(null);
    try {
      const merged = { ...filters, ...extraFilters, page, limit: startupsPerPage };
      const res = await startupService.listStartups(merged);
      setStartups(res.startups ?? []);
      setStartupTotal(res.total ?? 0);
      setMarketplacePage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load startups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === "startups") {
      fetchStartups(marketplacePage);
    }
  }, [currentPage]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setSelectedStartupId(null);
  };

  const handleStartupClick = (id: number) => {
    setSelectedStartupId(id);
    setCurrentPage("startup-detail");
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    fetchStartups(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchStartups(page);
  };

  // Founder Control Panel page content
  if (currentPage === "control-panel") {
    return <FounderControlPanel onNavigate={handleNavigation} />;
  }

  // Investor Dashboard
  if (currentPage === "investor-dashboard") {
    return <InvestorDashboard onNavigate={handleNavigation} />;
  }

  // Register page content
  if (currentPage === "register") {
    return (
      <RegisterPage
        onBackToHome={() => handleNavigation("home")}
        onNavigate={handleNavigation}
      />
    );
  }

  // Login page content
  if (currentPage === "login") {
    return (
      <LoginPage
        onBackToHome={() => handleNavigation("home")}
        onNavigate={handleNavigation}
      />
    );
  }

  // Investors page content
  if (currentPage === "investors") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
        <InvestorsPage />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  // Startup Detail page content
  if (currentPage === "startup-detail") {
    return (
      <div className="min-h-screen bg-white">
        <Navbar currentPage="startups" onNavigate={handleNavigation} />
        <StartupDetail startupId={selectedStartupId} onBack={() => handleNavigation("startups")} />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  // Startups page content
  if (currentPage === "startups") {
    const totalPages = Math.ceil(startupTotal / startupsPerPage);
    const startIndex = (marketplacePage - 1) * startupsPerPage;
    const endIndex = startIndex + startups.length;

    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
        <MarketplaceHero />
        <FeaturedSection onViewDetails={handleStartupClick} />

        <FilterPanel
          onFilterChange={handleFilterChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Main Listing Section */}
        <section className="bg-[#F5F7FA] py-12 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count / Status */}
            <div className="mb-6">
              {loading ? (
                <p className="text-[#6B7A8C]">Loading startups...</p>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                  <button onClick={() => fetchStartups(marketplacePage)} className="ml-2 text-sm font-semibold underline hover:no-underline">Retry</button>
                </div>
              ) : (
                <p className="text-[#6B7A8C]">
                  Showing {startIndex + 1}-{Math.min(endIndex, startupTotal)}{" "}
                  of {startupTotal} startups
                </p>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#274060]" />
                <span className="ml-3 text-[#6B7A8C]">Loading startups...</span>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-red-700 font-medium">Failed to load startups</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button onClick={() => fetchStartups(1)} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Try Again
                </button>
              </div>
            )}

            {/* Startup Grid/List */}
            {!loading && !error && (
              <>
                {startups.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-[#6B7A8C] text-lg">No startups found.</p>
                    <p className="text-[#6B7A8C] text-sm mt-2">Check back later for new listings.</p>
                  </div>
                ) : (
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    } mb-12`}
                  >
                    {startups.map((startup) => (
                      <StartupCard
                        key={startup.id}
                        startup={startup}
                        viewMode={viewMode}
                        onStartupClick={handleStartupClick}
                        campaign={startup.campaign}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(marketplacePage - 1)}
                      disabled={marketplacePage === 1}
                      className={`p-2 rounded-lg border transition-all duration-200 ${
                        marketplacePage === 1
                          ? "border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed"
                          : "border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                            marketplacePage === page
                              ? "bg-[#274060] text-white"
                              : "border border-[#DCE3E8] text-[#0F1720] hover:border-[#274060] hover:text-[#274060]"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => handlePageChange(marketplacePage + 1)}
                      disabled={marketplacePage === totalPages}
                      className={`p-2 rounded-lg border transition-all duration-200 ${
                        marketplacePage === totalPages
                          ? "border-[#DCE3E8] text-[#6B7A8C] cursor-not-allowed"
                          : "border-[#274060] text-[#274060] hover:bg-[#274060] hover:text-white"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <TrustSection />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  // Homepage content
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      <Hero />
      <RoleCards />
      <Statistics />
      <HowItWorks />
      <Footer />
      <ChatWidget />
    </div>
  );
}
