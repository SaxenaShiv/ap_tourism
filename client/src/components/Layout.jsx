import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function Layout() {
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