import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ContributionGraph } from 'react-native-chart-kit';

interface UsageData {
  date: string;
  count: number;
}

const ContributionComponent = () => {
  const [DataArray, setDataArray] = useState<UsageData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/UsageCount`, {
          body: JSON.stringify({ email: 'jason@gmail.com' }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (request.ok) {
          const data = await request.json();
          if (data.success) {
            const updatedDataArray: UsageData[] = data.message.map((item: any) => ({
              date: new Date(item.date).toISOString().split('T')[0],
              count: Number.parseInt(item.count),
            }));
            setDataArray((prevArray) => [...prevArray, ...updatedDataArray]);
          } else {
            console.log(data.message);
          }
        }
      } catch (error) {
        console.log('Error: ' + error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <ContributionGraph
        tooltipDataAttrs={() => ({})}
        values={DataArray}
        endDate={new Date()}
        numDays={118}
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
    </>
  );
};

export default ContributionComponent;
