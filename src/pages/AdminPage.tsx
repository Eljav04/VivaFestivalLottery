import { useState } from 'react';
import { useLotteryStore } from '../store/useLotteryStore';
import { Power, UserPlus, List, Trash2, CheckCircle2, RotateCcw, Smartphone, User } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    name: z.string().min(1, "Ad və soyad daxil edilməlidir"),
    phone: z.string().min(1, "Telefon nömrəsi daxil edilməlidir"),
    plate: z.string().regex(/^\d{2}\s[A-Z]{2}\s\d{3}$/, "Nömrə nişanı düzgün formatda deyil (Məsələn: 99 AA 111)"),
});

type FormData = z.infer<typeof schema>;

const AdminPage = () => {
    const { participants, addParticipant, removeParticipant, setTriggerSpin, triggerSpin, resetWinners } = useLotteryStore();

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            phone: '',
            plate: ''
        }
    });

    const plateValue = watch('plate');

    const formatPlate = (val: string) => {
        const cleaned = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2);
        }
        if (cleaned.length > 4) {
            formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2, 4) + ' ' + cleaned.slice(4, 7);
        }
        return formatted.slice(0, 9);
    };

    const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPlate(e.target.value);
        setValue('plate', formatted, { shouldValidate: true });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', onConfirm: () => { } });

    const openConfirmModal = (title: string, message: string, onConfirm: () => void) => {
        setModalConfig({ title, message, onConfirm });
        setIsModalOpen(true);
    };

    const onAdd = (data: FormData) => {
        addParticipant({ name: data.name, plate: data.plate, phone: data.phone });
        reset();
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
                            <form className="space-y-6" onSubmit={handleSubmit(onAdd)}>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Ad Soyad</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors">
                                            <User size={16} />
                                        </div>
                                        <input
                                            {...register('name')}
                                            className={`w-full bg-surface-variant/50 border-0 border-b-2 ${errors.name ? 'border-error' : 'border-outline group-focus-within:border-primary'} text-on-surface font-body py-3 pl-12 pr-4 transition-all placeholder:text-outline/40 outline-none rounded-t-lg backdrop-blur-sm`}
                                            placeholder="Məsələn: ELGÜN MƏMMƏDOV"
                                            type="text"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-[10px] text-error font-medium uppercase tracking-wider">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Telefon Nömrəsi</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors">
                                            <Smartphone size={16} />
                                        </div>
                                        <input
                                            {...register('phone')}
                                            className={`w-full bg-surface-variant/50 border-0 border-b-2 ${errors.phone ? 'border-error' : 'border-outline group-focus-within:border-primary'} text-on-surface font-body py-3 pl-12 pr-4 transition-all placeholder:text-outline/40 outline-none rounded-t-lg backdrop-blur-sm`}
                                            placeholder="+994 50 000 00 00"
                                            type="tel"
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-1 text-[10px] text-error font-medium uppercase tracking-wider">{errors.phone.message}</p>}
                                </div>

                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Qeydiyyat Nişanı (AZ)</label>
                                    <div className={`relative flex items-stretch h-20 rounded-xl overflow-hidden border-2 transition-all ${errors.plate ? 'border-error bg-error/5 shadow-[0_0_15px_rgba(255,107,107,0.2)]' : 'border-[#1a1a1a] bg-[#f4be08] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:scale-[1.01]'}`}>
                                        {/* AZ Side Strip */}
                                        <div className="w-16 bg-blue-700 flex flex-col items-center justify-center gap-1 border-r-2 border-[#1a1a1a]/20">
                                            <div className="w-8 h-4 overflow-hidden rounded-[1px] shadow-sm">
                                                <img src="/az_flag.png" alt="AZ Flag" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-white font-black text-xs tracking-tighter">AZ</span>
                                        </div>

                                        {/* Input Area */}
                                        <div className="flex-1 flex items-center px-4 relative">
                                            <input
                                                value={plateValue}
                                                onChange={handlePlateChange}
                                                className="w-full bg-transparent border-none focus:ring-0 text-[#1a1a1a] font-headline font-black text-4xl tracking-[0.1em] py-0 outline-none placeholder:text-[#1a1a1a]/20 uppercase"
                                                placeholder="99 AA 000"
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    {errors.plate && <p className="mt-1 text-[10px] text-error font-medium uppercase tracking-wider">{errors.plate.message}</p>}
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
