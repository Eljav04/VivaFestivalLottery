import { create } from 'zustand';

export interface Participant {
    id: number;
    name: string;
    plate: string;
    phone: string;
    isWinner?: boolean;
}

interface LotteryState {
    participants: Participant[];
    winners: Participant[];
    triggerSpin: boolean;
    isInitialized: boolean;
    addParticipant: (p: Omit<Participant, 'id'>) => Promise<void>;
    removeParticipant: (id: number) => Promise<void>;
    addWinner: (winner: Participant) => Promise<void>;
    setTriggerSpin: (val: boolean) => void;
    resetWinners: () => Promise<void>;
    fetchParticipants: () => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useLotteryStore = create<LotteryState>()((set, get) => ({
    participants: [],
    winners: [],
    triggerSpin: false,
    isInitialized: false,
    fetchParticipants: async () => {
        try {
            const res = await fetch(`${API_URL}/api/fortune/lottery-items`);
            if (res.ok) {
                const data = await res.json();
                const items: Participant[] = Array.isArray(data) ? data : (data?.data || data?.items || data?.participants || []);
                const winners = items.filter(i => i.isWinner);
                set({ participants: items, winners, isInitialized: true });
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    },
    addParticipant: async (p) => {
        try {
            const res = await fetch(`${API_URL}/api/fortune/lottery-items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
            });
            if (res.ok) {
                await get().fetchParticipants();
            }
        } catch (error) {
            console.error('Failed to add participant:', error);
        }
    },
    removeParticipant: async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/fortune/lottery-items/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                await get().fetchParticipants();
            }
        } catch (error) {
            console.error('Failed to delete participant:', error);
        }
    },
    addWinner: async (winner) => {
        try {
            const res = await fetch(`${API_URL}/api/fortune/lottery-items/set-winner/${winner.id}`, {
                method: 'POST'
            });
            if (res.ok) {
                await get().fetchParticipants();
            }
        } catch (error) {
            console.error('Failed to set winner:', error);
        }
    },
    setTriggerSpin: (val: boolean) => set({ triggerSpin: val }),
    resetWinners: async () => {
        try {
            const res = await fetch(`${API_URL}/api/fortune/lottery-items/reset`, {
                method: 'POST'
            });
            if (res.ok) {
                await get().fetchParticipants();
            }
        } catch (error) {
            console.error('Failed to reset winners:', error);
        }
    },
}));

export const initStore = async () => {
    await useLotteryStore.getState().fetchParticipants();
};
