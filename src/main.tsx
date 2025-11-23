import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import AuthPage from "@/pages/Auth.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Lenis from "lenis";
import "./index.css";
import Home from "./pages/Home.tsx";
import Now from "./pages/Now.tsx";
import Projects from "./pages/Projects.tsx";
import Thinking from "./pages/Thinking.tsx";
import About from "./pages/About.tsx";
import PastWork from "./pages/PastWork.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import "./types/global.d.ts";
import { CursorGlow } from "@/components/CursorGlow.tsx";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);



function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
 
function SmoothScrollController() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    const startLenis = () => {
      if (lenis) return;

      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        gestureOrientation: "vertical",
        wheelMultiplier: 0.9,
        touchMultiplier: 1.2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    const stopLenis = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopLenis();
      } else {
        startLenis();
      }
    };

    if (!mediaQuery.matches) {
      startLenis();
    }

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      stopLenis();
    };
  }, []);

  return null;
}
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter>
          <CursorGlow />
          <SmoothScrollController />
          <RouteSyncer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/now" element={<Now />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/thinking" element={<Thinking />} />
            <Route path="/about" element={<About />} />
            <Route path="/past-work" element={<PastWork />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);