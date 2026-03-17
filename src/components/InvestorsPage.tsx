import { Shield, TrendingUp, PieChart, Lock, CheckCircle, Users, FileText, Search, BarChart, ArrowRight, Award, Building2, UserCheck } from 'lucide-react';

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-[#0F1720] leading-tight">
                  Invest in the Next Generation of Innovation
                </h1>
                <p className="text-xl text-[#6B7A8C] leading-relaxed">
                  Discover verified startups, analyze transparent metrics, and build a diversified portfolio through EquityFlow.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#274060] text-white rounded-lg font-semibold hover:bg-[#3A5A7A] transition-colors duration-200 shadow-lg">
                  Create Investor Account
                </button>
                <button className="px-8 py-4 border-2 border-[#274060] text-[#274060] rounded-lg font-semibold hover:bg-[#274060] hover:text-white transition-all duration-200">
                  Explore Startups
                </button>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-2xl p-12 shadow-2xl">
                <div className="space-y-6">
                  {/* Abstract fintech illustration */}
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[#274060]" />
                      </div>
                      <div>
                        <div className="h-3 w-32 bg-white rounded"></div>
                        <div className="h-2 w-24 bg-white bg-opacity-60 rounded mt-2"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <PieChart className="w-6 h-6 text-[#274060]" />
                      </div>
                      <div>
                        <div className="h-3 w-40 bg-white rounded"></div>
                        <div className="h-2 w-28 bg-white bg-opacity-60 rounded mt-2"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-[#274060]" />
                      </div>
                      <div>
                        <div className="h-3 w-36 bg-white rounded"></div>
                        <div className="h-2 w-32 bg-white bg-opacity-60 rounded mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest with EquityFlow Section */}
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F1720] mb-4">
              Why Investors Choose EquityFlow
            </h2>
            <p className="text-lg text-[#6B7A8C]">
              Access the tools and insights you need to make informed investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-[#DCE3E8] rounded-xl p-8 hover:shadow-xl hover:border-[#274060] transition-all duration-300">
              <div className="w-14 h-14 bg-[#274060] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-[#274060]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                Verified Startups
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Every startup undergoes rigorous due diligence and screening before listing on our platform.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#DCE3E8] rounded-xl p-8 hover:shadow-xl hover:border-[#274060] transition-all duration-300">
              <div className="w-14 h-14 bg-[#3A5A7A] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-7 h-7 text-[#3A5A7A]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                Transparent Metrics
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Access real-time funding data, revenue metrics, and growth insights for informed decisions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#DCE3E8] rounded-xl p-8 hover:shadow-xl hover:border-[#274060] transition-all duration-300">
              <div className="w-14 h-14 bg-[#172A45] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <PieChart className="w-7 h-7 text-[#172A45]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                Portfolio Tracking
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Track all your investments in one unified dashboard with real-time performance updates.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#DCE3E8] rounded-xl p-8 hover:shadow-xl hover:border-[#274060] transition-all duration-300">
              <div className="w-14 h-14 bg-[#274060] bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-[#274060]" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                Secure Transactions
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Bank-level encryption and compliant processes ensure your investments are safe and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F1720] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#6B7A8C]">
              Start investing in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-[#DCE3E8]" style={{ width: 'calc(100% - 200px)', left: '100px' }}></div>
            
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center relative z-10 border border-[#DCE3E8]">
                <div className="w-16 h-16 bg-[#274060] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                  1
                </div>
                <div className="w-14 h-14 bg-[#3A5A7A] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-7 h-7 text-[#3A5A7A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                  Discover
                </h3>
                <p className="text-[#6B7A8C] leading-relaxed">
                  Browse and filter through verified startups across various industries and funding stages.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center relative z-10 border border-[#DCE3E8]">
                <div className="w-16 h-16 bg-[#274060] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                  2
                </div>
                <div className="w-14 h-14 bg-[#3A5A7A] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-7 h-7 text-[#3A5A7A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                  Analyze
                </h3>
                <p className="text-[#6B7A8C] leading-relaxed">
                  Review detailed financials, team backgrounds, and growth metrics to make informed decisions.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg text-center relative z-10 border border-[#DCE3E8]">
                <div className="w-16 h-16 bg-[#274060] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                  3
                </div>
                <div className="w-14 h-14 bg-[#3A5A7A] bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-7 h-7 text-[#3A5A7A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                  Invest
                </h3>
                <p className="text-[#6B7A8C] leading-relaxed">
                  Securely invest with just a few clicks and track your portfolio performance in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F1720] mb-4">
              Who Can Invest?
            </h2>
            <p className="text-lg text-[#6B7A8C]">
              EquityFlow welcomes diverse types of investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Angel Investors */}
            <div className="bg-[#F5F7FA] rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-[#DCE3E8]">
              <div className="w-16 h-16 bg-[#274060] rounded-xl flex items-center justify-center mb-6 text-white">
                <UserCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F1720] mb-4">
                Angel Investors
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Individual investors looking to support early-stage startups with capital and mentorship. Perfect for high-net-worth individuals seeking diversified investment opportunities.
              </p>
              <div className="mt-6 pt-6 border-t border-[#DCE3E8]">
                <p className="text-sm text-[#6B7A8C]">
                  Minimum investment: $1,000
                </p>
              </div>
            </div>

            {/* Venture Capital */}
            <div className="bg-[#F5F7FA] rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-[#DCE3E8]">
              <div className="w-16 h-16 bg-[#172A45] rounded-xl flex items-center justify-center mb-6 text-white">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F1720] mb-4">
                Venture Capital Firms
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Professional investment firms managing pooled funds for strategic investments in high-growth startups. Access deal flow and co-investment opportunities.
              </p>
              <div className="mt-6 pt-6 border-t border-[#DCE3E8]">
                <p className="text-sm text-[#6B7A8C]">
                  Minimum investment: $25,000
                </p>
              </div>
            </div>

            {/* Private Investors */}
            <div className="bg-[#F5F7FA] rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-[#DCE3E8]">
              <div className="w-16 h-16 bg-[#3A5A7A] rounded-xl flex items-center justify-center mb-6 text-white">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold text-[#0F1720] mb-4">
                Private Investors
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Accredited investors and family offices seeking alternative investment opportunities in innovative companies with strong growth potential.
              </p>
              <div className="mt-6 pt-6 border-t border-[#DCE3E8]">
                <p className="text-sm text-[#6B7A8C]">
                  Minimum investment: $5,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Dashboard Preview Section */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F1720] mb-4">
              Your Portfolio Dashboard
            </h2>
            <p className="text-lg text-[#6B7A8C]">
              Track and manage all your investments in one place
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-[#DCE3E8]">
            {/* Dashboard Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#274060] to-[#3A5A7A] rounded-xl p-6 text-white">
                <div className="text-sm opacity-80 mb-2">Total Invested</div>
                <div className="text-3xl font-bold mb-1">$150,000</div>
                <div className="text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.5% this month</span>
                </div>
              </div>

              <div className="bg-[#172A45] rounded-xl p-6 text-white">
                <div className="text-sm opacity-80 mb-2">Active Investments</div>
                <div className="text-3xl font-bold mb-1">8</div>
                <div className="text-sm">Across 5 industries</div>
              </div>

              <div className="bg-[#3A5A7A] rounded-xl p-6 text-white">
                <div className="text-sm opacity-80 mb-2">Portfolio Growth</div>
                <div className="text-3xl font-bold mb-1">+18.3%</div>
                <div className="text-sm">YTD performance</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t border-[#DCE3E8] pt-8">
              <h3 className="text-xl font-semibold text-[#0F1720] mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#274060] rounded-lg flex items-center justify-center text-white font-semibold">
                      FF
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F1720]">FinFlow</div>
                      <div className="text-sm text-[#6B7A8C]">Investment successful</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-[#274060]">$10,000</div>
                    <div className="text-sm text-[#6B7A8C]">2 days ago</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#172A45] rounded-lg flex items-center justify-center text-white font-semibold">
                      EC
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F1720]">EcoCharge</div>
                      <div className="text-sm text-[#6B7A8C]">Quarterly update received</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#274060] font-medium">+8.2% return</div>
                    <div className="text-sm text-[#6B7A8C]">5 days ago</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#3A5A7A] rounded-lg flex items-center justify-center text-white font-semibold">
                      HT
                    </div>
                    <div>
                      <div className="font-semibold text-[#0F1720]">HealthTech</div>
                      <div className="text-sm text-[#6B7A8C]">New funding round opened</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[#172A45] font-medium">Opportunity</div>
                    <div className="text-sm text-[#6B7A8C]">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="mt-8 pt-8 border-t border-[#DCE3E8]">
              <h3 className="text-xl font-semibold text-[#0F1720] mb-6">Portfolio Performance</h3>
              <div className="bg-[#F5F7FA] rounded-xl p-8 flex items-center justify-center h-64">
                <div className="text-center text-[#6B7A8C]">
                  <BarChart className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Performance chart visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0F1720] mb-4">
              Security & Compliance
            </h2>
            <p className="text-lg text-[#6B7A8C]">
              Your security is our top priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* KYC Verification */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#274060] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <UserCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                KYC Verification
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                All investors undergo thorough Know Your Customer verification to ensure platform integrity and compliance.
              </p>
            </div>

            {/* Data Encryption */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#172A45] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                Data Encryption
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Bank-level 256-bit encryption protects all your personal information and financial transactions.
              </p>
            </div>

            {/* Legal Compliance */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#3A5A7A] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-[#0F1720] mb-3">
                Legal Compliance
              </h3>
              <p className="text-[#6B7A8C] leading-relaxed">
                Fully compliant with SEC regulations and international securities laws for cross-border investments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#3A5A7A] to-[#274060] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Investing Today
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
            Join thousands of investors building diversified portfolios with EquityFlow. Get started in minutes.
          </p>
          <button className="px-10 py-4 bg-white text-[#274060] rounded-lg font-semibold hover:shadow-2xl transition-all duration-200 inline-flex items-center gap-2 text-lg">
            Register as Investor
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
