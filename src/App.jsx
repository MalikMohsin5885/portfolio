import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { DockNav, ResumeFab } from "./components/layout";
import { useLenisScroll } from "./hooks/useLenisScroll";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useLenisScroll();

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("app-route-change", { detail: { pathname: location.pathname } }),
    );
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-lumen">
        <div className="font-serif text-3xl text-vast">MR</div>
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-lumen-dark">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-vast/30" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
      </Routes>
      <DockNav />
      <ResumeFab />
    </>
  );
};

export default App;
