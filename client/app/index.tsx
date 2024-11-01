import { Pressable, Text, View,StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getFromAsyncStorage} from "../utils/storage";
import LoadingComponent from "./components/LoadingComponent";
import { StatusBar } from "expo-status-bar";

export default function Page() {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await getFromAsyncStorage("user");

      if (user && user.mobile) {
        setIsLoggedIn(true);
        router.replace("(home)/chat"); // Redirect if already logged in, prevent back
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingComponent/>;
  }

  if (!isLoggedIn) {
    return (
      <View style={{width:'100%',height:"100%"}}>
   <Image
          style={styles.image}
          // className="w-full h-full object-contain"
          source={require("../assets/index.jpg")}
          contentFit="cover"
          transition={1000}
        />
 <View style={styles.container}>
        <StatusBar style="light"/>
      
        <Text style={styles.textTitle}>
          Make Your Phone on your Control. Not Yourself
        </Text>
  
        <View style={styles.viewContainer}>
          <Pressable className="w-full p-2" hitSlop={20} onPress={() => router.push("(other)/Terms&Conditions")}>
            <Text style={styles.termsText}>
              Terms & Privacy Policy
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("(auth)/signup")}
            style={styles.pressableButton}
          >
            <Text style={styles.buttonText}>
              Getting Started
            </Text>
          </Pressable>
        </View>
      </View>
      {/* <View style={{backgroundColor:'gray',width:'100%',height:'100%'}}></View> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
    // backgroundColor: 'rgba(52, 52, 52, alpha)',
    opacity: 0.8,
  },
  imageDownView:{
    backgroundColor:'gray'
  },
  textTitle: {
    color: '#ffffff',
    marginTop: Dimensions.get('window').height / 4,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 30,
  },
  termsText: {
    textAlign: 'center',
    width: '100%',
    paddingVertical: 5,
    fontSize: 18,
    color: '#ffffff',
  },
  pressableButton: {
    backgroundColor: '#28ab00',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 12,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
    paddingVertical: 5,
    fontSize: 18,
    color: '#ffffff',
  },
  viewContainer: {
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
  },
});
