import { RouletteGrid } from '../components/RouletteGrid';
import { CenterStage } from '../components/CenterStage';
import { WinnersList } from '../components/WinnersList';

const MainPage = () => {
    return (
        <div className="h-screen w-full grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr] overflow-hidden bg-background">
            <RouletteGrid />
            <CenterStage />
            <WinnersList />
        </div>
    );
};

export default MainPage;
