import './App.css';
import AttractionsGrid from './components/AttractionsGrid';
import Hero from './components/Hero';

function App() { 
  return (
    <div className="w-screen">
      <Hero />
      <AttractionsGrid />
    </div>
  );
}

export default App;