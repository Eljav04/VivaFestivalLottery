import { useState } from 'react';
import { useLotteryStore } from '../store/useLotteryStore';
import { Power, UserPlus, List, Trash2, CheckCircle2 } from 'lucide-react';

const AdminPage = () => {
    const { participants, addParticipant, removeParticipant, setTriggerSpin, triggerSpin } = useLotteryStore();

    const [name, setName] = useState('');
    const [plate, setPlate] = useState('');
    const [phone, setPhone] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !plate.trim()) return;
        addParticipant({ name, plate: plate.toUpperCase(), phone });
        setName('');
        setPlate('');
        setPhone('');
    };

    return (
        <div className="bg-background text-on-background font-body min-h-screen selection:bg-primary selection:text-on-primary flex flex-col md:flex-row">
            {/* SideNavBar */}
            <aside className="w-full md:w-64 border-r border-[#484847]/15 bg-gradient-to-b from-[#1a1a1a] to-[#0e0e0e] flex flex-col pt-10 px-4 md:h-screen sticky top-0">
                <div className="px-2 py-4 flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-surface-container-highest rounded-sm flex items-center justify-center border border-outline-variant/20">
                        <span className="text-secondary text-sm font-bold">AZ</span>
                    </div>
                    <div>
                        <p className="text-xs font-headline font-black text-white leading-tight uppercase">FESTIVAL CONTROL</p>
                        <p className="text-[10px] font-label text-white/40 tracking-wider">VIVA FEST 2026</p>
                    </div>
                </div>

                <nav className="flex-1 font-headline font-bold tracking-tight space-y-2">
                    <a className="flex items-center gap-4 bg-[#00fc97]/10 text-[#00fc97] border-l-4 border-[#00fc97] py-4 px-4 translate-x-1 duration-200 cursor-pointer">
                        <List size={20} />
                        <span className="text-sm">PARTICIPANTS</span>
                    </a>
                </nav>

                <div className="py-6">
                    <button
                        onClick={() => setTriggerSpin(true)}
                        disabled={triggerSpin}
                        className="w-full bg-primary text-on-primary py-3 rounded-sm font-headline font-black text-xs tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all uppercase disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {triggerSpin ? "SPINNING..." : "FORCE SPIN"}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 max-w-7xl w-full mx-auto pb-20">
                <header className="mb-12">
                    <div className="flex items-baseline gap-4 mb-2">
                        <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tighter uppercase leading-none">
                            ADMIN <span className="text-primary">CORE</span>
                        </h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                    </div>
                    <p className="font-label text-xs tracking-widest text-outline uppercase opacity-60">System Registry & Lottery Management</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Section 1: Add Participant Form */}
                    <section className="lg:col-span-5 bg-surface-container border-l-4 border-primary p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 carbon-pattern opacity-10 -mr-16 -mt-16 rotate-45"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-8">
                                <UserPlus className="text-primary w-6 h-6" />
                                <h3 className="font-headline font-bold text-lg tracking-tight uppercase">Add Participant</h3>
                            </div>
                            <form className="space-y-6" onSubmit={handleAdd}>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Full Name</label>
                                    <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-variant border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body py-3 px-2 transition-all placeholder:text-outline/40 outline-none" placeholder="e.g. DOMINIC TORETTO" type="text" />
                                </div>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Car Plate Number (AZ)</label>
                                    <div className="relative">
                                        <input required value={plate} onChange={e => setPlate(e.target.value)} className="w-full bg-surface-variant border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-label text-lg tracking-widest py-3 px-2 transition-all placeholder:text-outline/40 outline-none" placeholder="99-AA-000" type="text" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-label text-[10px] tracking-widest text-on-surface-variant uppercase mb-2">Phone Number</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-surface-variant border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body py-3 px-2 transition-all placeholder:text-outline/40 outline-none" placeholder="+994 50 000 00 00" type="tel" />
                                </div>
                                <button type="submit" className="w-full mt-4 bg-gradient-to-b from-primary to-primary-container text-on-primary py-4 rounded-sm font-headline font-black text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(255,172,82,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                                    <Power className="w-5 h-5" />
                                    ADD NEW PARTICIPANT
                                </button>
                            </form>
                        </div>
                    </section>

                    {/* Section 2: Participants Table */}
                    <section className="lg:col-span-7 space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <List className="text-secondary w-6 h-6" />
                                <h3 className="font-headline font-bold text-lg tracking-tight uppercase">Live Registry</h3>
                            </div>
                            <span className="font-label text-[10px] bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase font-bold">{participants.length} Active Entries</span>
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {participants.length === 0 ? (
                                <div className="text-center py-10 opacity-50 uppercase tracking-widest text-sm">Registry is empty. Add participants.</div>
                            ) : (
                                [...participants].reverse().map(p => (
                                    <div key={p.id} className={`group flex items-center gap-4 bg-surface-container-high hover:bg-surface-variant px-4 py-3 transition-all border-l-2 shadow-lg relative ${p.isWinner ? 'border-secondary bg-surface-container-highest shadow-secondary/5' : 'border-secondary/40'}`}>
                                        {p.isWinner && (
                                            <div className="absolute top-0 right-0 p-1 px-2 bg-secondary text-on-secondary text-[8px] font-black uppercase tracking-tighter flex gap-1 items-center">
                                                <CheckCircle2 size={10} /> Verified Winner
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
                                            <button onClick={() => removeParticipant(p.id)} className="p-2 text-on-surface-variant hover:text-error transition-all rounded-sm cursor-pointer hover:bg-error/10">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
