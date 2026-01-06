import { useEffect, useState } from "react";

type ReducedEffectsState = {
  shouldReduceEffects: boolean;
  hasFinePointer: boolean;
};

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

const getInitialState = (): ReducedEffectsState => {
  if (typeof window === "undefined") {
    return { shouldReduceEffects: false, hasFinePointer: true };
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const prefersReducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  return {
    shouldReduceEffects:
      prefersReducedMotion || prefersReducedData || !hasFinePointer || !canHover,
    hasFinePointer,
  };
};

export function useReducedEffects(): ReducedEffectsState {
  const [state, setState] = useState<ReducedEffectsState>(getInitialState);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedDataQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const hoverQuery = window.matchMedia("(hover: hover)");

    const update = () => {
      const hasFinePointer = finePointerQuery.matches;
      const canHover = hoverQuery.matches;
      setState({
        shouldReduceEffects:
          reducedMotionQuery.matches ||
          reducedDataQuery.matches ||
          !hasFinePointer ||
          !canHover,
        hasFinePointer,
      });
    };

    update();

    const queries = [reducedMotionQuery, reducedDataQuery, finePointerQuery, hoverQuery];
    queries.forEach((query) => {
      const legacyQuery = query as LegacyMediaQueryList;
      if (legacyQuery.addEventListener) {
        legacyQuery.addEventListener("change", update);
      } else if (legacyQuery.addListener) {
        legacyQuery.addListener(update);
      }
    });

    return () => {
      queries.forEach((query) => {
        const legacyQuery = query as LegacyMediaQueryList;
        if (legacyQuery.removeEventListener) {
          legacyQuery.removeEventListener("change", update);
        } else if (legacyQuery.removeListener) {
          legacyQuery.removeListener(update);
        }
      });
    };
  }, []);

  return state;
}
