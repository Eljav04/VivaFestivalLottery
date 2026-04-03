import React from 'react';

export const CenterStage: React.FC = () => {
    return (
        <section className="relative h-full flex flex-col justify-center items-center overflow-hidden border-x border-white/5">
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="relative z-10 text-center flex flex-col items-center px-12">
                <h1 className="font-headline font-black text-[9rem] tracking-tighter uppercase leading-none text-white relative">
                    <span className="relative tracking-wide z-10">VIVA</span><br />
                    <span className="relative z-10 tracking-wide">FEST</span>
                    <div className="absolute inset-0 blur-2xl bg-cyan-400/20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 blur-3xl bg-cyan-500/10"></div>
                </h1>

                <div className="flex items-center gap-6 mt-4">
                    <div className="h-px w-12 bg-white/20"></div>
                    <span className="font-headline font-bold text-3xl md:text-4xl text-orange-400 tracking-widest drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]">2026</span>
                    <div className="h-px w-12 bg-white/20"></div>
                </div>

                <div className="mt-10 space-y-4">
                    <p className="font-body text-xl text-white/90 font-medium tracking-[0.2em] uppercase">Motorları işə sal, BMW ailəsi toplanır!</p>
                    <div className="flex items-center justify-center gap-10">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse"></span>
                            <span className="text-sm font-mono text-white/50 uppercase tracking-widest">Sistem: Qaydasında</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-headline italic text-orange-400 text-base font-bold">YAĞ</span>
                            <span className="text-base font-mono text-white/50 uppercase tracking-widest">YENİ DƏYİŞİLİB</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 px-16 py-6 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl relative shadow-2xl">
                    <p className="font-headline font-bold  text-sm text-white/80 mb-3 tracking-[0.2em]">TƏRƏFDAŞLAR</p>
                    <div className='flex flex-col gap-2'>
                        <img className='h-40 object-contain' src="viva.png" />
                        <img className='h-40 object-contain' src="bmw_club.png" />
                    </div>

                </div>
            </div>
        </section>
    );
};
