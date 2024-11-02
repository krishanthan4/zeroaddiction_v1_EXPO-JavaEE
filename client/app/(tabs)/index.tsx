import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import ContributionComponent from '~/components/ContributionGraph';

const App = () => {

  // whenever the 3 LDR's values and 2 Ultrasonics values changed, then it should send that data to the mobile app using websocket.

// in the esp32 side : if the ultrasonic sensr value is less than 2cm and the LDR is dark, then it should start calculating the time from that moment and when it got changed send it to the mobile app.

//if server is not started ,show keep your phone in pad message.

const [message, setMessage] = useState("");

useEffect(() => {
  const ws = new WebSocket('ws://192.168.1.x:80');
  // Listen for messages from the ESP32
  ws.onmessage = (event) => {
    console.log(event.data); // Log the message
    setMessage(event.data);  // Update the message state
  };

  // Cleanup function to close the WebSocket when the component unmounts
  return () => ws.close();
}, []);
  return (
    <View className="flex-1">
      {/* pad status */}
      <View className="absolute h-full w-full flex-1 flex-col items-center justify-center">
      <View className='rounded-xl w-[95%] shadow-red-800 shadow-xl h-60 bg-red-500/50 flex flex-col justify-center items-center'>
        <Text className="rounded-full bg-red-600 shadow-red-800 p-5 text-lg text-white">
          Keep Your Phone in Pad
        </Text>
      </View>
      </View>

      <View className="flex flex-col items-center justify-between h-full">
        {/* today usage */}
        <View className="h-30 w-full pe-6 pt-10 flex flex-col items-end">
          <View className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-gray-900">
            <View className='flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-green-500'>
            <Text className="text-3xl">4h</Text>
            </View>
          </View>
        </View>


        <View className="flex flex-col items-center justify-center p-1">
          <Text className="pb-2 text-xl">Your Progress</Text>
          <ContributionComponent />
        </View>
      </View>
    </View>
  );
};

export default App;
