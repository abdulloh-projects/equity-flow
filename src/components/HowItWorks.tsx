import { Search, Users, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Discover',
      description: 'Explore a curated marketplace of innovative startups across various industries. Filter by sector, stage, and funding goals to find the perfect match.'
    },
    {
      icon: Users,
      number: '02',
      title: 'Connect',
      description: 'Engage directly with founders and investors. Schedule meetings, review detailed pitch decks, and build meaningful relationships through our platform.'
    },
    {
      icon: TrendingUp,
      number: '03',
      title: 'Invest',
      description: 'Make informed investment decisions with comprehensive analytics and due diligence tools. Complete transactions securely and track your portfolio growth.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F1720] mb-4">How EquityFlow Works</h2>
          <p className="text-xl text-[#6B7A8C] max-w-2xl mx-auto">
            A seamless journey from discovery to investment in just three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#274060] via-[#3A5A7A] to-[#274060] opacity-20" style={{ width: 'calc(100% - 12rem)', left: '6rem' }}></div>

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#274060] text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-24 h-24 bg-gradient-to-br from-[#3A5A7A] to-[#274060] rounded-2xl flex items-center justify-center shadow-lg mt-8">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-[#0F1720]">{step.title}</h3>
                    <p className="text-[#6B7A8C] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-[#274060] text-white rounded-xl hover:bg-[#3A5A7A] transition-all duration-200 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
