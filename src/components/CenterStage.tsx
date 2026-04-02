import React from 'react';

export const CenterStage: React.FC = () => {
    return (
        <section className="relative h-full flex flex-col justify-center items-center overflow-hidden border-r border-outline-variant/15">
            {/* Background Visual */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc_PUqoFBSdKMEP7XhH3KwarywGTvC2XrTTkGVj2Zm1TgxQqLOJ3NH2bXPQ7t54itIWQbwJ-KoLGan8z7joFNg_NKFnxP3QCi9oyGtUE_c4gxFeLPMoJ9W2xZUfAG3GHuVTlAvyQgSdXzVwpJ0A5dZpiHHnotiTvqXuRXIyAi1WQDF-XdtdgLD_br7ovLj-vQFTZPKZ0XemU72yXFay9LX_9CwUaXSSYY3Dyx8hzcUpQI0dKxU9VyODx5cw0aSG_u-mpgbk0-XzXc"
                    alt="Cinematic car festival"
                    className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent opacity-80"></div>
            </div>

            <div className="relative z-10 text-center flex flex-col items-center px-12">
                <div className="mb-2 bg-secondary/10 px-4 py-1 rounded-full border border-secondary/20 backdrop-blur-md">
                    <span className="font-label text-xs font-bold text-secondary tracking-widest uppercase">Live Broadcast Experience</span>
                </div>
                <h1 className="font-headline font-black text-8xl md:text-[10rem] tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
                    VIVA<br />FEST
                </h1>
                <div className="flex items-center gap-4 mt-4">
                    <div className="h-[1px] w-12 bg-outline-variant"></div>
                    <span className="font-headline font-bold text-3xl text-primary tracking-tight">2026</span>
                    <div className="h-[1px] w-12 bg-outline-variant"></div>
                </div>

                <div className="mt-12 space-y-2">
                    <p className="font-body text-xl text-white/80 font-light tracking-wide uppercase">BMW Club International</p>
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Signal: Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Fallback to text icon since we use lucide */}
                            <span className="text-tertiary text-sm italic font-bold">TUNED</span>
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">For High Octane</span>
                        </div>
                    </div>
                </div>

                <div className="mt-24 p-8 glass-panel rounded-lg border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tertiary to-transparent opacity-50"></div>
                    <p className="font-headline font-bold text-lg text-white/60 mb-2">PRESENTED BY</p>
                    <span className="text-4xl font-black italic tracking-tighter text-white font-headline opacity-90">VIVA GROUP</span>
                </div>
            </div>
        </section>
    );
};
