import { create } from "zustand";
import { getFromAsyncStorage, setToAsyncStorage } from "~/util/storage";

// Updated store
const useTotalCountStore = create((set: any, get: any) => ({
    totalCount: [], // Initialize empty array
  
    loadTotalCount: async () => {
      const storedCount = await getFromAsyncStorage('totalCount');
      const parsedCount = Array.isArray(storedCount) ? storedCount : [];
      set({ totalCount: parsedCount });
    },
  
    addToTotalCount: async (newCounts: any) => {
      const currentTotalCount = get().totalCount;
      const newTotalCount = [...currentTotalCount, ...newCounts]; // Spread operator to merge new counts
      set({ totalCount: newTotalCount });
      await setToAsyncStorage('totalCount', newTotalCount);
    },
  
    clearTotalCount: async () => {
      set({ totalCount: [] });
      await setToAsyncStorage('totalCount', []);
    }
  }));
  
  export default useTotalCountStore;
  
  