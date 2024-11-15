import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useRefreshStore from '~/store/refreshStore';


export const UserComponent = ({ Count, UserName, isFirst }: { Count: number, UserName: string, isFirst: boolean }) => {
  return (
    <>
      <View
        className='flex flex-row justify-between items-center p-3 w-full shadow-black shadow-xl bg-white'>

        <Text className='text-xl'>{UserName}</Text>
       <View className='flex flex-row gap-1 justify-center items-center'>
       <Text className='text-xl'>{isFirst ? '👑': ''}</Text>
       <Text className={`text-center bg-${isFirst ? 'red' : 'green'}-600 text-white rounded-full w-7 text-lg h-7`}>{Count}</Text>
       </View>
      </View>

      <View className='w-full h-px bg-gray-300 ' />
      {/* single component end */}
    </>
  );
}

export default function Home() {
  const [streakWinners, setStreakWinners] = useState<{ streakEndDate: string, streakStartDate: string, totalCount: string, username: string }[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  const getData = async () => {
    try {
      const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/LeaderBoard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (request.ok) {
        const data = await request.json();
        if (data.success) {
          // Sort the data by totalCount (from highest to lowest)
          const sortedData = data.message.sort((a:any, b:any) => parseInt(b.totalCount) - parseInt(a.totalCount));
          setStreakWinners(sortedData);
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{width:'100%',height:'100%'}}
    refreshControl={
       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
     }>
    <View className='w-full h-full px-5 pb-7 pt-14'>
      <Text className='text-center w-full text-2xl font-semibold pb-5'>Streak Winners</Text>
      <View className='flex-1 w-full rounded-xl overflow-hidden'>
        <FlashList
          data={streakWinners}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <UserComponent 
              Count={Number.parseInt(item.totalCount)} 
              UserName={item.username} 
              isFirst={index === 0}  // Highlight the first item
            />
          )}
          estimatedItemSize={50}
          className='flex-1'
/>
      </View>
    </View>
    </ScrollView>
  );
}
