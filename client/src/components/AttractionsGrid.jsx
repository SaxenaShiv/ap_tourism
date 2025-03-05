import React from 'react';
import visakhapatnamImg from '../assets/images/visakhapatnam.png';
import arakuValleyImg from '../assets/images/Araku.png';
import tirupatiImg from '../assets/images/Tirupati.png';
import vijaywadaImg from '../assets/images/Vijaywada.png';
import gandepalliImg from '../assets/images/Gandepalli.png';
import lepakshiImg from '../assets/images/lepakshi.png';
const attractionsData = [
  {
    title: "Visakhapatnam",
    description: "Coastal city with beautiful beaches and naval heritage",
    image: visakhapatnamImg
  },
  {
    title: "Araku Valley",
    description: "Scenic hill station known for coffee plantations",
    image: arakuValleyImg
  },
  {
    title: "Tirupati",
    description: "Home to the famous Venkateswara Temple",
    image: tirupatiImg
  },
  {
    title: "Vijaywada",
    description: "Cultural hub on the banks of Krishna River",
    image: vijaywadaImg
  },
  {
    title: "Gandepalli",
    description: "Scenic rural landscape with rich traditions",
    image: gandepalliImg
  },
  {
    title: "Lepakshi",
    description: "Historic temple town with architectural marvels",
    image: lepakshiImg
  }
];

const AttractionCard = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const AttractionsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Discover Andhra Pradesh
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {attractionsData.map((attraction, index) => (
          <AttractionCard 
            key={index}
            title={attraction.title}
            description={attraction.description}
            image={attraction.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AttractionsGrid;