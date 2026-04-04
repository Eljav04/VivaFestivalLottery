import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AdminPage from './pages/AdminPage';
import { useLotteryStore, initStore } from './store/useLotteryStore';

function App() {
  const isInitialized = useLotteryStore(state => state.isInitialized);

  useEffect(() => {
    initStore();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center text-white/50 font-headline text-lg uppercase tracking-widest">
        Yüklənir...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
