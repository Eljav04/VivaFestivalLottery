import React, { useEffect, useState } from 'react';
import { useLotteryStore, type Participant } from '../store/useLotteryStore';
import { CarPlate } from './CarPlate';
import { Power } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { cn } from '../utils/tw';

const TOTAL_PLATES = 50;
const EXTRA_SPIN_DISTANCE = 35;

export const RouletteGrid: React.FC = () => {
    const { participants, addWinner, triggerSpin, setTriggerSpin } = useLotteryStore();
    const eligibleParticipants = participants.filter((p) => !p.isWinner);

    const [spinning, setSpinning] = useState(false);
    const [visualList, setVisualList] = useState<Participant[]>([]);

    // Track selected index explicitly via Keen-Slider callback
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Refs for safe synchronous access inside Keen-Slider callbacks
    const spinningRef = React.useRef(false);
    const winningParticipantRef = React.useRef<Participant | null>(null);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        vertical: true,
        slides: {
            perView: 5,
            spacing: 0,
        },
        defaultAnimation: {
            duration: 3000
        },
        drag: false, // Prevents manual drag breaking the programmatic spin
        detailsChanged(s) {
            if (!s.track || !s.track.details) return; // Prevent crash before slider fully initializes
            const rel = s.track.details.rel;
            if (rel !== undefined && rel !== selectedIndex) {
                setSelectedIndex(rel);
            }
        },
        animationEnded(s) {
            if (spinningRef.current) {
                spinningRef.current = false;
                setSpinning(false);
                if (winningParticipantRef.current) {
                    addWinner(winningParticipantRef.current);
                }
            }
        }
    });

    // Ensure there's a base static list for initial load
    useEffect(() => {
        if (visualList.length === 0 && eligibleParticipants.length > 0) {
            const initial: Participant[] = [];
            for (let i = 0; i < TOTAL_PLATES; i++) {
                initial.push(eligibleParticipants[i % eligibleParticipants.length]);
            }
            // Shuffle initial display so it visually looks randomized
            const shuffled = [...initial].sort(() => Math.random() - 0.5);
            setVisualList(shuffled);
        }
    }, [eligibleParticipants, visualList.length]);

    useEffect(() => {
        if (triggerSpin && !spinning) {
            // Strict checks to avoid crashing on undefined track details
            if (eligibleParticipants.length === 0 || !instanceRef.current || !instanceRef.current.track || !instanceRef.current.track.details) {
                setTriggerSpin(false);
                return;
            }

            const slider = instanceRef.current;

            // Lock state safely
            setTriggerSpin(false);
            setSpinning(true);
            spinningRef.current = true;

            const winningParticipant = eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)];
            winningParticipantRef.current = winningParticipant;

            // To spin, we calculate a target index in absolute terms (handling loops natively without UI recreation)
            const trackLength = visualList.length;
            const currentIndex = slider.track.details.abs;
            const targetAbsIdx = currentIndex + EXTRA_SPIN_DISTANCE;

            // We need to inject the winner at the corresponding mod index in our pure array state
            const targetRelIdx = ((targetAbsIdx % trackLength) + trackLength) % trackLength;

            setVisualList(prev => {
                const newList = [...prev];
                newList[targetRelIdx] = winningParticipant;
                return newList;
            });

            // Wait for React to mount the new winner content precisely before issuing move
            requestAnimationFrame(() => {
                if (!instanceRef.current) return;

                // Move with smooth cubic easing resembling a casino wheel friction
                // The `animationEnded` hook on our keen-slider instance will gracefully handle component unlock
                slider.moveToIdx(targetAbsIdx, true, {
                    duration: 4000,
                    easing: (t) => 1 - Math.pow(1 - t, 4)
                });
            });
        }
    }, [triggerSpin, spinning, eligibleParticipants, addWinner, setTriggerSpin, visualList.length, instanceRef]);

    return (
        <section className="relative h-full flex flex-col items-center justify-center p-6 border-r border-white/5 bg-slate-900/20 backdrop-blur-md overflow-hidden">
            <div className="w-full flex-1 flex flex-col justify-center items-center gap-4 py-12 relative overflow-hidden">
                {/* Visual Viewport Edges (Shadow Fades) */}
                <div className="absolute top-0 w-full h-32 z-20 pointer-events-none bg-linear-to-b from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-0 w-full h-32 z-20 pointer-events-none bg-linear-to-t from-slate-900/80 to-transparent"></div>

                {eligibleParticipants.length < 1 && visualList.length === 0 ? (
                    <div className="text-white/40 font-headline uppercase tracking-widest text-sm z-30">No eligible participants</div>
                ) : visualList.length === TOTAL_PLATES ? (
                    <div className="relative w-full h-[600px] overflow-hidden">
                        {/* Keen Slider Container mounted ONLY when list is populated to ensure native height/count readings */}
                        <div ref={sliderRef} className="keen-slider h-full w-full relative">
                            {visualList.map((p, i) => {
                                const isSelected = i === selectedIndex;

                                return (
                                    <div
                                        key={i}
                                        className="keen-slider__slide flex items-center justify-center w-full"
                                    >
                                        <div className={cn(
                                            "w-full max-w-[400px] mx-auto flex items-center justify-center transition-all duration-300 rounded-lg",
                                            !isSelected ? "opacity-30 blur-[0.5px] scale-90" : "opacity-100 scale-105 z-10",
                                            spinning && "opacity-60 blur-none scale-100"
                                        )}>
                                            <div className="relative z-10 w-full flex justify-center">
                                                <CarPlate
                                                    plate={p.plate}
                                                    size="md"
                                                    active={false} // Removed winner glow as requested
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}

                {/* Center marker for iOS Picker aesthetic */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[420px] h-[120px] border-y border-white/5 z-10 pointer-events-none rounded bg-white/5"></div>
            </div>

            <div className="w-full mt-auto pb-12 px-8 z-30 relative">
                <button
                    onClick={() => setTriggerSpin(true)}
                    disabled={spinning || eligibleParticipants.length === 0}
                    className="w-full group relative flex flex-col items-center justify-center gap-2 py-6 bg-linear-to-b from-orange-500 to-orange-700 rounded-sm shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[0.98] transition-all duration-100 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Power className="w-10 h-10 text-white drop-shadow-md" />
                    <span className="font-headline font-black text-3xl tracking-[0.2em] text-white drop-shadow-md">SPIN</span>
                </button>
            </div>
        </section>
    );
};
