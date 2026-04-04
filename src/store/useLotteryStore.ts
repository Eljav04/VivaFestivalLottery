import { create } from 'zustand';

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
    triggerSpin: boolean;
    isInitialized: boolean;
    addParticipant: (p: Omit<Participant, 'id'>) => void;
    removeParticipant: (id: string) => void;
    addWinner: (winner: Participant) => void;
    setTriggerSpin: (val: boolean) => void;
    resetWinners: () => void;
    setInitialData: (participants: Participant[], winners: Participant[]) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function syncBackend(participants: Participant[], winners: Participant[]) {
    try {
        await fetch(`${API_URL}/api/fortune/wheel-items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ participants, winners })
        });
    } catch (error) {
        console.error('Failed to sync data with backend:', error);
    }
}

export const useLotteryStore = create<LotteryState>()((set) => ({
    participants: [],
    winners: [],
    triggerSpin: false,
    isInitialized: false,
    setInitialData: (participants, winners) => set({ participants, winners, isInitialized: true }),
    addParticipant: (p) =>
        set((state) => {
            const newState = {
                participants: [...state.participants, { ...p, id: Date.now().toString(), isWinner: false }],
            };
            syncBackend(newState.participants, state.winners);
            return newState;
        }),
    removeParticipant: (id) =>
        set((state) => {
            const newState = {
                participants: state.participants.filter((p) => p.id !== id),
            };
            syncBackend(newState.participants, state.winners);
            return newState;
        }),
    addWinner: (winner) =>
        set((state) => {
            const newState = {
                winners: [winner, ...state.winners],
                participants: state.participants.map(p => p.id === winner.id ? { ...p, isWinner: true } : p)
            };
            syncBackend(newState.participants, newState.winners);
            return newState;
        }),
    setTriggerSpin: (val: boolean) => set({ triggerSpin: val }),
    resetWinners: () =>
        set((state) => {
            const newState = {
                winners: [],
                participants: state.participants.map(p => ({ ...p, isWinner: false }))
            };
            syncBackend(newState.participants, newState.winners);
            return newState;
        }),
}));

export const initStore = async () => {
    try {
        const res = await fetch(`${API_URL}/api/fortune/wheel-items`);
        if (res.ok) {
            const data = await res.json();
            const participants = data?.participants || [];
            const winners = data?.winners || [];
            useLotteryStore.getState().setInitialData(participants, winners);
        } else {
            useLotteryStore.getState().setInitialData([], []);
        }
    } catch (error) {
        console.error('Failed to fetch data from backend:', error);
        useLotteryStore.getState().setInitialData([], []);
    }
};
