import { useEffect, type DependencyList } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GSAPCallback = (g: typeof gsap) => void | (() => void);

/**
 * Runs a GSAP setup callback on mount (client-side only), passing the gsap
 * instance with ScrollTrigger already registered. Return a cleanup function
 * from the callback to revert animations/triggers.
 */
export function useGSAP(callback: GSAPCallback, deps: DependencyList = []) {
  useEffect(() => {
    const cleanup = callback(gsap);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
