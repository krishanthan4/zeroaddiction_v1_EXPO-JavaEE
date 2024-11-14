import { getFromAsyncStorage, setToAsyncStorage } from "./storage";

export const setToDatabase = (newDailyUsage: number, email: String) => {
  const setData = async () => {
    try {
      const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/UpdateCount`, {
        body: JSON.stringify({ email: email, count: newDailyUsage }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (request.ok) {
        const data = await request.json();
        if (data.success) {
          console.log("Data updated successfully");
          const existingDataStr = await getFromAsyncStorage("totalCount");
          const existingData = existingDataStr ? existingDataStr.totalCount : [];
          // console.log(existingData);
          const updatedData = [...existingData, { date: new Date().toISOString().slice(0, 10), count: newDailyUsage }];
          await setToAsyncStorage("totalCount", { totalCount: updatedData });
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log("Error UpdateCount : " + error);
    }
  };
  
  setData();
};
