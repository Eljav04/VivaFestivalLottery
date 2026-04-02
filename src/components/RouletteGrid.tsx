import React, { useEffect, useState } from 'react';
import { useLotteryStore, type Participant } from '../store/useLotteryStore';
import { CarPlate } from './CarPlate';
import { Power } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '../utils/tw';

export const RouletteGrid: React.FC = () => {
    const { participants, addWinner, triggerSpin, setTriggerSpin } = useLotteryStore();
    const eligibleParticipants = participants.filter((p) => !p.isWinner);

    const [spinning, setSpinning] = useState(false);
    const [displayPlates, setDisplayPlates] = useState<Participant[]>([]);
    const [winner, setWinner] = useState<Participant | null>(null);

    const controls = useAnimationControls();

    // Create a default list for idle state
    useEffect(() => {
        if (!spinning && eligibleParticipants.length > 0 && displayPlates.length === 0) {
            // populate with some items
            setDisplayPlates([...eligibleParticipants].sort(() => 0.5 - Math.random()).slice(0, 10));
        }
    }, [eligibleParticipants, spinning, displayPlates.length]);

    useEffect(() => {
        if (triggerSpin && !spinning) {
            if (eligibleParticipants.length === 0) {
                setTriggerSpin(false);
                return;
            }

            setTriggerSpin(false);
            setSpinning(true);
            setWinner(null);

            const winningIndex = Math.floor(Math.random() * eligibleParticipants.length);
            const chosenWinner = eligibleParticipants[winningIndex];

            // To create a slot machine effect, we create a track of plates.
            // We'll append many random plates, ending with the winner in the middle.
            const track: Participant[] = [];
            const trackLength = 40; // Number of items to spin through

            for (let i = 0; i < trackLength; i++) {
                // add random participants
                track.push(eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)]);
            }

            // Ensure the chosen winner is positioned exactly at the end
            track.push(chosenWinner);

            // And add some padding items at the bottom so it's vertically centered
            track.push(eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)] || chosenWinner);
            track.push(eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)] || chosenWinner);

            setDisplayPlates(track);

            // Height of each plate + gap is roughly 120px depending on rendering. 
            // We will let framer-motion handle the height offset simply by animating translateY.
            // Easiest is to animate 'y' using percentage or by letting it calculate.
            // Since we don't know pixel exact height easily, we can use flex column and flex reverse.

            const itemHeight = 112; // Base height estimate
            const targetY = -(trackLength - 2) * itemHeight;

            controls.start({
                y: targetY,
                transition: { type: 'spring', damping: 20, stiffness: 40, mass: 2, duration: 8 }
            }).then(() => {
                setSpinning(false);
                setWinner(chosenWinner);
                addWinner(chosenWinner);
            });
        }
    }, [triggerSpin, spinning, eligibleParticipants, controls, addWinner, setTriggerSpin]);

    return (
        <section className="relative h-full bg-surface-container-lowest flex flex-col items-center justify-center p-6 border-r border-outline-variant/15 overflow-hidden">
            <div className="absolute inset-0 carbon-texture opacity-30 pointer-events-none"></div>

            <div className="w-full flex-1 flex flex-col justify-center items-center gap-4 py-12 relative overflow-hidden">
                {/* Viewport Shadows */}
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-surface-container-lowest to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-surface-container-lowest to-transparent z-10 pointer-events-none"></div>

                {/* Center Target Indicator */}
                <div className="absolute top-1/2 left-0 w-full h-[120px] -translate-y-1/2 pointer-events-none z-0 border-y border-white/5 bg-white/5"></div>

                {eligibleParticipants.length < 1 && displayPlates.length === 0 ? (
                    <div className="text-white/40 font-headline uppercase tracking-widest text-sm z-20">No eligible participants</div>
                ) : (
                    <div className="relative w-full h-[500px] overflow-hidden flex justify-center items-center">
                        <motion.div
                            className="flex flex-col items-center gap-6 pt-[200px]"
                            animate={controls}
                            initial={{ y: 0 }}
                        >
                            {displayPlates.map((p, i) => {
                                const isSelected = !spinning && winner?.id === p.id && i === displayPlates.length - 3;

                                return (
                                    <div key={`${p.id}-${i}`} className={cn("transition-all duration-300", spinning && "motion-blur-text opacity-40")}>
                                        <div className={cn(
                                            isSelected && "relative group z-20 scale-110",
                                            (!isSelected || spinning) && "opacity-60 scale-90"
                                        )}>
                                            {isSelected && (
                                                <div className="absolute -inset-1 bg-tertiary blur-xl opacity-50 transition duration-1000"></div>
                                            )}

                                            <div className="relative">
                                                <CarPlate plate={p.plate} size={isSelected ? "lg" : "md"} active={isSelected} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                )}
            </div>

            <div className="w-full mt-auto pb-12 px-8 z-20">
                <button
                    onClick={() => setTriggerSpin(true)}
                    disabled={spinning || eligibleParticipants.length === 0}
                    className="w-full group relative flex flex-col items-center justify-center gap-2 py-8 bg-gradient-to-b from-primary to-primary-container rounded-sm shadow-[0_0_40px_rgba(255,172,82,0.3)] hover:scale-[0.98] transition-all duration-75 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Power className="w-10 h-10 text-on-primary-container" />
                    <span className="font-headline font-black text-3xl tracking-[0.2em] text-on-primary-container">SPIN</span>
                    <div className="absolute -bottom-2 w-full h-1 bg-white/30 blur-sm"></div>
                </button>
            </div>
        </section>
    );
};
