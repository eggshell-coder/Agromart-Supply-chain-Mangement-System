import { useState } from 'react'

const slides = [
  {
    emoji: '🌾',
    title: 'Welcome to AgroMart',
    body: 'Your end-to-end agricultural supply chain platform. From farm to warehouse — track every step.',
  },
  {
    emoji: '📦',
    title: 'Manage Orders & Shipments',
    body: 'Create purchase orders from farmers, track shipments in real-time, and manage your inventory with ease.',
  },
  {
    emoji: '📊',
    title: 'Data-Driven Insights',
    body: 'Monitor spoilage, cold chain integrity, weather impacts, and price audits all in one place.',
  },
]

export default function Onboarding({ onComplete }) {
  const [index, setIndex] = useState(0)
  const isLast = index === slides.length - 1
  const slide = slides[index]

  return (
    <div className="min-h-screen bg-[#f5f2eb] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-black text-green-950 text-sm">
            AM
          </div>
          <span className="font-bold text-xl text-green-950">AgroMart</span>
        </div>

        {/* Slide card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full text-center space-y-4">
          <div className="text-6xl">{slide.emoji}</div>
          <h2 className="text-xl font-bold text-green-950">{slide.title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{slide.body}</p>
        </div>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${i === index ? 'w-6 h-2 bg-green-700' : 'w-2 h-2 bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          {!isLast && (
            <button
              type="button"
              onClick={onComplete}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Skip
            </button>
          )}
          <button
            type="button"
            onClick={() => isLast ? onComplete() : setIndex(i => i + 1)}
            className="flex-1 py-2.5 rounded-xl bg-green-700 text-white font-bold text-sm hover:bg-green-800 transition-colors"
          >
            {isLast ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
