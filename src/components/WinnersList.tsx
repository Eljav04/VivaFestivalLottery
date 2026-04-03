import React from 'react';
import { useLotteryStore } from '../store/useLotteryStore';
import { CarPlate } from './CarPlate';

export const WinnersList: React.FC = () => {
    const winners = useLotteryStore((state) => state.winners);

    return (
        <section className="h-full bg-slate-900/20 backdrop-blur-lg flex flex-col p-8 overflow-hidden">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="font-black font-sans text-2xl tracking-wide text-white uppercase">Seçilmiş Qaliblər</h2>
                </div>

                <div className="flex items-center gap-2 font-bold text-[11px] text-green-400 bg-cyan-400/10 px-2 py-1 rounded-sm tracking-widest uppercase">
                    <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>
                    CANLI
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {winners.length === 0 ? (
                    <div className="flex items-center justify-center h-full opacity-30">
                        <span className="font-label text-sm uppercase tracking-widest text-white/30">Hələlik qalib yoxdur</span>
                    </div>
                ) : (
                    winners.map((winner, idx) => {
                        const isLatest = idx === 0;

                        if (isLatest) {
                            return (
                                <div key={winner.id} className="relative group">
                                    <div className="absolute -inset-px bg-cyan-300 opacity-30 rounded-sm blur-xs shadow-[0_0_15px_rgba(34,211,238,0.3)] duration-75"></div>
                                    <div className="relative flex items-center justify-between bg-white/5 backdrop-blur-xl p-5 rounded-sm border border-cyan-400/40">
                                        <div className="flex items-center gap-2">
                                            <div className="drop-shadow-lg">
                                                <CarPlate plate={winner.plate} size="md" />
                                            </div>
                                            <div>
                                                <span className="block text-sm font-headline font-black text-white uppercase tracking-tight">{winner.name}</span>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={winner.id} className="flex items-center justify-between bg-white/5 backdrop-blur-md p-4 rounded-sm border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <CarPlate plate={winner.plate} size="sm" />
                                    <div>
                                        <span className="block text-xs font-headline font-bold text-white/70 group-hover:text-white uppercase tracking-wider">{winner.name}</span>
                                    </div>
                                </div>

                            </div>
                        );
                    })
                )}

                {winners.length > 0 && (
                    <div className="flex items-center justify-center py-6 mt-4 border-t border-white/5 opacity-30">
                        <span className="text-[8px] font-mono tracking-[0.5em] uppercase">TARİXÇƏNİN SONU</span>
                    </div>
                )}
            </div>

            <div className="pt-6 mt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-sm border border-white/5">
                    <span className="text-xs text-white/40 uppercase font-bold tracking-widest">QALİB SAYİ</span>
                    <span className="text-xs text-green-400 font-bold">{winners.length}</span>
                </div>
            </div>
        </section>
    );
};
