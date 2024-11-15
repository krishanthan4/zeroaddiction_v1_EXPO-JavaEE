import React, { useState, useEffect } from 'react';
import { Dimensions, Text } from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import useRefreshStore from '~/store/refreshStore';
import useTotalCountStore from '~/store/totalCountStore';
import { getFromAsyncStorage } from '~/util/storage';

interface UsageData {
  date: string;
  count: number;
}

const ContributionComponent = () => {
  const [dataArray, setDataArray] = useState<UsageData[]>([]);
  const { loadTotalCount, addToTotalCount } = useTotalCountStore();
  const {isRefresh} = useRefreshStore();

  const mainFunction = async (): Promise<void> => {
    try {
        const user= await getFromAsyncStorage("user");
        if(user && user.username){
          const email = user.email;
         const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/UsageCount`, {
          body: JSON.stringify({ email: email}),
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.message)) {
            await addToTotalCount(data.message);
            const updatedTotalCount = useTotalCountStore.getState().totalCount;
            const updatedDataArray: UsageData[] = updatedTotalCount
              .filter((item: any) => !isNaN(new Date(item.date).getTime())) // Filter out invalid dates
              .map((item: any) => ({
                date: new Date(item.date).toISOString().split('T')[0], // Keep only valid dates
                count: Number.parseInt(item.count), // Convert count to number
              }));

            setDataArray(updatedDataArray); // Update state
          } else {
            console.log('Error in API data:', data.message);
          }
        } else {
          console.log('API response error:', response.status);
        }}
       
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
      mainFunction();
  }, [loadTotalCount, addToTotalCount]);
  if (isRefresh) {
    mainFunction();
  }
  // console.log('Rendered dataArray:', dataArray);

  return (
    <>
      {dataArray.length === 0 ? (
        <Text>Loading data...</Text>
      ) : (
        <ContributionGraph
          tooltipDataAttrs={() => ({})}
          values={dataArray}
          endDate={new Date()}
          numDays={94}
          width={Dimensions.get('window').width - 20}
          height={Dimensions.get('window').height / 3}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#f3fff2',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(5, 140, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      )}
    </>
  );
};

export default ContributionComponent;

