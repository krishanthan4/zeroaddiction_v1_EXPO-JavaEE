import useTotalCountStore from "~/store/totalCountStore";

interface UsageData {
  date: string;
  count: number;
}

export const setToDatabase = async (newDailyUsage: number, email: string) => {
  try {
    console.log("updateCounts"+newDailyUsage, email);
    const { loadTotalCount, addToTotalCount } = useTotalCountStore.getState();
    const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/UpdateCount`, {
      body: JSON.stringify({ email: email, count: newDailyUsage }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (request.ok) {
      const data = await request.json();
      if (data.success) {
        console.log("Data updated successfully");
        if (data.message === "NoNeedToChange") {
          // No update needed, nothing to do here
        } else {
          await loadTotalCount();
          const existingData: UsageData[] = useTotalCountStore.getState().totalCount;
          const updatedData = [
            ...existingData,
            { date: new Date().toISOString().slice(0, 10), count: newDailyUsage }
          ];
          await addToTotalCount(updatedData);
        }
      } else {
        console.log(data.message);
      }
    }
  } catch (error) {
    console.log("Error in UpdateCount:", error);
  }
};
