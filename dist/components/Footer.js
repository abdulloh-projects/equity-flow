"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
const lucide_react_1 = require("lucide-react");
function Footer() {
    const footerLinks = {
        company: [
            { name: 'About', href: '#' },
            { name: 'How It Works', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Blog', href: '#' }
        ],
        resources: [
            { name: 'FAQ', href: '#' },
            { name: 'Support', href: '#' },
            { name: 'Contact', href: '#' },
            { name: 'Documentation', href: '#' }
        ],
        legal: [
            { name: 'Terms of Use', href: '#' },
            { name: 'Privacy Policy', href: '#' },
            { name: 'Cookie Policy', href: '#' },
            { name: 'Disclaimer', href: '#' }
        ]
    };
    const socialLinks = [
        { icon: lucide_react_1.Linkedin, href: '#', label: 'LinkedIn' },
        { icon: lucide_react_1.Twitter, href: '#', label: 'Twitter' },
        { icon: lucide_react_1.Send, href: '#', label: 'Telegram' },
        { icon: lucide_react_1.Instagram, href: '#', label: 'Instagram' }
    ];
    return (<footer className="bg-[#172A45] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold">EquityFlow</h2>
            <p className="text-[#DCE3E8] leading-relaxed max-w-md">
              A global startup investment marketplace connecting innovative founders with strategic investors to build the future of business.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-[#DCE3E8]">
              <div className="flex items-center space-x-3">
                <lucide_react_1.Mail className="w-5 h-5 text-[#6C7A89]"/>
                <span>contact@equityflow.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <lucide_react_1.Phone className="w-5 h-5 text-[#6C7A89]"/>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <lucide_react_1.MapPin className="w-5 h-5 text-[#6C7A89]"/>
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (<a key={index} href={social.href} aria-label={social.label} className="w-10 h-10 bg-[#274060] rounded-lg flex items-center justify-center hover:bg-[#3A5A7A] transition-colors duration-200">
                    <IconComponent className="w-5 h-5"/>
                  </a>);
        })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (<li key={index}>
                  <a href={link.href} className="text-[#DCE3E8] hover:text-[#3A5A7A] transition-colors duration-200">
                    {link.name}
                  </a>
                </li>))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (<li key={index}>
                  <a href={link.href} className="text-[#DCE3E8] hover:text-[#3A5A7A] transition-colors duration-200">
                    {link.name}
                  </a>
                </li>))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (<li key={index}>
                  <a href={link.href} className="text-[#DCE3E8] hover:text-[#3A5A7A] transition-colors duration-200">
                    {link.name}
                  </a>
                </li>))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#274060] py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#DCE3E8] text-sm">
              © {new Date().getFullYear()} EquityFlow. All rights reserved.
            </p>
            <p className="text-[#DCE3E8] text-sm">
              Made with passion for innovation and growth
            </p>
          </div>
        </div>
      </div>
    </footer>);
}
