import React, { useEffect, useState } from 'react';
import styles from './GameLoader.module.css';

interface GameLoaderProps {
    onFinished: () => void;
}

const GameLoader: React.FC<GameLoaderProps> = ({ onFinished }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    // Simple state to ensure we don't start progress until video is at least ready to play
    // (Optional for video, but good practice to avoid black box)
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        if (!videoReady) return;

        let animationFrameId: number;

        const simulateLoad = () => {
            setProgress((prev) => {
                const next = prev + Math.random() * 1.5;
                if (next >= 100) {
                    return 100;
                }
                return next;
            });

            if (progress < 100) {
                animationFrameId = requestAnimationFrame(simulateLoad);
            }
        };

        animationFrameId = requestAnimationFrame(simulateLoad);

        return () => cancelAnimationFrame(animationFrameId);
    }, [progress, videoReady]);

    useEffect(() => {
        if (progress >= 100 && !isComplete) {
            setIsComplete(true);
            setTimeout(() => {
                onFinished();
            }, 800);
        }
    }, [progress, isComplete, onFinished]);

    return (
        <div className={`${styles.container} ${isComplete ? styles.slideUp : ''}`}>

            {/* Video Layer */}
            <div className={styles.videoContainer}>
                <video
                    src="/hellokitty/helloModel/dancing.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlay={() => setVideoReady(true)}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            </div>

            <div className={styles.inner}>
                <div
                    className={styles.loaderProgress}
                    style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.3s' }}
                >
                    <div
                        className={styles.loaderBar}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameLoader;
