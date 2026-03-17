import { Shield, Lock, FileCheck, Scale } from 'lucide-react';

export default function TrustSection() {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'Verified Startups',
      description: 'All startups undergo rigorous verification and due diligence'
    },
    {
      icon: Lock,
      title: 'Secure Transactions',
      description: 'Bank-level encryption and secure payment processing'
    },
    {
      icon: FileCheck,
      title: 'Transparent Metrics',
      description: 'Access to verified financial data and performance metrics'
    },
    {
      icon: Scale,
      title: 'Legal Compliance',
      description: 'Full regulatory compliance and investor protection'
    }
  ];

  return (
    <section className="bg-white py-16 border-t border-[#DCE3E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-[#0F1720] mb-3">Invest with Confidence</h2>
          <p className="text-[#6B7A8C] max-w-2xl mx-auto">
            Your security and trust are our top priorities. Every investment is protected by industry-leading standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-[#F5F7FA] transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#274060] to-[#3A5A7A] rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-[#0F1720] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6B7A8C]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
