import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Participant {
    id: string;
    name: string;
    plate: string;
    phone: string;
    isWinner?: boolean;
}

interface LotteryState {
    participants: Participant[];
    winners: Participant[];
    addParticipant: (p: Omit<Participant, 'id'>) => void;
    removeParticipant: (id: string) => void;
    addWinner: (winner: Participant) => void;
    triggerSpin: boolean;
    setTriggerSpin: (val: boolean) => void;
    resetWinners: () => void;
}

export const useLotteryStore = create<LotteryState>()(
    persist(
        (set) => ({
            participants: [],
            winners: [],
            triggerSpin: false,
            addParticipant: (p) =>
                set((state) => ({
                    participants: [...state.participants, { ...p, id: Date.now().toString(), isWinner: false }],
                })),
            removeParticipant: (id) =>
                set((state) => ({
                    participants: state.participants.filter((p) => p.id !== id),
                })),
            addWinner: (winner) =>
                set((state) => ({
                    winners: [winner, ...state.winners],
                    participants: state.participants.map(p => p.id === winner.id ? { ...p, isWinner: true } : p)
                })),
            setTriggerSpin: (val: boolean) => set({ triggerSpin: val }),
            resetWinners: () =>
                set((state) => ({
                    winners: [],
                    participants: state.participants.map(p => ({ ...p, isWinner: false }))
                })),
        }),
        {
            name: 'viva-fest-lottery-storage',
        }
    )
);

// Basic cross-tab synchronization listener for zustand perist
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
        if (e.key === 'viva-fest-lottery-storage') {
            useLotteryStore.persist.rehydrate();
        }
    });
}
