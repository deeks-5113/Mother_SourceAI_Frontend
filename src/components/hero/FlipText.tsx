import { motion } from 'framer-motion'

interface FlipTextProps {
    text: string
    className?: string
}

export function FlipText({ text, className = '' }: FlipTextProps) {
    const characters = text.split('')

    return (
        <span
            className={`inline-flex flex-wrap justify-center ${className}`}
            style={{ perspective: '1000px' }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className="inline-block origin-center"
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}
