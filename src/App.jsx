import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import FeaturesBar from './components/Features'
import Recommendations from './components/Recommended'
import VideoSection from './components/VideoSection'

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4">
        <FeaturesBar />
        <Recommendations />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mt-8 mb-2 text-center">
            Everything You Need for <span className="text-green-600">Perfect Travel</span>
          </h2>
          <p className="text-center text-gray-700 max-w-2xl mx-auto">
            From AI-powered destination discovery to smart budget planning and cultural insights, ViaMigo provides comprehensive tools for unforgettable travel experiences.
          </p>
        </div>
        <VideoSection />
      </div>
    </div>
  )
}

export default App
