import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  MapPin, 
  Hotel, 
  Clock, 
  TrendingUp, 
  Sun, 
  Cloud, 
  Users 
} from 'lucide-react';

// Sample Data
const touristFootfallData = [
  { month: 'Jan', visitors: 125000, international: 25000, domestic: 100000 },
  { month: 'Feb', visitors: 150000, international: 30000, domestic: 120000 },
  { month: 'Mar', visitors: 180000, international: 35000, domestic: 145000 },
  { month: 'Apr', visitors: 210000, international: 40000, domestic: 170000 },
  { month: 'May', visitors: 95000, international: 15000, domestic: 80000 },
  { month: 'Jun', visitors: 85000, international: 10000, domestic: 75000 }
];

const hotelOccupancyData = [
  { city: 'Visakhapatnam', occupancyRate: 65, totalRooms: 2500 },
  { city: 'Vijayawada', occupancyRate: 58, totalRooms: 1800 },
  { city: 'Tirupati', occupancyRate: 72, totalRooms: 1200 }
];

const stayLengthData = [
  { type: 'Weekend', avgNights: 2.5 },
  { type: 'Business', avgNights: 1.8 },
  { type: 'Leisure', avgNights: 3.2 }
];

const seasonalityData = [
  { season: 'Peak', months: 'Nov-Feb', visitors: 65 },
  { season: 'Shoulder', months: 'Mar-May', visitors: 25 },
  { season: 'Off-Peak', months: 'Jun-Oct', visitors: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const TourismMetricsDashboard = () => {
  const [activeMetric, setActiveMetric] = useState('footfall');

  // Calculate total visitors
  const totalVisitors = touristFootfallData.reduce((sum, item) => sum + item.visitors, 0);
  const averageMonthlyVisitors = (totalVisitors / touristFootfallData.length).toFixed(0);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl p-8">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Andhra Pradesh Tourism Metrics</h1>
              <p className="text-gray-500">Comprehensive Market Demand & Occupancy Analysis</p>
            </div>
            <div className="flex space-x-4">
              {['footfall', 'occupancy', 'stay', 'seasonality'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setActiveMetric(metric)}
                  className={`
                    px-4 py-2 rounded-lg transition-all
                    ${activeMetric === metric 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <Users className="w-10 h-10 text-blue-600 mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Total Visitors</h3>
                <p className="text-2xl font-bold text-blue-600">{totalVisitors.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex items-center">
              <TrendingUp className="w-10 h-10 text-green-600 mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Avg. Monthly Visitors</h3>
                <p className="text-2xl font-bold text-green-600">{averageMonthlyVisitors}</p>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg flex items-center">
              <Hotel className="w-10 h-10 text-yellow-600 mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Hotel Occupancy</h3>
                <p className="text-2xl font-bold text-yellow-600">62%</p>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg flex items-center">
              <Clock className="w-10 h-10 text-purple-600 mr-4" />
              <div>
                <h3 className="text-sm text-gray-600">Avg. Stay</h3>
                <p className="text-2xl font-bold text-purple-600">2.5 Nights</p>
              </div>
            </div>
          </div>

          {/* Dynamic Visualization Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Chart */}
            <div className="bg-white border rounded-lg p-6 shadow-md">
              {activeMetric === 'footfall' && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Tourist Footfall</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={touristFootfallData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Visitors', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="domestic" stackId="a" fill="#8884d8" />
                      <Bar dataKey="international" stackId="a" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {activeMetric === 'occupancy' && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Hotel Occupancy Rates</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={hotelOccupancyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="totalRooms"
                      >
                        {hotelOccupancyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </>
              )}

              {activeMetric === 'stay' && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Average Length of Stay</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stayLengthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis label={{ value: 'Nights', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="avgNights" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {activeMetric === 'seasonality' && (
                <>
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Seasonality Trends</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={seasonalityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="visitors"
                      >
                        {seasonalityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name, props) => {
                          const season = props.payload.season;
                          const months = props.payload.months;
                          return [`${value}% Visitors`, `${season} (${months})`];
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </>
              )}
            </div>

            {/* Right Detailed Insights */}
            <div className="bg-white border rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {activeMetric === 'footfall' && 'Visitor Breakdown'}
                {activeMetric === 'occupancy' && 'City-wise Occupancy'}
                {activeMetric === 'stay' && 'Stay Type Analysis'}
                {activeMetric === 'seasonality' && 'Seasonal Visitor Distribution'}
              </h2>

              {activeMetric === 'footfall' && (
                <div className="space-y-4">
                  {touristFootfallData.map((data) => (
                    <div key={data.month} className="flex justify-between items-center">
                      <span className="font-medium">{data.month}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">{data.visitors.toLocaleString()} Total</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{width: `${(data.visitors / Math.max(...touristFootfallData.map(d => d.visitors))) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeMetric === 'occupancy' && (
                <div className="space-y-4">
                  {hotelOccupancyData.map((city) => (
                    <div key={city.city} className="flex justify-between items-center">
                      <span className="font-medium">{city.city}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`
                          px-2 py-1 rounded text-sm
                          ${city.occupancyRate > 65 ? 'bg-green-100 text-green-800' : 
                            city.occupancyRate > 50 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}
                        `}>
                          {city.occupancyRate}% Occupied
                        </span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{width: `${city.occupancyRate}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeMetric === 'stay' && (
                <div className="space-y-4">
                  {stayLengthData.map((data) => (
                    <div key={data.type} className="flex justify-between items-center">
                      <span className="font-medium">{data.type} Traveler</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">{data.avgNights} Nights</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{width: `${(data.avgNights / Math.max(...stayLengthData.map(d => d.avgNights))) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeMetric === 'seasonality' && (
                <div className="space-y-4">
                  {seasonalityData.map((data) => (
                    <div key={data.season} className="flex justify-between items-center">
                      <div className="flex items-center">
                        {data.season === 'Peak' ? <Sun className="mr-2 text-yellow-500" /> : 
                         data.season === 'Shoulder' ? <Cloud className="mr-2 text-blue-500" /> : 
                         <span className="mr-2">🌧️</span>}
                        <span className="font-medium">{data.season} Season ({data.months})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-600">{data.visitors}% Visitors</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-orange-600 h-2.5 rounded-full" 
                            style={{width: `${data.visitors}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourismMetricsDashboard;