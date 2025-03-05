import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import AIChatBot from "./pages/Bot";
import TourismMetricsDashboard from "./pages/TourismMetric";
import Layout from "./components/Layout";

// Layout component with persistent Header




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
