import React, { useState, useEffect } from 'react';
import './App.css';

// YouTube Video IDs for Andhra Pradesh Landscapes
const YOUTUBE_BACKGROUND_VIDEOS = [
  'cEVE6usxc-I', 
  'duLDGNjo_DU',
  'ldbSDH5ejeU',
  'IIvUJQ0NECw'
];

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    // Prevent default body/html margins
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    // Function to get a random interval between 2000-3000 ms
    const getRandomInterval = () => {
      return 2000 + Math.floor(Math.random() * 1000);
    };

    // Shuffle videos with random interval
    const shuffleVideos = () => {
      // Generate a new random index different from the current one
      const newIndex = Math.floor(Math.random() * (YOUTUBE_BACKGROUND_VIDEOS.length - 1));
      const adjustedIndex = newIndex >= currentVideoIndex ? newIndex + 1 : newIndex;
      setCurrentVideoIndex(adjustedIndex % YOUTUBE_BACKGROUND_VIDEOS.length);
    };

    // Set up interval with random timing
    const shuffleInterval = setInterval(shuffleVideos, getRandomInterval());

    // Cleanup interval on component unmount
    return () => clearInterval(shuffleInterval);
  }, [currentVideoIndex]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden mt-8">
      {/* YouTube Background Video */}
      <div className="absolute inset-0 w-full h-full video-container">
        {YOUTUBE_BACKGROUND_VIDEOS.map((videoId, index) => (
          <div 
            key={videoId}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentVideoIndex 
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <iframe
              id={`youtube-player-${videoId}`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&enablejsapi=1&end=-1`}
              title="Background Video"
              allow="autoplay; encrypted-media"
              className="absolute top-1/2 left-1/2 w-[100%] h-[300%] transform -translate-x-1/2 -translate-y-1/2"
              style={{
                margin: 0,
                padding: 0,
                border: 'none',
                zIndex: -1,
              }}
            />
          </div>
        ))}
      </div>

      {/* Rest of the code remains the same */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-40">
        <h2 
          style={{
            animation: 'fadeIn 1s ease-out',
            opacity: 0,
            animationFillMode: 'forwards'
          }}
          className="text-5xl font-bold mb-4 drop-shadow-lg"
        >
          Explore the Beauty of Andhra Pradesh
        </h2>
        <p 
          style={{
            animation: 'fadeIn 1s ease-out 0.5s',
            opacity: 0,
            animationFillMode: 'forwards'
          }}
          className="text-lg max-w-2xl mb-6 drop-shadow-md"
        >
          Discover breathtaking landscapes, rich heritage, and vibrant culture.
        </p>
        <div 
          style={{
            animation: 'slideUp 1s ease-out 0.7s',
            opacity: 0,
            transform: 'translateY(20px)',
            animationFillMode: 'forwards'
          }}
          className="flex space-x-4"
        >
          <a
            href="#explore"
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold 
            hover:bg-yellow-600 transition transform hover:scale-105"
          >
            Explore Now
          </a>
          <a
            href="/ai-trip-planner"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg text-lg font-semibold 
            hover:bg-white hover:text-black transition transform hover:scale-105"
          >
            Plan My Trip
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;