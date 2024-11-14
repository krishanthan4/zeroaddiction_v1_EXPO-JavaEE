import {create} from 'zustand';

interface RefreshState {
    isRefresh: boolean;
    setRefresh: (status: boolean) => void;
}

const useRefreshStore = create<RefreshState>((set) => ({
    isRefresh: false,
    setRefresh: (status: boolean) => set({ isRefresh: status }),
}));

export default useRefreshStore;