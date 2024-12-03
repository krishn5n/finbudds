import React, { useState, useEffect, useRef } from 'react';
import '../Css/Animation.css';

const BouncingWord = ({ word }) => {
    const containerRef = useRef(null);
    const wordRef = useRef(null);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [direction, setDirection] = useState({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    });

    useEffect(() => {
        if (!containerRef.current) return;

        // Initial position using window dimensions to ensure visibility
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        setPosition({
            x: Math.random() * (containerWidth * 0.8),
            y: Math.random() * (containerHeight * 0.8)
        });
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const animate = () => {
            setPosition(prev => {
                const containerWidth = window.innerWidth;
                const containerHeight = window.innerHeight;
                const wordWidth = 5;  // Approximate width for the word
                const wordHeight = 50;   // Approximate height for the word

                let newX = prev.x + direction.x * 3;
                let newY = prev.y + direction.y * 3;
                let newDirX = direction.x;
                let newDirY = direction.y;

                // Boundary detection
                if (newX <= 0 || newX >= containerWidth - wordWidth) {
                    newDirX = -direction.x;
                    newX = newX <= 0 ? 0 : containerWidth - wordWidth;
                }

                if (newY <= 0 || newY >= containerHeight - wordHeight) {
                    newDirY = -direction.y;
                    newY = newY <= 0 ? 0 : containerHeight - wordHeight;
                }

                setDirection({ x: newDirX, y: newDirY });

                return {
                    x: Math.max(0, Math.min(newX, containerWidth - wordWidth)),
                    y: Math.max(0, Math.min(newY, containerHeight - wordHeight))
                };
            });
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [direction]);

    return (
        <div ref={containerRef} className="bouncing-container">
            <div
                ref={wordRef}
                className="bouncing-word"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.1s linear',
                }}
            >
                {word}
            </div>
        </div>
    );
};

export default BouncingWord;