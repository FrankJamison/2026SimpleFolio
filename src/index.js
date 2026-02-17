import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import {
    targetElements,
    defaultProps
} from "./data/scrollRevealConfig";

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion) {
    document.documentElement.classList.add("sr");
    initScrollReveal(targetElements, defaultProps);
    initTiltEffect();
}