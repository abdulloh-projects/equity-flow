import { useEffect, useState } from 'react';
import { Building2, Users, DollarSign, Globe } from 'lucide-react';

export default function Statistics() {
  const stats = [
    {
      icon: Building2,
      end: 850,
      label: 'Registered Startups',
      suffix: '+'
    },
    {
      icon: Users,
      end: 12500,
      label: 'Active Investors',
      suffix: '+'
    },
    {
      icon: DollarSign,
      end: 250,
      label: 'Total Funding',
      prefix: '$',
      suffix: 'M+'
    },
    {
      icon: Globe,
      end: 45,
      label: 'Countries Represented',
      suffix: ''
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#F5F7FA] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0F1720] mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-[#6B7A8C] max-w-2xl mx-auto">
            Join a thriving ecosystem of founders and investors creating the future together.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            // eslint-disable-next-line
            return (
              <StatCard key={index} {...stat} IconComponent={IconComponent} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatCard({ IconComponent, end, label, prefix = '', suffix = '' }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#DCE3E8] hover:border-[#274060] group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-[#274060] to-[#3A5A7A] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <p className="text-4xl font-bold text-[#0F1720]">
            {prefix}{formatNumber(count)}{suffix}
          </p>
          <p className="text-[#6B7A8C]">{label}</p>
        </div>
      </div>
    </div>
  );
}
