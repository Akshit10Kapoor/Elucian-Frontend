import React from 'react'
import MfgCard from '../components/MfgCard'
import jennyLogo from '../assets/jenny.svg'
import { Plus } from 'lucide-react'

const SearchResultPage = () => {
  // Mock data for 10 cards
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "Name of manufa",
    location: "QC, Ca",
    rating: 3.5,
    certifications: ["ISO19001", "ISO19001", "Capability", "3+"],
    trustedBy: ["TCS", "AR", "HP", "Hyundai", "TCS", "2+"]
  }))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Cards Grid - 4 columns layout like in the image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-32">
          {mockData.map((data) => (
            <MfgCard key={data.id} data={data} />
          ))}
        </div>
      </div>

      {/* Fixed Filter Panel at Bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-3 flex items-center space-x-3">
          {/* Ask Jenny Button */}
          <button className="text-white px-4 py-1.5 rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200" style={{background: 'linear-gradient(to right, #E5B7E3, #9765E4)'}}>
                  <div className="w-8 h-8 bg-white rounded-full mr-2 border-2 overflow-hidden" style={{ borderColor: '#E16CDF' }}>
                    <img
                      src={jennyLogo}
                      alt="Jenny"
                      className="w-full h-full object-cover"
                    />
                  </div>
            <span className="font-medium">Ask Jenny</span>
          </button>

          {/* Add Filters Button */}
          <button className="bg-white text-[#454545] px-4 py-2.5 rounded-xl border border-[#D9D9D9] flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
             <Plus size={20} className='bg-gray-100 rounded'  />
            <span className="font-medium text-sm">Add Filters</span>
            <span className=" text-gray-600 px-1 p-0.5 rounded-lg border border-gray-200 text-xs">20</span>
          </button>

          <button className="bg-white text-[#454545] px-4 py-2.5 rounded-xl border border-[#D9D9D9] flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
            <span className="font-medium text-sm">Shortlist</span>
            <span className=" text-gray-600 px-1 p-0.5 rounded-lg border border-gray-200 text-xs">20</span>
          </button>

          <button className="bg-white text-[#454545] px-4 py-2.5 rounded-xl border border-[#D9D9D9] flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
            <span className="font-medium text-sm">Compare</span>
            <span className=" text-gray-600 px-1 p-0.5 rounded-lg border border-gray-200 text-xs">20</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchResultPage
