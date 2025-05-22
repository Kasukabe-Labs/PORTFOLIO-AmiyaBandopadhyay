import React from 'react';
import { Heart, Umbrella, GraduationCap, Home, PiggyBank, Users } from 'lucide-react';

const ServiceCard = ({ icon, title, description }: { icon: React.ReactElement<{ className?: string }>, title: string, description: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-b-4 border-[#005DA6] group">
      <div className="w-16 h-16 bg-[#005DA6]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#005DA6] transition-all duration-300">
        {React.cloneElement(icon, { className: "h-8 w-8 text-[#005DA6] group-hover:text-white transition-all duration-300" })}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <Heart />,
      title: "Life Insurance",
      description: "Comprehensive life insurance policies to protect your family's financial future in your absence."
    },
    {
      icon: <PiggyBank />,
      title: "Retirement Plans",
      description: "Secure your golden years with pension plans that provide regular income after retirement."
    },
    {
      icon: <GraduationCap />,
      title: "Child Plans",
      description: "Investment plans specifically designed to secure your child's education and future needs."
    },
    {
      icon: <Umbrella />,
      title: "Health Insurance",
      description: "Protection against medical expenses with comprehensive health insurance coverage."
    },
    {
      icon: <Home />,
      title: "Property & Factory Insurance",
      description: "Safeguard your valuable assets and property with comprehensive coverage plans."
    },
    {
      icon: <Users />,
      title: "Group Insurance",
      description: "Special plans for businesses to provide insurance benefits to employees."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            My <span className="text-[#005DA6]">Services</span>
          </h2>
          <div className="w-20 h-1 bg-[#F7CB05] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            I offer a wide range of insurance and investment solutions to meet your unique financial needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#003b6f] to-[#005DA6] rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Not Sure Which Plan is Right For You?
              </h3>
              <p className="text-gray-100 mb-6">
                Schedule a free consultation to discuss your financial goals and get personalized recommendations.
              </p>
              <a
                href="#contact"
                className="inline-block bg-[#F7CB05] text-[#005DA6] font-semibold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#e7bd00]"
              >
                Get Free Consultation
              </a>
            </div>
            <div className="hidden md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/7654586/pexels-photo-7654586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Insurance Consultation"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;