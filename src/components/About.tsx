import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-[#005DA6]">Me</span>
          </h2>
          <div className="w-20 h-1 bg-[#F7CB05] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            With 30 years of trusted experience in LIC and 15+ years in General Insurance, I&apos;ve helped thousands of families secure their financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-white p-4 rounded-lg shadow-xl relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/5588490/pexels-photo-5588490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="25 Years of Experience"
                className="w-full h-auto rounded"
              />
            </div>
            <div className="absolute -top-8 md:-right-10 -right-0 bg-[#F7CB05] p-4 rounded-lg shadow-lg z-20">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-[#005DA6]">30+</h3>
                <p className="text-[#005DA6] font-medium">Years Experience</p>
              </div>
            </div>
            <div className="absolute -bottom-8 md:-left-10 -left-0 bg-[#005DA6] p-6 rounded-lg shadow-lg z-20">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white">2000+</h3>
                <p className="text-white/90 font-medium">Happy Clients</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Amiya Bandopadhyay: Your Trusted LIC & General Insurance Advisor
            </h3>
            <p className="text-gray-600">
              Since 1994, I&apos;ve been helping individuals and families across India and NRI clients navigate the complex world of life insurance. My mission is to provide personalized, honest advice that ensures financial security for you and your loved ones.
            </p>
            <p className="text-gray-600">
              As a 2 times MDRT qualified agent with multiple awards for performance excellence, I bring deep expertise and a client-first approach to every consultation.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#005DA6] mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-800">Expert Policy Selection</h4>
                  <p className="text-gray-600">Personalized recommendations based on your specific needs and future goals.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#005DA6] mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-800">Claim Settlement Assistance</h4>
                  <p className="text-gray-600">Seamless support during the claim process to ensure timely settlements.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-[#005DA6] mt-1 flex-shrink-0" />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-800">Lifelong Relationship</h4>
                  <p className="text-gray-600">Ongoing support and policy reviews to adapt to your changing life circumstances.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-block bg-[#005DA6] text-white font-semibold py-3 px-8 rounded-md shadow hover:bg-[#004a85] transition-all duration-300"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;