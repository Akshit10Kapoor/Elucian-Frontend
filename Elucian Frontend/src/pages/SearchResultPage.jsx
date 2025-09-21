import React, { useState } from 'react'
import user from "../assets/User.svg"
import MfgCard from '../components/MfgCard'


import jennyLogo from '../assets/jenny.svg'
import { Plus, Send, ChevronDown, ArrowRight } from 'lucide-react'

const SearchResultPage = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false)
  const [messageInput, setMessageInput] = useState('')

  // Mock data for 10 cards
  const mockData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "Name of manufa",
    location: "QC, Ca",
    rating: 3.5,
    certifications: ["ISO19001", "ISO19001", "Capability", "3+"],
    trustedBy: ["TCS", "AR", "HP", "Hyundai", "TCS", "2+"]
  }))

  // Hardcoded chat messages from the image
  const chatMessages = [
    {
      id: 1,
      sender: 'user',
      message: 'Looking for a CNC machining manufacturer in Germany or Eastern Europe for medical components. Must be ISO 9001 & AS9100 certified, experienced with titanium and aluminum alloys, and capable of medium to large batch production. Prefer in-house surface finishing and strong quality control',
      time: '5:30pm',
      avatar: '/path/to/user-avatar.jpg'
    },
    {
      id: 2,
      sender: 'jenny',
      message: "Got it! I'm searching for CNC machining manufacturers in Germany and Eastern Europe that specialize in aerospace components. Prioritizing ISO 9001 & AS9100 certified suppliers with experience in titanium and aluminum alloys.",
      time: '5:31pm'
    },
    {
      id: 3,
      sender: 'jenny',
      message: 'Give me a moment while I find the best matches for you...',
      time: '5:31pm'
    },
    {
      id: 4,
      sender: 'jenny',
      message: 'Here are the top manufacturers that match your requirements:',
      time: '5:31pm'
    },
    {
      id: 5,
      sender: 'user',
      message: 'Looking for a CNC machining manufacturer in Germany or Eastern Europe for medical components. Must be ISO 9001',
      time: '',
      avatar: '/path/to/user-avatar.jpg'
    }
  ]

  const handleAskJennyClick = () => {
    setIsChatExpanded(!isChatExpanded)
  }


  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending logic here
      setMessageInput('')
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>


      <div className="container mx-auto px-4">
        {/* Cards Grid - 4 columns layout like in the image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-32">
          {mockData.map((data) => (
            <MfgCard key={data.id} data={data} />
          ))}
        </div>
      </div>

      {/* Fixed Filter Panel at Bottom - Transforms into Chat */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
           style={{
             width: '600px',
             height: isChatExpanded ? '80vh' : 'auto',
             transition: 'height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
           }}>
        <div className="rounded-2xl shadow-2xl h-full flex flex-col w-full" style={{
          background: 'linear-gradient(to bottom,  #FFFFFF, #F9F7FF, #E8DFFF)'
        }}>

          {/* Chat Interface Container - Only visible when expanded */}
          {isChatExpanded && (
            <div className="flex-1 flex flex-col mx-4 my-4 bg-white rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-1 bg-gray-100 rounded-xl 
              flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-full border-2 overflow-hidden" style={{ borderColor: '#E16CDF' }}>
                    <img
                      src={jennyLogo}
                      alt="Jenny"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-base text-[#7636D9]">Jenny</span>
                </div>
                <button
                  onClick={handleAskJennyClick}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown size={23} className="text-gray-600" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4"
                   style={{
                     scrollbarWidth: 'none',
                     msOverflowStyle: 'none',
                     WebkitScrollbar: 'none'
                   }}>
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      {msg.sender === 'jenny' ? (
                        <img
                          src={jennyLogo}
                          alt="Jenny"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={user}
                          alt="User"
                          className="w-full h-full object-cover bg-gray-300"
                        />
                      )}
                    </div>
                    {/* Message Bubble */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      msg.sender === 'user'
                        ? 'bg-[#F9FAFB] text-[#546881]'
                        : 'bg-[#F1EBFB87] text-[#546881]'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      {msg.time && (
                        <div className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-[#828C99]' : 'text-[#828C99]'
                        }`}>
                          {msg.time}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              </div>

              {/* Chat Input */}
              <div className="p-2 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button className="p-2 rounded-lg transition-colors bg-white border-2" style={{ borderColor: '#7636D9' }}
                  >

                    <ArrowRight size={20} style={{ color: '#7636D9' }} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filter Panel Bottom Buttons - Always visible */}
          <div className="p-3 flex items-center space-x-3 flex-shrink-0">
            {/* Ask Jenny Button */}
            <button
              onClick={handleAskJennyClick}
              className="text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              style={{background: 'linear-gradient(to right, #E5B7E3, #9765E4)'}}
            >
              <div className="w-6 h-6 bg-white rounded-full border-2 overflow-hidden" style={{ borderColor: '#E16CDF' }}>
                <img
                  src={jennyLogo}
                  alt="Jenny"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-sm">Ask Jenny</span>
            </button>

              {/* Add Filters Button */}
              <button className="bg-white text-[#454545] px-4 py-2 rounded-xl border border-[#D9D9D9] flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
                <Plus size={16} className='bg-gray-100 rounded p-0.5'  />
                <span className="font-medium text-sm">Add Filters</span>
                <span className="text-gray-600 px-1.5 py-0.5 rounded-lg border border-gray-200 text-xs">20</span>
              </button>

              <button className="bg-white text-[#454545] px-4 py-2 rounded-xl border border-[#D9D9D9] flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
                <span className="font-medium text-sm">Shortlist</span>
                <span className="text-gray-600 px-1.5 py-0.5 rounded-lg border border-gray-200 text-xs">20</span>
              </button>

              <button className="bg-white text-[#454545] px-4 py-2 rounded-xl border border-[#D9D9D9] flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
                <span className="font-medium text-sm">Compare</span>
                <span className="text-gray-600 px-1.5 py-0.5 rounded-lg border border-gray-200 text-xs">20</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultPage
