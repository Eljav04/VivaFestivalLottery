import React from 'react';
import { useLotteryStore } from '../store/useLotteryStore';
import { CarPlate } from './CarPlate';
import { Trophy } from 'lucide-react';


export const WinnersList: React.FC = () => {
    const winners = useLotteryStore((state) => state.winners);

    return (
        <section className="h-full bg-surface-container-low flex flex-col p-8 border-l border-outline-variant/15 overflow-hidden">
            <div className="flex justify-between items-end mb-8 border-b border-outline-variant/10 pb-4">
                <div>
                    <h2 className="font-headline font-bold text-2xl text-white tracking-tight">SELECTED WINNERS</h2>
                    <p className="font-body text-xs text-white/40 uppercase tracking-[0.2em]">Broadcast History</p>
                </div>
                <span className="font-mono text-xs text-secondary bg-secondary/10 px-2 py-1">LIVE REFRESH</span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {winners.length === 0 ? (
                    <div className="flex items-center justify-center h-full opacity-40">
                        <span className="font-label text-sm uppercase tracking-widest">No winners yet</span>
                    </div>
                ) : (
                    winners.map((winner, idx) => {
                        const isLatest = idx === 0;

                        if (isLatest) {
                            return (
                                <div key={winner.id} className="relative group">
                                    <div className="absolute -inset-0.5 bg-linear-to-r from-secondary to-tertiary rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative flex items-center justify-between bg-surface-container-high p-6 rounded-sm border-l-4 border-secondary glow-secondary">
                                        <div className="flex items-center gap-6">
                                            <CarPlate plate={winner.plate} size="md" />
                                            <div>
                                                <span className="block text-sm font-headline font-bold text-white uppercase">{winner.name}</span>
                                                <span className="block text-[10px] text-white/40 font-mono">LOCAL CONFIRMED</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-secondary mb-1">JACKPOT</span>
                                            <Trophy className="text-secondary w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={winner.id} className="flex items-center justify-between bg-surface-container p-4 rounded-sm hover:bg-surface-container-high transition-all border-l-2 border-white/10 group">
                                <div className="flex items-center gap-4">
                                    <CarPlate plate={winner.plate} size="sm" />
                                    <div>
                                        <span className="block text-sm font-headline font-bold text-white/80 group-hover:text-white uppercase">{winner.name}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-white/40 uppercase">Confirmed</span>
                            </div>
                        );
                    })
                )}

                {winners.length > 0 && (
                    <div className="flex items-center justify-center py-6 border-t border-white/5 opacity-40 mt-8">
                        <span className="text-[10px] font-mono tracking-[0.4em] uppercase">End of History Buffer</span>
                    </div>
                )}
            </div>
        </section>
    );
};
