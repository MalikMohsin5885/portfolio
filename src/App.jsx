import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { useLenisScroll } from "./hooks/useLenisScroll";

const App = () => {
  const [loading, setLoading] = useState(true);
  useLenisScroll();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-lumen">
        <div className="font-serif text-3xl text-vast">MR</div>
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-lumen-dark">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-fathom" />
        </div>
      </div>
    );
  }

  return <Home />;
};

export default App;
