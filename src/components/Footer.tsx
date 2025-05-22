'use client'
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <a href="#" className="flex items-center">
                <span className="text-xl font-semibold text-white">
                  Amiya Bandopadhyay
                </span>
              </a>
            </div>
            <p className="text-gray-400 mb-6">
              With 30 years of trusted experience in LIC and 15+ years in General Insurance. I help families across India and NRI clients achieve financial security and peace of mind.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#F7CB05] transition-all">Home</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#F7CB05] transition-all">About Me</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Services</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-[#F7CB05] transition-all">Gallery</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-[#F7CB05] transition-all">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#F7CB05] transition-all">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Life Insurance</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Retirement Plans</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Child Plans</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Health Insurance</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Property Insurance</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F7CB05] transition-all">Group Insurance</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#F7CB05] mt-1 flex-shrink-0" />
                <span className="ml-3 text-gray-400">8/2, Council House St, Lal Dighi, B.B.D. Bagh, Kolkata, West Bengal 700001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#F7CB05] flex-shrink-0" />
                <span className="ml-3 text-gray-400"><a href="tel:+919831029868" target="_blank" rel="noopener noreferrer">+91 9831029868</a></span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#F7CB05] flex-shrink-0" />
                <span className="ml-3 text-gray-400"><a href="mailto:amiyalic@rediffmail.com" target="_blank" rel="noopener noreferrer">amiyalic@rediffmail.com</a></span>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block bg-[#F7CB05] text-[#005DA6] font-semibold py-2 px-6 rounded-md shadow hover:bg-[#e7bd00] transition-all duration-300"
              >
                Get a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Amiya Bandopadhyay LIC Agent. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              Developed by <a href="https://asheshbandooadhyay.com" target="_blank" rel="noopener noreferrer" className="text-[#F7CB05] hover:underline">Ashesh Bandoo Adhyay</a>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#005DA6] text-white p-3 rounded-full shadow-lg hover:bg-[#004a85] transition-all z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;