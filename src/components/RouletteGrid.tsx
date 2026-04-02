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

    useEffect(() => {
        if (!spinning && eligibleParticipants.length > 0 && displayPlates.length === 0) {
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

            const track: Participant[] = [];
            const trackLength = 40;

            for (let i = 0; i < trackLength; i++) {
                track.push(eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)]);
            }

            track.push(chosenWinner);
            track.push(eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)] || chosenWinner);
            track.push(eligibleParticipants[Math.floor(Math.random() * eligibleParticipants.length)] || chosenWinner);

            setDisplayPlates(track);

            const itemHeight = 112;
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
        <section className="relative h-full flex flex-col items-center justify-center p-6 border-r border-white/5 bg-slate-900/20 backdrop-blur-md overflow-hidden">
            <div className="w-full flex-1 flex flex-col justify-center items-center gap-4 py-12 relative overflow-hidden">
                {/* Viewport Shadows */}
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#0a0f1a]/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0a0f1a]/80 to-transparent z-10 pointer-events-none"></div>

                {eligibleParticipants.length < 1 && displayPlates.length === 0 ? (
                    <div className="text-white/40 font-headline uppercase tracking-widest text-sm z-20">No eligible participants</div>
                ) : (
                    <div className="relative w-full h-[600px] overflow-hidden flex justify-center items-center">
                        <motion.div
                            className="flex flex-col items-center gap-6 pt-[200px]"
                            animate={controls}
                            initial={{ y: 0 }}
                        >
                            {displayPlates.map((p, i) => {
                                const isSelected = !spinning && winner?.id === p.id && i === displayPlates.length - 3;

                                return (
                                    <div key={`${p.id}-${i}`} className={cn("transition-all duration-300", spinning && "opacity-40 blur-[1px]")}>
                                        <div className={cn(
                                            "transition-all duration-500",
                                            isSelected ? "relative z-20 scale-125 brightness-110" : "opacity-40 scale-90"
                                        )}>
                                            <div className={cn(
                                                "relative transition-all duration-500 rounded-sm block",
                                                isSelected ? "shadow-[0_0_40px_rgba(255,255,255,0.2)]" : "opacity-80 grayscale-[30%]"
                                            )}>
                                                {isSelected && (
                                                    <div className="absolute -inset-2 bg-red-600/20 blur-xl opacity-100 z-0"></div>
                                                )}
                                                <div className="relative z-10">
                                                    <CarPlate
                                                        plate={p.plate}
                                                        size={isSelected ? "lg" : "md"}
                                                        active={isSelected}
                                                    />
                                                </div>
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
                    className="w-full group relative flex flex-col items-center justify-center gap-2 py-6 bg-gradient-to-b from-orange-500 to-orange-700 rounded-sm shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:scale-[0.98] transition-all duration-100 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Power className="w-10 h-10 text-white drop-shadow-md" />
                    <span className="font-headline font-black text-3xl tracking-[0.2em] text-white drop-shadow-md">SPIN</span>
                </button>
            </div>
        </section>
    );
};
