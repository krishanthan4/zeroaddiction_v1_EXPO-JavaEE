import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromAsyncStorage = async (key:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
console.log("Error in geting async storage");
    }
  };

  export const setToAsyncStorage = async (key:string,data:object) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log("Error in storing async storage");
    }
  };