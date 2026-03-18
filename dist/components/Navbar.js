"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function Navbar({ currentPage = 'home', onNavigate }) {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const [language, setLanguage] = (0, react_1.useState)('EN');
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = (0, react_1.useState)(false);
    const navLinks = [
        { name: 'Home', id: 'home', href: '#' },
        { name: 'Startups', id: 'startups', href: '#startups' },
        { name: 'Investors', id: 'investors', href: '#investors' },
        { name: 'How It Works', id: 'how-it-works', href: '#how-it-works' },
        { name: 'About', id: 'about', href: '#about' }
    ];
    const handleNavClick = (linkId, e) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate(linkId);
        }
        setIsMenuOpen(false);
    };
    return (<nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#DCE3E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={(e) => handleNavClick('home', e)} className="text-2xl font-semibold text-[#0F1720] hover:text-[#274060] transition-colors duration-200">
              EquityFlow
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (<a key={link.id} href={link.href} onClick={(e) => handleNavClick(link.id, e)} className={`transition-colors duration-200 ${currentPage === link.id
                ? 'text-[#274060] font-semibold'
                : 'text-[#0F1720] hover:text-[#274060]'}`}>
                {link.name}
              </a>))}
          </div>

          {/* Right Side Actions - Logged In Founder */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Control Panel Button with Avatar */}
            <button onClick={() => onNavigate && onNavigate('control-panel')} className="flex items-center bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium ml-[0px] mr-[16px] my-[0px] px-[12px] py-[6px]">
              {/* Founder Avatar */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6C7A89] text-white text-sm font-semibold mr-[12px]">
                FU
              </div>
              <span>Control Panel</span>
            </button>
            
            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="flex items-center space-x-1 px-3 py-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                <span className="text-[#0F1720]">{language}</span>
                <lucide_react_1.ChevronDown className={`w-4 h-4 text-[#0F1720] transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}/>
              </button>
              
              {/* Dropdown Menu */}
              {isLanguageDropdownOpen && (<div className="absolute right-0 mt-2 w-24 bg-white border border-[#DCE3E8] rounded-lg shadow-lg overflow-hidden">
                  {['EN', 'RU', 'UZ'].map((lang) => (<button key={lang} onClick={() => {
                    setLanguage(lang);
                    setIsLanguageDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left transition-all duration-300 ${language === lang
                    ? 'bg-[#274060] text-white'
                    : 'text-[#0F1720] hover:bg-[#F5F7FA] hover:text-[#274060]'}`}>
                      {lang}
                    </button>))}
                </div>)}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-[#0F1720]">
            {isMenuOpen ? <lucide_react_1.X className="w-6 h-6"/> : <lucide_react_1.Menu className="w-6 h-6"/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (<div className="lg:hidden bg-white border-t border-[#DCE3E8]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (<a key={link.id} href={link.href} onClick={(e) => handleNavClick(link.id, e)} className={`block transition-colors duration-200 ${currentPage === link.id
                    ? 'text-[#274060] font-semibold'
                    : 'text-[#0F1720] hover:text-[#274060]'}`}>
                {link.name}
              </a>))}
            <div className="pt-4 border-t border-[#DCE3E8] space-y-3">
              {/* Control Panel Button with Avatar - Mobile */}
              <button onClick={() => {
                onNavigate && onNavigate('control-panel');
                setIsMenuOpen(false);
            }} className="w-full flex items-center justify-center space-x-3 px-6 py-2 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-colors duration-200 font-medium">
                {/* Founder Avatar */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#6C7A89] text-white text-sm font-semibold">
                  FU
                </div>
                <span>Control Panel</span>
              </button>
              <button onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)} className="w-full flex items-center justify-center space-x-1 px-3 py-2 border border-[#DCE3E8] rounded-lg hover:border-[#274060] transition-colors duration-200">
                <span className="text-[#0F1720]">{language}</span>
                <lucide_react_1.ChevronDown className={`w-4 h-4 text-[#0F1720] transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}/>
              </button>
              
              {/* Dropdown Menu for Mobile */}
              {isLanguageDropdownOpen && (<div className="mt-2 bg-white border border-[#DCE3E8] rounded-lg overflow-hidden">
                  {['EN', 'RU', 'UZ'].map((lang) => (<button key={lang} onClick={() => {
                        setLanguage(lang);
                        setIsLanguageDropdownOpen(false);
                    }} className={`w-full px-4 py-2 text-center transition-colors duration-200 ${language === lang
                        ? 'bg-[#274060] text-white'
                        : 'text-[#0F1720] hover:bg-[#F5F7FA]'}`}>
                      {lang}
                    </button>))}
                </div>)}
            </div>
          </div>
        </div>)}
    </nav>);
}
