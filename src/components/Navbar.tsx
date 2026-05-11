import { useState } from "react";
import { ChevronDown, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: string;
}

export default function Navbar({
  currentPage = "home",
  onNavigate,
  isAuthenticated: isAuthProp,
  userRole: userRoleProp,
}: NavbarProps) {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Prefer context values, fall back to props
  const isAuthenticated = auth.isAuthenticated ?? isAuthProp ?? false;
  const userRole = auth.user?.role ?? userRoleProp ?? "";

  const navLinks = [
    { name: "Home", id: "home", href: "#" },
    { name: "Startups", id: "startups", href: "#startups" },
    { name: "Investors", id: "investors", href: "#investors" },
    { name: "How It Works", id: "how-it-works", href: "#how-it-works" },
    { name: "About", id: "about", href: "#about" },
  ];

  const handleNavClick = (linkId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(linkId);
    }
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (userRole === "FOUNDER") {
      onNavigate?.("control-panel");
    } else {
      onNavigate?.("investor-dashboard");
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    auth.logout();
    onNavigate?.("home");
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#DCE3E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={(e) => handleNavClick("home", e)}
              className="text-2xl font-semibold text-[#0F1720] hover:text-[#274060] transition-colors duration-200"
            >
              EquityFlow
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`transition-colors duration-200 ${
                  currentPage === link.id
                    ? "text-[#274060] font-semibold"
                    : "text-[#0F1720] hover:text-[#274060]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              /* Authenticated state */
              <>
                {/* Dashboard Button */}
                <button
                  onClick={handleDashboardClick}
                  className="flex items-center bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium px-3 py-1.5"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6C7A89] text-white text-sm font-semibold mr-3">
                    {userRole === "FOUNDER" ? "FO" : "IN"}
                  </div>
                  <span>
                    {userRole === "FOUNDER" ? "Control Panel" : "Dashboard"}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 border border-[#DCE3E8] rounded-lg text-[#0F1720] hover:border-red-400 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              /* Guest state */
              <>
                <button
                  onClick={() => onNavigate?.("login")}
                  className="text-[#0F1720] hover:text-[#274060] transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate?.("register")}
                  className="px-4 py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium"
                >
                  Get Started
                </button>
              </>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="flex items-center space-x-1 px-3 py-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200"
              >
                <span className="text-[#0F1720]">{language}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#0F1720] transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden z-10">
                  {["EN", "RU", "UZ"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left transition-all duration-300 ${
                        language === lang
                          ? "bg-[#274060] text-white"
                          : "text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#0F1720]"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#DCE3E8]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`block transition-colors duration-200 ${
                  currentPage === link.id
                    ? "text-[#274060] font-semibold"
                    : "text-[#0F1720] hover:text-[#274060]"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#DCE3E8] space-y-3">
              {isAuthenticated ? (
                <>
                  {/* Dashboard Button - Mobile */}
                  <button
                    onClick={handleDashboardClick}
                    className="w-full flex items-center justify-center space-x-3 px-6 py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6C7A89] text-white text-sm font-semibold">
                      {userRole === "FOUNDER" ? "FO" : "IN"}
                    </div>
                    <span>
                      {userRole === "FOUNDER" ? "Control Panel" : "Dashboard"}
                    </span>
                  </button>
                  {/* Logout - Mobile */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate?.("login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2 border border-[#274060] text-[#274060] rounded-lg hover:bg-[#274060] hover:text-white transition-colors duration-200 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.("register");
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium"
                  >
                    Get Started
                  </button>
                </>
              )}

              {/* Language Selector - Mobile */}
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="w-full flex items-center justify-center space-x-1 px-3 py-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200"
              >
                <span className="text-[#0F1720]">{language}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#0F1720] transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu for Mobile */}
              {isLanguageDropdownOpen && (
                <div className="mt-2 bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
                  {["EN", "RU", "UZ"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-center transition-colors duration-200 ${
                        language === lang
                          ? "bg-[#274060] text-white"
                          : "text-[#0F1720] hover:bg-[#F5F7FA]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
