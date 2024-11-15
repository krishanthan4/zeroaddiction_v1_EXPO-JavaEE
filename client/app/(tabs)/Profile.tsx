import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, TouchableOpacity, Appearance, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { getFromAsyncStorage, setToAsyncStorage } from '~/util/storage';
import Fontisto from '@expo/vector-icons/Fontisto';
import useTotalCountStore from '~/store/totalCountStore';

const MyProfile = () => {
  //get user from async storage
  const [getUser, setUser] = useState<{
    email: string;
    username: string;
  }>({ email: "", username: ""});
  useEffect(() => {
    const getUser = async () => {
      const user = await getFromAsyncStorage("user");
      if (user && user.username) {
        setUser(user);
      }
    };
    getUser();
  }, []);

const [showAlert, setShowAlert] = useState(false);
const {clearTotalCount} = useTotalCountStore();
  return (
    <View className=' w-full h-full'>
      {/* alert */}
      <View className={`w-full h-full ${showAlert ? 'flex':'hidden'} absolute bg-black/20  flex-col justify-center items-center z-10`}>
<View className='w-[90%] h-[25%] max-h-64 bg-yellow-700/90 z-20 rounded-lg p-3'>
  <Text className='font-semibold text-white text-lg pb-4'>Sign Out</Text>
  <Text className='font-semibold text-white text-base '>Are you sure you want to sign out?</Text>
  <View className='w-[60%] mt-auto ml-auto flex flex-row justify-evenly'>
    <Pressable hitSlop={5} onPress={()=>{setShowAlert(false)}}>
    <Text className='text-white text-lg' >Cancel</Text>
    </Pressable>
   <Pressable hitSlop={5} onPress={()=>{
     setToAsyncStorage("user", {username: "",email:""});
     clearTotalCount();
     router.replace("(auth)/signin");
    }}>
    <Text className='text-white text-lg'>Yes</Text>
   </Pressable>
  </View>
</View>
</View>
{/* alert finish */}
<View className='w-full h-full flex flex-col items-center  px-10 pb-5 pt-20'>
            <View 
            className="rounded-full w-32 h-32 bg-gray-500 flex justify-center items-center"
            style={{backgroundColor: 'gray'}}
          ><Text className="text-center text-white text-3xl font-semibold">{getUser.username.charAt(0).toUpperCase()}</Text></View>
<View className='w-full mt-14 gap-4'>
<View className='flex flex-row gap-10 items-center'>
<MaterialCommunityIcons name="face-man-profile" size={30} color="#000000" />
<View>
<Text className='text-black text-2xl font-bold'>Username</Text>
<Text className='text-gray-600 text-lg font-semibold'>{getUser.username}</Text>
</View>
</View>

<View className='flex flex-row gap-10 mt-1 items-center'>
<Fontisto name="email" size={30} color="black" />
<View>
<Text className='text-black text-2xl font-bold'>Email</Text>
<Text className='text-gray-600 text-lg font-semibold'>{getUser.email}</Text>
</View>
</View>

<TouchableOpacity activeOpacity={0.8} hitSlop={10} onPress={()=>{setShowAlert(true)}}>
  <View className='flex flex-row gap-10 mt-1 items-center'>
  <AntDesign name="logout" size={24} color="#000000" />
<View>
<Text className='text-gray-800 ml-1 text-2xl font-bold'>Sign Out</Text>
</View>    
  </View>
</TouchableOpacity>
</View>
</View>  
    </View>  
  )
}

export default MyProfile