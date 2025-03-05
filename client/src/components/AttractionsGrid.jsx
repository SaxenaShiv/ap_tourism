import React from 'react';

const attractionsData = [
  {
    title: "Visakhapatnam",
    description: "Coastal city with beautiful beaches and naval heritage",
    image: "/api/placeholder/400/300?text=Visakhapatnam"
  },
  {
    title: "Araku Valley",
    description: "Scenic hill station known for coffee plantations",
    image: "/api/placeholder/400/300?text=Araku+Valley"
  },
  {
    title: "Tirupati",
    description: "Home to the famous Venkateswara Temple",
    image: "/api/placeholder/400/300?text=Tirupati"
  },
  {
    title: "Vijaywada",
    description: "Cultural hub on the banks of Krishna River",
    image: "/api/placeholder/400/300?text=Vijaywada"
  },
  {
    title: "Gandepalli",
    description: "Scenic rural landscape with rich traditions",
    image: "/api/placeholder/400/300?text=Gandepalli"
  },
  {
    title: "Lepakshi",
    description: "Historic temple town with architectural marvels",
    image: "/api/placeholder/400/300?text=Lepakshi"
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