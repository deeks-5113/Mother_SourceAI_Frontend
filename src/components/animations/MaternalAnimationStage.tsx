import Lottie from "lottie-react";
import pregnancyRotatingHands from "../../../public/animations/pregnancy-care.json";

export const MaternalAnimationStage = () => {
    return (
        <div className="relative flex items-center justify-center w-full min-h-[500px] lg:h-[600px] group">
            {/* Decorative background depth - Indigo themed */}
            <div className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] bg-[#1E1B4B]/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute w-[200px] h-[200px] bg-[#F9C784]/10 rounded-full blur-[60px] translate-x-20 -translate-y-10 group-hover:scale-110 transition-transform duration-1000" />

            {/* The Lottie Player */}
            <div className="relative w-full max-w-lg z-10 drop-shadow-[0_20px_50px_rgba(30,27,75,0.15)]">
                <Lottie
                    animationData={pregnancyRotatingHands}
                    loop={true}
                    className="w-full h-full"
                />
            </div>

            {/* Glossy Overlay Detail */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1B4B]/0 via-[#F9C784]/5 to-[#1E1B4B]/0 pointer-events-none rounded-[3rem]" />
        </div>
    );
};
