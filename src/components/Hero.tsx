import React from 'react';


const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-r from-[#003b6f] to-[#005DA6] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#F7CB05]/20 blur-xl"></div>
        <div className="absolute top-40 left-10 w-40 h-40 rounded-full bg-[#F7CB05]/10 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Insure, and Be Secure
            </h1>
            <p className="text-xl text-gray-100">
              With 30 years of trusted experience in LIC and 15+ years in General Insurance. I help families across India achieve financial security and peace of mind.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block bg-[#F7CB05] text-[#005DA6] font-semibold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#e7bd00]"
              >
                Consult Now
              </a>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="bg-white p-6 rounded-lg shadow-xl relative z-10 transform rotate-2 hover:rotate-0 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Professional LIC Agent"
                className="w-full h-auto rounded"
              />
            </div>
            <div className="absolute inset-0 bg-[#F7CB05] rounded-lg shadow-xl transform -rotate-3 z-0"></div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Recognition & Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
              <div className="text-3xl font-bold text-[#F7CB05] mb-2">30+</div>
              <p className="text-white">Awards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
              <div className="text-3xl font-bold text-[#F7CB05] mb-2">2x MDRT</div>
              <p className="text-white">Qualified Member</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
              <div className="text-3xl font-bold text-[#F7CB05] mb-2">19x</div>
              <p className="text-white">Chairman&apos;s Club</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
              <div className="text-3xl font-bold text-[#F7CB05] mb-2">98%</div>
              <p className="text-white">Client Retention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;