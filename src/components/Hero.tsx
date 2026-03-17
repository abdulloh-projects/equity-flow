import { ArrowRight, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-white to-[#F5F7FA] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#0F1720] leading-tight">
                Connecting Capital with Innovation
              </h1>
              <p className="text-xl text-[#6B7A8C] leading-relaxed">
                EquityFlow is a startup marketplace where founders meet investors, ideas grow into businesses, and opportunities flow freely.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-6 py-4 bg-white text-[#274060] border-2 border-[#274060] rounded-xl hover:bg-[#274060] hover:text-white transition-all duration-300 hover:px-8 hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Explore Marketplace</span>
                <ArrowRight className="w-0 h-6 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300" />
              </button>
              <button className="group px-6 py-4 bg-white text-[#274060] border-2 border-[#274060] rounded-xl hover:bg-[#274060] hover:text-white transition-all duration-300 hover:px-8 hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Register as Investor</span>
                <ArrowRight className="w-0 h-6 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300" />
              </button>
              <button className="group px-6 py-4 bg-white text-[#274060] border-2 border-[#274060] rounded-xl hover:bg-[#274060] hover:text-white transition-all duration-300 hover:px-8 hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Register as Founder</span>
                <ArrowRight className="w-0 h-6 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-300" />
              </button>
            </div>
          </div>

          {/* Right Side - Abstract Illustration */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              {/* Abstract shapes representing flow and connection */}
              <div className="absolute top-10 left-10 w-32 h-32 bg-[#6C7A89] rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute top-32 right-20 w-40 h-40 bg-[#274060] rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-20 w-36 h-36 bg-[#172A45] rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Card elements */}
              <div className="absolute top-20 right-10 bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-[#DCE3E8]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#274060] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7A8C]">Growth Rate</p>
                    <p className="text-2xl font-bold text-[#0F1720]">+245%</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-32 left-0 bg-white rounded-2xl shadow-xl p-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300 border border-[#DCE3E8]">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#6C7A89] rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7A8C]">Active Investors</p>
                    <p className="text-2xl font-bold text-[#0F1720]">12,500+</p>
                  </div>
                </div>
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                <line x1="30%" y1="30%" x2="70%" y2="50%" stroke="#6C7A89" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                <line x1="70%" y1="50%" x2="40%" y2="80%" stroke="#274060" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                <line x1="40%" y1="80%" x2="30%" y2="30%" stroke="#172A45" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
