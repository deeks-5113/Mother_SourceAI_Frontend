import type { Variants } from 'framer-motion';

export const springTransition = {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20,
    mass: 1,
};

export const slowSpring = {
    type: 'spring' as const,
    stiffness: 80,
    damping: 25,
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const fadeSlideUp: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: {
        opacity: 1,
        y: 0,
        transition: springTransition,
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2 }
    },
};

export const scaleReveal: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: springTransition,
    },
};

export const glowPulse = {
    animate: {
        boxShadow: [
            "0 0 0px rgba(45, 212, 191, 0)",
            "0 0 15px rgba(45, 212, 191, 0.4)",
            "0 0 0px rgba(45, 212, 191, 0)"
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};
