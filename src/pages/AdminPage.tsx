import { useState } from 'react';
import { useLotteryStore } from '../store/useLotteryStore';
import { Power, UserPlus, List, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

const AdminPage = () => {
    const { participants, addParticipant, removeParticipant, setTriggerSpin, triggerSpin, resetWinners } = useLotteryStore();

    const [name, setName] = useState('');
    const [plate, setPlate] = useState('');
    const [phone, setPhone] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', onConfirm: () => { } });

    const openConfirmModal = (title: string, message: string, onConfirm: () => void) => {
        setModalConfig({ title, message, onConfirm });
        setIsModalOpen(true);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !plate.trim()) return;
        addParticipant({ name, plate: plate.toUpperCase(), phone });
        setName('');
        setPlate('');
        setPhone('');
    };

    return (
        <div className="bg-background text-on-background font-body min-h-screen selection:bg-primary selection:text-on-primary">
            {/* Main Content */}
            <main className="p-4 md:p-10 max-w-7xl w-full mx-auto pb-20">
                <header className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
                        <div className="flex items-baseline gap-4 flex-1">
                            <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter uppercase leading-none">
                                ADMİN <span className="text-primary">PANELİ</span>
                            </h2>
                            <div className="h-[2px] flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
                        </div>

                        <button
                            onClick={() => setTriggerSpin(true)}
                            disabled={triggerSpin}
                            className="bg-primary text-on-primary px-8 py-3 rounded-sm font-headline font-black text-xs tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {triggerSpin ? "FIRLANIR..." : "MƏCBURİ FIRLAT"}
                        </button>
                    </div>
                    <p className="font-label text-xs tracking-widest text-outline uppercase opacity-60">Sistem Qeydiyyatı və Lotereya İdarəedilməsi</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Section 1: Add Participant Form */}
                    <section className="lg:col-span-5 bg-surface-container border-l-4 border-primary p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 carbon-pattern opacity-10 -mr-16 -mt-16 rotate-45"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-8">
                                <UserPlus className="text-primary w-6 h-6" />
                                <h3 className="font-headline font-bold text-lg tracking-tight uppercase">İştirakçı Əlavə Et</h3>
                            </div>
                            <form className="space-y-6" onSubmit={handleAdd}>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Ad Soyad</label>
                                    <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-variant border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body py-3 px-2 transition-all placeholder:text-outline/40 outline-none" placeholder="Məsələn: DOMINIC TORETTO" type="text" />
                                </div>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Qeydiyyat Nişanı (AZ)</label>
                                    <div className="relative">
                                        <input required value={plate} onChange={e => setPlate(e.target.value)} className="w-full bg-surface-variant border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-label text-lg tracking-widest py-3 px-2 transition-all placeholder:text-outline/40 outline-none" placeholder="99-AA-000" type="text" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Telefon Nömrəsi</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-surface-variant border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body py-3 px-2 transition-all placeholder:text-outline/40 outline-none" placeholder="+994 50 000 00 00" type="tel" />
                                </div>
                                <button type="submit" className="w-full mt-4 bg-linear-to-b from-primary to-primary-container text-on-primary py-4 rounded-sm font-headline font-black text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(255,172,82,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                    <Power className="w-5 h-5" />
                                    ƏLAVƏ ET
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Section 2: Participants Table */}
                    <section className="lg:col-span-7 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <List className="text-secondary w-6 h-6" />
                                <h3 className="font-headline font-bold text-lg tracking-tight uppercase">Canlı Siyahı</h3>
                            </div>
                            <span className="font-label text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase font-bold">{participants.length} Aktiv Qeydiyyat</span>
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {participants.length === 0 ? (
                                <div className="text-center py-10 opacity-50 uppercase tracking-widest text-sm">Siyahı boşdur. İştirakçıları əlavə edin.</div>
                            ) : (
                                [...participants].reverse().map(p => (
                                    <div key={p.id} className={`group flex items-center gap-4 bg-surface-container-high hover:bg-surface-variant px-4 py-3 transition-all border-l-2 shadow-lg relative ${p.isWinner ? 'border-secondary bg-surface-container-highest shadow-secondary/5' : 'border-secondary/40'}`}>
                                        {p.isWinner && (
                                            <div className="absolute top-0 right-0 p-1 px-2 bg-secondary text-on-secondary text-[9px] font-black uppercase tracking-tighter flex gap-1 items-center">
                                                <CheckCircle2 size={10} /> Qalib
                                            </div>
                                        )}
                                        <div className="flex-1 mt-1">
                                            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-tight">{p.name}</h4>
                                            <p className="font-body text-xs text-on-surface-variant">{p.phone}</p>
                                        </div>
                                        <div className="font-label text-sm font-bold tracking-widest text-tertiary bg-tertiary/10 px-4 py-2 rounded-sm border border-tertiary/20">
                                            {p.plate}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openConfirmModal("DİQQƏT", `${p.name} iştirakçısını silmək istədiyinizə əminsiniz?`, () => removeParticipant(p.id))}
                                                className="p-2 text-on-surface-variant hover:text-error transition-all rounded-sm cursor-pointer hover:bg-error/10"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {participants.some(p => p.isWinner) && (
                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={() => openConfirmModal("DİQQƏT", "Bütün qalibləri silmək istədiyinizə əminsiniz?", resetWinners)}
                                    className="flex items-center gap-2 text-xs font-headline font-black  hover:text-error transition-all uppercase tracking-widest bg-red-900 text-red-300 px-4 py-2 rounded-sm border border-outline/10 hover:border-error/20"
                                >
                                    <RotateCcw size={14} />
                                    Qalibləri Sıfırla
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={modalConfig.onConfirm}
                title={modalConfig.title}
                message={modalConfig.message}
            />
        </div>
    );
};

export default AdminPage;
