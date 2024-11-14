import { useEffect, useState } from 'react';
import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getFromAsyncStorage, setToAsyncStorage } from '~/util/storage';

interface UsageData {
  date: string;
  count: number;
}

const ContributionComponent = () => {
  const [dataArray, setDataArray] = useState<UsageData[]>([]);

  useEffect(() => {
    const mainFunction = async () => {
      try {
        const existingData = await getFromAsyncStorage('totalCount');
        // console.log(existingData);
        // if (existingData !== null || existingData !== undefined) {
          // setDataArray(existingData);
        // } else {
          // Fetch data if no existing data is found
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/UsageCount`, {
            body: JSON.stringify({ email: 'jason@gmail.com' }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              await setToAsyncStorage('totalCount', {totalCount:data.message});
              const totalCountFromAsync = await getFromAsyncStorage('totalCount');
              // console.log(data.message);
              if (totalCountFromAsync.totalCount === null || totalCountFromAsync.totalCount === undefined) {
                console.log('Error fetching data');
                return;
              }
              const updatedDataArray: UsageData[] = totalCountFromAsync.totalCount.map((item: any) => ({
                date: new Date(item.date).toISOString().split('T')[0],
                count: Number.parseInt(item.count),
              }));
              setDataArray(updatedDataArray);

              // Store the updated data in AsyncStorage
            } else {
              console.log(data.message);
            }
          // }
        }
      } catch (error) {
        console.log('Error fetching data: ' + error);
      }
    };

    mainFunction();
  }, []);

  return (
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
  );
};

export default ContributionComponent;
