import { TrendingUp, Rocket, Eye, ArrowRight } from 'lucide-react';

export default function RoleCards() {
  const roles = [
    {
      icon: TrendingUp,
      title: 'For Investors',
      description: 'Discover vetted startups, track growth metrics, diversify your portfolio, and invest with confidence in early-stage innovation.',
      bgColor: 'bg-[#274060]',
      hoverBorder: 'hover:border-[#274060]',
      linkColor: 'text-[#274060]'
    },
    {
      icon: Rocket,
      title: 'For Startup Owners',
      description: 'Showcase your startup, attract strategic investors, share traction metrics, and raise funding faster through EquityFlow.',
      bgColor: 'bg-[#3A5A7A]',
      hoverBorder: 'hover:border-[#3A5A7A]',
      linkColor: 'text-[#3A5A7A]'
    },
    {
      icon: Eye,
      title: 'For Visitors',
      description: 'Browse startups, explore market trends, and learn how startup investing works before creating an account.',
      bgColor: 'bg-[#172A45]',
      hoverBorder: 'hover:border-[#172A45]',
      linkColor: 'text-[#172A45]'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F1720] mb-4">Who We Serve</h2>
          <p className="text-xl text-[#6B7A8C] max-w-2xl mx-auto">
            Whether you're looking to invest, raise capital, or simply explore, EquityFlow has something for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 border-2 border-[#DCE3E8] ${role.hoverBorder} transition-all duration-300 hover:shadow-xl group`}
              >
                <div className={`w-16 h-16 ${role.bgColor} rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-[#0F1720] mb-4">{role.title}</h3>
                
                <p className="text-[#6B7A8C] leading-relaxed mb-6">
                  {role.description}
                </p>
                
                <a
                  href="#"
                  className={`inline-flex items-center space-x-2 ${role.linkColor} hover:opacity-80 transition-opacity duration-200 group`}
                >
                  <span className="font-semibold">Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
