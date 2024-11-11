import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export const UserComponent = ()=>{

  return (
    <>
    {/* single component start */}
<View className='flex flex-row justify-between items-center p-3  w-full'>
  <Text className='text-xl'>Username</Text>
  <Text className='text-center bg-green-600 text-white rounded-full w-7 text-lg h-7'>3</Text>
</View>
<View className='w-full h-px bg-gray-300 my-2' />
  {/* single component end */}
  </>
  );
}

export default function Home() {

  const getData = async()=>{
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
          console.log(data.totalCount);
        } else {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.log('Error: ' + error);
    }
  }

useEffect(()=>{
  getData();
},[]);

  return (
  <>
      <View className='w-full h-full px-5 pb-7 pt-14'>
  <Text className='text-center w-full text-2xl font-semibold pb-5'>Streak Winners </Text>
<View className='flex flex-col justify-start items-center w-full   h-auto overflow-scroll max-h-full rounded-xl shadow-black shadow-xl bg-white'>
  
<UserComponent />
<UserComponent />
<UserComponent />
<UserComponent />
<UserComponent />
<UserComponent />
</View>
      </View>
      </>
  );
}
