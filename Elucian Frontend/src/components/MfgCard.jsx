import React from "react";
import { Star, Heart } from "lucide-react";
import mfgImage from "../assets/mfg.png";
import tcsLogo from "../assets/TCS.svg";
import arLogo from "../assets/ar.svg";
import hpLogo from "../assets/hp.svg";
import hundaiLogo from "../assets/hundai.svg";
import twoPlusLogo from "../assets/2+.svg";
import jennyLogo from "../assets/jenny.svg";

const MfgCard = ({ data }) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 group-hover:h-68 bg-gray-100 overflow-hidden rounded-t-2xl transition-all duration-500">
        {/* Star Icon */}
        <div className="absolute top-4 right-4 z-10">
          <Star className="w-6 h-6 text-gray-400 hover:text-yellow-400 transition-colors duration-200" />
        </div>

        {/* Main Image */}
        <div className="relative w-full h-full transition-transform duration-500 group-hover:translate-y-4">
          <img
            src={mfgImage}
            alt="Medical Device"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* White Content Panel - Overlaps image with margin top for rounded corners visibility */}
      <div className="bg-white rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl h-44 group-hover:h-24 overflow-hidden -mt-6 relative z-10">
        <div className="p-4">
          {/* Manufacturer Info - Top section */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <img src={jennyLogo} alt="Manufacturer" className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">Name of manufa</h3>
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>QC, Ca</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1">3.5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications - Middle section */}
          <div className="flex space-x-2 mb-4">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">ISO19001</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">ISO19001</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Capability</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">3+</span>
          </div>

          {/* Trusted By Section - Bottom section, gets hidden when panel shrinks */}
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">Trusted by:</div>
            <div className="flex items-center space-x-3">
              <img src={tcsLogo} alt="TCS" className="h-6" />
              <img src={arLogo} alt="AR" className="h-6" />
              <img src={hpLogo} alt="HP" className="h-6" />
              <img src={hundaiLogo} alt="Hyundai" className="h-6" />
              <img src={tcsLogo} alt="TCS" className="h-6" />
              <img src={twoPlusLogo} alt="2+" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfgCard;