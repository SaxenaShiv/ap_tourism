import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';

const Hero = () => {
  // YouTube Video IDs for Andhra Pradesh Landscapes
  const YOUTUBE_BACKGROUND_VIDEOS = [
    'ldbSDH5ejeU',
    'IIvUJQ0NECw'
  ];
  
  // Dynamic Taglines for Andhra Pradesh
  const ANDHRA_PRADESH_TAGLINES = [
    {
      headline: "Nagarjuna Sagar – Where History Meets Serenity",
      subheadline: "Explore the Majestic Dam and Ancient Buddhist Ruins"
    },
    {
      headline: "Tirupati – Divine Encounters and Spiritual Grandeur",
      subheadline: "Experience the Sacred Temples and Celestial Landscapes"
    },
    {
      headline: "Visakhapatnam – Coastal Wonders and Urban Charm",
      subheadline: "Beaches, Hills, and Vibrant City Life Await You"
    },
    {
      headline: "Araku Valley – Nature's Pristine Paradise",
      subheadline: "Coffee Plantations, Tribal Culture, and Misty Mountains"
    },
    {
      headline: "Lepakshi – Architectural Marvel of Ancient Craftsmanship",
      subheadline: "Uncover the Secrets of Stunning Hanging Pillars and Sculptures"
    },
    {
      headline: "Gandepalli Beach – Untouched Coastal Serenity",
      subheadline: "Discover Hidden Shores and Tranquil Maritime Landscapes"
    },
    {
      headline: "Amaravati – Birthplace of Buddhist Heritage",
      subheadline: "Ancient Stupas and Modern Architectural Marvels"
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isTaglineChanging, setIsTaglineChanging] = useState(false);

  // Randomize video selection
  const shuffleVideos = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const newIndex = Math.floor(Math.random() * YOUTUBE_BACKGROUND_VIDEOS.length);
      return newIndex === prevIndex 
        ? (newIndex + 1) % YOUTUBE_BACKGROUND_VIDEOS.length 
        : newIndex;
    });
  }, []);

  // Cycle through taglines
  const cycleTaglines = useCallback(() => {
    setIsTaglineChanging(true);
    
    // Use setTimeout to create a fade-out effect
    setTimeout(() => {
      setCurrentTaglineIndex((prevIndex) => 
        (prevIndex + 1) % ANDHRA_PRADESH_TAGLINES.length
      );
      
      // Reset changing state after transition
      setTimeout(() => {
        setIsTaglineChanging(false);
      }, 500);
    }, 500);
  }, []);

  useEffect(() => {
    // Prevent default body/html margins
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';

    // Tagline cycling interval
    const taglineInterval = setInterval(cycleTaglines, 5000);

    // Video shuffling interval with random timing
    const videoInterval = setInterval(shuffleVideos, 5000 + Math.random() * 3000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(taglineInterval);
      clearInterval(videoInterval);
    };
  }, [cycleTaglines, shuffleVideos]);

  const currentTagline = ANDHRA_PRADESH_TAGLINES[currentTaglineIndex];
  const currentVideoId = YOUTUBE_BACKGROUND_VIDEOS[currentVideoIndex];

  return (
    <div className="relative w-screen min-h-screen">
      {/* Background Videos */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
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
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&enablejsapi=1`}
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-40">
        <h2 
          key={`headline-${currentTaglineIndex}`}
          className={`text-5xl font-bold mb-4 drop-shadow-lg transition-all duration-500 ${
            isTaglineChanging 
              ? 'opacity-0 transform -translate-y-10' 
              : 'opacity-100 transform translate-y-0'
          }`}
        >
          {currentTagline.headline}
        </h2>
        <p 
          key={`subheadline-${currentTaglineIndex}`}
          className={`text-lg max-w-2xl mb-6 drop-shadow-md transition-all duration-500 ${
            isTaglineChanging 
              ? 'opacity-0 transform translate-y-10' 
              : 'opacity-100 transform translate-y-0'
          }`}
        >
          {currentTagline.subheadline}
        </p>
        <div className="flex space-x-4 animate-slideUp delay-700">
          <a 
            href="#explore" 
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition transform hover:scale-105"
          >
            Explore Now
          </a>
          <Link 
            to="/ai-trip-planner" 
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition transform hover:scale-105"
          >
            Plan My Trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;