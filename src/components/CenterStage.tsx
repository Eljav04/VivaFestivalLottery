import React from 'react';

export const CenterStage: React.FC = () => {
    return (
        <section className="relative h-full flex flex-col justify-center items-center overflow-hidden border-x border-white/5">
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="relative z-10 text-center flex flex-col items-center px-12 top-[-40px]">
                <div className="mb-6 bg-cyan-400/10 px-4 py-1 rounded-full border border-cyan-400/20 backdrop-blur-md">
                    <span className="font-label text-xs font-bold text-cyan-400 tracking-widest uppercase">Live Broadcast Experience</span>
                </div>

                <h1 className="font-headline font-black text-8xl md:text-[12rem] tracking-tighter uppercase leading-[0.8] text-white relative">
                    <span className="relative z-10">VIVA</span><br />
                    <span className="relative z-10">FEST</span>
                    <div className="absolute inset-0 blur-[40px] bg-cyan-400/20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 blur-[80px] bg-cyan-500/10"></div>
                </h1>

                <div className="flex items-center gap-6 mt-4">
                    <div className="h-[1px] w-12 bg-white/20"></div>
                    <span className="font-headline font-bold text-3xl md:text-4xl text-orange-400 tracking-widest drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]">2026</span>
                    <div className="h-[1px] w-12 bg-white/20"></div>
                </div>

                <div className="mt-16 space-y-4">
                    <p className="font-body text-xl text-white/90 font-medium tracking-[0.2em] uppercase">BMW Club International</p>
                    <div className="flex items-center justify-center gap-10">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>
                            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Signal: Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-headline italic text-cyan-400 text-sm font-bold">TUNED</span>
                            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">For High Octane</span>
                        </div>
                    </div>
                </div>

                <div className="mt-20 px-12 py-6 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-sm relative shadow-2xl">
                    <p className="font-headline font-bold text-xs text-white/40 mb-3 tracking-[0.2em]">PRESENTED BY</p>
                    <span className="text-4xl font-black italic tracking-tighter text-white font-headline opacity-95">VIVA GROUP</span>
                </div>
            </div>
        </section>
    );
};
