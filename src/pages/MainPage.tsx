import { RouletteGrid } from '../components/RouletteGrid';
import { CenterStage } from '../components/CenterStage';
import { WinnersList } from '../components/WinnersList';

const MainPage = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#0a0f1a]">
            {/* Global Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src="../public/main_bg.jpg"
                    alt="background"
                    className="w-full h-full object-cover scale-110 blur-lg opacity-50"
                />
            </div>
            {/* Top Left Branding Overlay */}
            <div className="absolute top-6 left-8 z-50 pointer-events-none hidden md:block">
                <span className="font-headline font-black italic text-xl tracking-tighter text-orange-400 opacity-80 uppercase">
                    VIVA FEST 2026
                </span>
            </div>
            {/* Main Content Grid */}
            <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr]">
                <RouletteGrid />
                <CenterStage />
                <WinnersList />
            </div>
        </div>
    );
};

export default MainPage;
