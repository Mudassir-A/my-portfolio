"use client";

import { useEffect } from "react";

export default function ClickMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Map();

    function press(event) {
      const control = event.target instanceof Element && event.target.closest("a, button");
      if (!control?.animate || preference.matches) return;

      animations.get(control)?.cancel();
      const animation = control.animate(
        [{ scale: "1" }, { scale: ".91", offset: .25 }, { scale: "1.05", offset: .65 }, { scale: "1" }],
        { duration: 380, easing: "cubic-bezier(.2,.75,.3,1)" }
      );
      animations.set(control, animation);
      animation.onfinish = () => animations.delete(control);
    }

    function clearAnimations() {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }

    const contents = [...document.querySelectorAll("main .rv")];
    const observer = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        target.classList.add("in");
        target.classList.remove("rv-pending");
        observer.unobserve(target);
      }
    }, { rootMargin: "0px 0px -8% 0px" });

    if (observer) {
      const belowFold = contents.filter((element) => element.getBoundingClientRect().top >= window.innerHeight);
      belowFold.forEach((element) => element.classList.add("rv-pending"));
      contents.forEach((element) => observer.observe(element));
    }

    document.addEventListener("click", press);
    preference.addEventListener("change", clearAnimations);
    return () => {
      document.removeEventListener("click", press);
      preference.removeEventListener("change", clearAnimations);
      clearAnimations();
      if (observer) observer.disconnect();
      contents.forEach((element) => element.classList.remove("rv-pending"));
    };
  }, []);

  return null;
}
