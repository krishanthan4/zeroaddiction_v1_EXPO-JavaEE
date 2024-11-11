import { View, Text, TextInput, StyleSheet, TouchableHighlight, Alert, TouchableOpacity, Appearance, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { getFromAsyncStorage, setToAsyncStorage } from '~/util/storage';

const MyProfile = () => {
  //get user from async storage
  const [getUser, setUser] = useState<{
    email: string;
    username: string;
  }>({ email: "", username: ""});
  useEffect(() => {
    const getUser = async () => {
      const user = await getFromAsyncStorage("user");
      if (user && user.mobile) {
        setUser(user);
      }
    };
    getUser();
  }, []);

const [showAlert, setShowAlert] = useState(false);

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
     setToAsyncStorage("user", {mobile: ""});
     setToAsyncStorage("userAllChats", { chats: ''});
     router.push("/");
    }}>
    <Text className='text-white text-lg'>Yes</Text>
   </Pressable>
  </View>
</View>
</View>
{/* alert finish */}
<View className='w-full h-full flex-1 flex-col justify-center items-center'>

<View className='flex flex-row gap-7 items-center'>
<MaterialCommunityIcons name="face-man-profile" size={30} color="black" />
<View>
<Text className='text-gray-900'>User Name</Text>
<Text className='text-gray-200 text-lg font-semibold'>{getUser.username}</Text>
</View>
</View>

<View className='flex flex-row gap-7 mt-1 items-center'>
<Feather name="phone" size={30} color="black" />
<View>
<Text className='text-gray-900'>Email</Text>
<Text className='200 text-lg font-semibold'>{getUser.email}</Text>
</View>
</View>

<TouchableOpacity activeOpacity={0.8} hitSlop={10} onPress={()=>{setShowAlert(true)}}>
  <View className='flex flex-row gap-7 mt-1 items-center'>
  <AntDesign name="logout" size={24} color="black" />
<View>
<Text className='ml-1 text-lg font-bold'>Sign Out</Text>
</View>    
  </View>
</TouchableOpacity>
</View>
</View>  
  )
}


//make react native styles
const styles = StyleSheet.create({
  input: {
    height: 40, // h-10
    borderRadius: 8, // rounded-lg
    backgroundColor: "rgba(31, 41, 55, 0.7)", // bg-gray-800/70
    marginBottom: 12, // mb-3
    fontSize: 18, // text-lg
    paddingHorizontal: 16, // px-4
    shadowColor: "#1f2937", // shadow-gray-950/50
    color:"white",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});
export default MyProfile