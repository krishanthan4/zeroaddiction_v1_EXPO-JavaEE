import React, { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import AlertToast from '~/components/AlertToast';
import ContributionComponent from '~/components/ContributionGraph';

const App = () => {

  // whenever the 3 LDR's values and 2 Ultrasonics values changed, then it should send that data to the mobile app using websocket.

// in the esp32 side : if the ultrasonic sensr value is less than 2cm and the LDR is dark, then it should start calculating the time from that moment and when it got changed send it to the mobile app.

//if server is not started ,show keep your phone in pad message.

const [message, setMessage] = useState("");

useEffect(() => {
  try {
    const ws = new WebSocket(`${process.env.EXPO_PUBLIC_ESP_WS}`);
  ws.onmessage = (event) => {
    console.log(event.data);
    setMessage(event.data); 
  };
  return () => ws.close();
  } catch (error) {
    AlertToast("ESP Server is not started");
  }
}, []);
  return (
    <View className="flex justify-between items-center h-full gap-5 mx-5">
        {/* today usage */}
        <View className="h-auto w-full pt-10 flex flex-col items-end">
          <View className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-gray-900">
            <View className='flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-green-500'>
            <Text className="text-3xl">4h</Text>
            </View>
          </View>
        </View>
      {/* pad status */}
      <View className='h-[50%] rounded-xl w-full shadow-red-800 shadow-xl bg-red-500/50 flex flex-col justify-center items-center'>
        <Text className="rounded-full bg-red-600 shadow-red-800 p-5 text-lg text-white">
          Keep Your Phone in Pad
        </Text>
      </View>

        <View className="flex flex-col items-center justify-center px-1">
          <Text className="pb-2 text-xl">Your Progress</Text>
          <ContributionComponent />
        </View>
      </View>
  );
};

export default App;
