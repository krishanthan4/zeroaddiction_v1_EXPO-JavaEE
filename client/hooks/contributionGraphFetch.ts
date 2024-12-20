import useTotalCountStore from "~/store/totalCountStore";
import { useEffect, useState } from "react";
import { getFromAsyncStorage, setToAsyncStorage } from '~/util/storage';


interface UsageData {
    date: string;
    count: number;
}

type MainFunctionProps = {
    setDataArray: React.Dispatch<React.SetStateAction<UsageData[]>>;
}

export const mainFunction = async (
    { setDataArray }: MainFunctionProps
): Promise<void> => {

    const { addToTotalCount } = useTotalCountStore();

    try {

        const user= await getFromAsyncStorage("user");
        if(user && user.username){
          const email = user.email;
        
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/UsageCount`, {
            body: JSON.stringify({ email: email }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success && Array.isArray(data.message)) {
                await addToTotalCount(data.message);
                const updatedTotalCount = useTotalCountStore.getState().totalCount;
                
                // Filtering and mapping the data with type safety
                const updatedDataArray: UsageData[] = updatedTotalCount
                    .filter((item: { date: string, count: string }) => !isNaN(new Date(item.date).getTime())) // Filter out invalid dates
                    .map((item: { date: string, count: string }) => ({
                        date: new Date(item.date).toISOString().split('T')[0], // Keep only valid dates
                        count: Number.isNaN(Number(item.count)) ? 0 : Number(item.count), // Safely parse count
                    }));

                setDataArray(updatedDataArray); // Update state with filtered and mapped data
            } else {
                console.error('Error in API data:', data.message);
            }
        } else {
            console.error('API response error:', response.status);
        }}
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
