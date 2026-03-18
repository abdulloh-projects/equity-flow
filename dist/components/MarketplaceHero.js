"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MarketplaceHero;
function MarketplaceHero() {
    return (<section className="relative bg-gradient-to-br from-white to-[#F5F7FA] overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#6C7A89] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#274060] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-semibold text-[#0F1720] mb-6">
          Discover High-Potential Startups
        </h1>
        <p className="text-xl text-[#6B7A8C] max-w-3xl mx-auto mb-8 leading-relaxed">
          Browse verified startups across industries and funding stages. Filter, analyze metrics, and invest with confidence.
        </p>
        <button className="px-8 py-4 bg-[#274060] text-white rounded-lg hover:bg-[#3A5A7A] transition-all duration-300 shadow-lg hover:shadow-xl">
          Start Investing
        </button>
      </div>
    </section>);
}
