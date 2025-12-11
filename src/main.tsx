import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import AuthPage from "@/pages/Auth.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { AnimatePresence } from "framer-motion";
import { ReactNode, StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Lenis from "lenis";
import "./index.css";
import Home from "./pages/Home.tsx";
import Now from "./pages/Now.tsx";
import Projects from "./pages/Projects.tsx";
import About from "./pages/About.tsx";
import PastWork from "./pages/PastWork.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import "./types/global.d.ts";
import { PageTransition, RouteTransitionOverlay } from "@/components/PageTransition.tsx";
import { AuthContextProvider, AuthFallbackProvider } from "@/hooks/use-auth.tsx";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;
const missingConvexWarning =
  "VITE_CONVEX_URL is not set. Running Convex auth in disabled mode.";
const shouldWarnAboutConvex =
  import.meta.env.VITE_WARN_ABOUT_CONVEX === "true";
let hasWarnedAboutConvex = false;



export function RouteSyncer() {
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
 
export function SmoothScrollController() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    const startLenis = () => {
      if (lenis) return;

      lenis = new Lenis({
        duration: 0.85, // lower duration = less damped smoothing
        smoothWheel: true,
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        touchMultiplier: 1.1,
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

export function ConvexAuthBoundary({ children }: { children: ReactNode }) {
  if (!convex) {
    if (import.meta.env.DEV && shouldWarnAboutConvex && !hasWarnedAboutConvex) {
      console.warn(missingConvexWarning);
      hasWarnedAboutConvex = true;
    }
    return <AuthFallbackProvider>{children}</AuthFallbackProvider>;
  }

  return (
    <ConvexAuthProvider client={convex}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ConvexAuthProvider>
  );
}

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} presenceAffectsLayout={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/now"
          element={
            <PageTransition>
              <Now />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/past-work"
          element={
            <PageTransition>
              <PastWork />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/auth"
          element={
            <PageTransition>
              <AuthPage redirectAfterAuth="/" />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <ConvexAuthBoundary>
        <>
          <BrowserRouter>
            <SmoothScrollController />
            <RouteSyncer />
            <RouteTransitionOverlay />
            <AnimatedRoutes />
          </BrowserRouter>
          <Toaster />
        </>
      </ConvexAuthBoundary>
    </InstrumentationProvider>
  </StrictMode>,
);