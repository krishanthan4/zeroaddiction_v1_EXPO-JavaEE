import ContributionComponent from '~/components/ContributionGraph';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { getFromAsyncStorage, setToAsyncStorage } from '../../util/storage';
import { setToDatabase } from '~/util/updateCounts';
import { fetchArduinoData } from '~/hooks/ArduinoFetch';
import { useTimer } from '~/util/indexFunctions';
import useRefreshStore from '~/store/refreshStore';

const App = () => {
  const [phoneStatus, setPhoneStatus] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const [dailyUsage, setDailyUsage] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const usageTimeRef = useRef(0);
  const startTimeRef = useRef(0);
  const { startTimer } = useTimer({ timerRef, usageTimeRef, startTimeRef });
  const [refreshing, setRefreshing] = React.useState(false);
const {setRefresh} = useRefreshStore();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefresh(false);
    }, 500);
  }, []);
  // Function to stop the timer
  // const Hour = 3600; // One hour = 3600 seconds
  const Hour = 15; 
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const elapsedTime = usageTimeRef.current;
    const newDailyUsage = dailyUsage + elapsedTime;
    setDailyUsage(newDailyUsage);
    usageTimeRef.current = 0;

    // Update database based on cumulative usage
    if (newDailyUsage >= 20 * Hour) {
      setToDatabase(5, "jason@gmail.com");
    } else if (newDailyUsage >= 16 * Hour && newDailyUsage < 20 * Hour) {
      setToDatabase(4, "jason@gmail.com");
    } else if (newDailyUsage >= 12 * Hour && newDailyUsage < 16 * Hour) {
      setToDatabase(3, "jason@gmail.com");
    } else if (newDailyUsage >= 8 * Hour && newDailyUsage < 12 * Hour) {
      setToDatabase(2, "jason@gmail.com");
    } else if (newDailyUsage >= 4 * Hour && newDailyUsage < 8 * Hour) {
      setToDatabase(1, "jason@gmail.com");
    }
    setToAsyncStorage("dailyUsage",{ dailyUsage: newDailyUsage });
  };

const getArduinoData = async () => {
  await fetchArduinoData({ setPhoneStatus, setDeviceStatus });
};
// Function to load daily usage from AsyncStorage on app load
  const loadDailyUsage = async () => {
    const storedUsage = await getFromAsyncStorage("dailyUsage");
    if (storedUsage) {
      try {
        setDailyUsage(storedUsage.dailyUsage ?? 0);
      } catch (error) {
        console.error('Error parsing daily usage:', error);
        setDailyUsage(0);
      }
    }
  };
  // Log the daily usage at 11:59 PM and reset for the next day
  useEffect(() => {
    const now = new Date();
    const timeToMidnight = new Date(now.getFullYear(),now.getMonth(),now.getDate() + 1,0,0,0).getTime() - now.getTime();

    const midnightTimeout = setTimeout(async () => {
      console.log(`Total usage today: ${Math.floor(dailyUsage)} seconds`);
      await setToAsyncStorage("dailyUsage",{ dailyUsage: 0 });
      setDailyUsage( 0);
    }, timeToMidnight);
    return () => clearTimeout(midnightTimeout); // Clean up timer on unmount
  }, [dailyUsage]);
  // Initial data load and Arduino polling
  useEffect(() => {
    loadDailyUsage();
    const intervalId = setInterval(getArduinoData, 3000);
    return () => clearInterval(intervalId);
  }, []);
  // Start or stop the timer based on phoneStatus
  useEffect(() => {
    if (phoneStatus) startTimer()
    else stopTimer()
  }, [phoneStatus]);

  console.log(Math.floor(dailyUsage));
  return (
   <ScrollView contentContainerStyle={{width:'100%',height:'100%'}}
   refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View className="flex justify-between items-center h-full gap-5 mx-5">
      {/* today usage */}
      <View className="h-auto w-full pt-10 flex flex-col items-end">
        <View className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-gray-900">
          <View
            className={`flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 ${
              deviceStatus ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <Text className="text-3xl">
              {Math.floor(dailyUsage / Hour)}h
            </Text>
          </View>
        </View>
      </View>

      {/* pad status */}
      <View
        className={`h-[41%] rounded-xl w-full shadow-xl flex flex-col justify-center items-center ${
          phoneStatus ? 'bg-green-500/50 shadow-green-800' : 'bg-red-500/50 shadow-red-800'
        }`}
      >
        <Text
          className={`rounded-full p-5 text-lg text-white ${
            phoneStatus ? 'bg-green-600 shadow-green-800' : 'bg-red-600 shadow-red-800'
          }`}
        >
          {phoneStatus ? 'Forget phone and Do your Work 👊' : 'Keep Your Phone in Pad'}
        </Text>
      </View>

      <View className="flex flex-col items-center justify-center px-1">
        <Text className="pb-2 text-xl">Your Progress</Text>
        <ContributionComponent />
      </View>
    </View>
    </ScrollView>
  );
};

export default App;
