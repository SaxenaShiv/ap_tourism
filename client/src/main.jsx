import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import App from "./App";
import "./index.css";
import AIChatBot from "./pages/Bot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TourismMetricsDashboard from "./pages/TourismMetric";

// Layout component with persistent Header
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow mt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/ai-trip-planner" element={<AIChatBot />} />
        <Route path="/market-demand" element={<TourismMetricsDashboard/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
