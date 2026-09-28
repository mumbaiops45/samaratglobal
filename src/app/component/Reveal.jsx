"use client";

import { motion, MotionConfig } from "framer-motion";

// Scroll-in animations shared across pages.
//
// Reduced motion is handled once, by <MotionSettings> in the root layout:
// framer-motion then skips the movement for visitors who ask for less
// motion. The components below always render the same markup, so the
// server HTML and the browser agree (no hydration mismatch).

const EASE = [0.22, 1, 0.36, 1];

export const MotionSettings = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

// Fades content in as it scrolls into view — rising up by default, or
// sliding in from the side when `x` is set (negative = from the left).
export const Reveal = ({ as = "div", delay = 0, y = 32, x = 0, className, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, x, y: x ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Parent/child pair for lists and grids: children appear one after another.
export const Stagger = ({ as = "div", gap = 0.1, className, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// Direction for a card in a grid: the left column slides in from the
// left, the right column from the right, middle columns rise up.
export const sideOffset = (index, columns) => {
  const col = index % columns;
  if (columns === 1 || col === 0) return -70;
  if (col === columns - 1) return 70;
  return 0;
};

// Per-card scroll reveal for grids: each card slides in (from its side, see
// sideOffset) when it reaches the viewport, with a small delay by column so
// a row cascades. Spread onto a motion element: <motion.div {...cardReveal(i, 4)}>
export const cardReveal = (index, columns = 4) => ({
  initial: { opacity: 0, x: sideOffset(index, columns), y: sideOffset(index, columns) ? 0 : 60, scale: 0.96 },
  whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, delay: (index % columns) * 0.12, ease: EASE },
});

// Image scroll effect: the photo starts slightly zoomed and settles into
// place as it scrolls into view. Uses only scale (never clipping), so the
// image is always visible even if the animation doesn't run. Wrap an <img>
// that fills its frame; the frame needs overflow-hidden.
export const ScrollZoom = ({ children, className = "h-full w-full", delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ scale: 1.22 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1.4, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
