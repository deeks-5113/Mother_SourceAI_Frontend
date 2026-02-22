import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBubble() {
    const bubbleRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);

                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(err => console.warn("Video play failed:", err));
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.6 } // Plays when 60% visible
        );

        if (bubbleRef.current) {
            observer.observe(bubbleRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={bubbleRef}
            className={`relative w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] 
            float-bubble
            transition-all duration-1000 ease-out z-10
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
            {/* Video Layer (Hidden if asset missing) */}
            <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-contain z-20"
                onError={(e) => {
                    (e.target as HTMLVideoElement).style.display = 'none';
                }}
            >
                <source src="/videos/pregnancy-animation.mp4" type="video/mp4" />
            </video>

            {/* SVG Illustration - Pregnant Woman holding her belly */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <svg viewBox="0 0 200 200" className="w-full h-full p-0">
                    <defs>
                        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#F9C784', stopOpacity: 0.15 }} />
                            <stop offset="100%" style={{ stopColor: '#1E1B4B', stopOpacity: 0.1 }} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Minimalist Silhouette of a Pregnant Woman */}
                    <motion.g
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Head */}
                        <circle cx="100" cy="45" r="12" fill="#1E1B4B" opacity="0.15" />

                        {/* Body / Torso */}
                        <path
                            d="M100 57c-10 0-18 8-18 20v40c0 15 15 25 30 25s30-10 30-25V77c0-12-8-20-18-20z"
                            fill="#1E1B4B" opacity="0.08"
                        />

                        {/* The Belly (The Core Focus) */}
                        <motion.circle
                            cx="115" cy="110" r="32"
                            fill="url(#skinGrad)"
                            stroke="#F9C784" strokeWidth="1.5" strokeDasharray="4 4"
                            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            style={{ filter: 'url(#glow)' }}
                        />

                        {/* Hands holding the belly */}
                        <path
                            d="M85 105c5 10 15 15 30 15M85 115c8 8 20 10 35 5"
                            stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" opacity="0.25"
                        />

                        {/* Soft Heart Glow inside the belly */}
                        <motion.path
                            d="M115 115l-2.4-2.2c-8-7.3-13.3-12.2-13.3-18.2 0-4.9 3.9-8.8 8.8-8.8 2.8 0 5.4 1.3 7 3.3 1.6-2 4.2-3.3 7-3.3 4.9 0 8.8 3.9 8.8 8.8 0 6-5.3 10.9-13.3 18.2l-2.6 2.4z"
                            fill="#1E1B4B"
                            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            transform="translate(-10, -10)"
                        />
                    </motion.g>

                    {/* Surrounding Energy Waves */}
                    <circle cx="115" cy="110" r="50" fill="none" stroke="#F9C784" strokeWidth="0.5" opacity="0.2">
                        <animate attributeName="r" values="45;55;45" dur="5s" repeatCount="indefinite" />
                    </circle>
                </svg>

            </div>
        </div>
    );
}
