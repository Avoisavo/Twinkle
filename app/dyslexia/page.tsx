'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { BookScene } from './components/BookScene';
import { BookPageLayout } from './components/BookPageLayout';
import LearnWordNavbar from './components/LearnWordNavbar';

export default function DyslexiaPage() {
    const [flippedIndex, setFlippedIndex] = useState(0);

    // Simple pages for the book - no learning functions
    const pages = [
        {
            left: (
                <group position={[0, 0, 0]}>
                    {/* Empty left page */}
                </group>
            ),
            right: (
                <BookPageLayout pageNumber={1}>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-bold text-gray-800">Welcome</h2>
                    </div>
                </BookPageLayout>
            )
        },
        {
            left: (
                <group position={[0, 0, 0]}>
                    {/* Empty left page */}
                </group>
            ),
            right: (
                <BookPageLayout pageNumber={2}>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <p className="text-2xl text-gray-700">Page 2</p>
                    </div>
                </BookPageLayout>
            )
        },
        {
            left: (
                <group position={[0, 0, 0]}>
                    {/* Empty left page */}
                </group>
            ),
            right: (
                <BookPageLayout pageNumber={3}>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <p className="text-2xl text-gray-700">Page 3</p>
                    </div>
                </BookPageLayout>
            )
        }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden" style={{
            backgroundImage: 'url(/bg_book_room.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            {/* Navbar */}
            <LearnWordNavbar />
            
            {/* 3D Book */}
            <div 
                className="fixed inset-0 z-0 cursor-pointer"
                onClick={() => {
                    // Increment flippedIndex when clicked, but don't exceed the number of pages
                    setFlippedIndex(prev => Math.min(prev + 1, pages.length));
                }}
            >
                <Canvas shadows camera={{
                    position: [-0.5, 1, 4],
                    fov: 45,
                }}>
                    <group position-y={0}>
                        <Suspense fallback={null}>
                            <BookScene
                                pages={pages}
                                flippedIndex={flippedIndex}
                                isLevelComplete={false}
                            />
                        </Suspense>
                    </group>
                </Canvas>
                <Loader />
            </div>
        </div>
    );
}
