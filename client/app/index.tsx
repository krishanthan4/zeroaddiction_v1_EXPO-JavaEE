import { Pressable, Text, View,StyleSheet, Dimensions, StatusBar } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getFromAsyncStorage, setToAsyncStorage } from "~/util/storage";
import LoadingComponent from "~/components/LoadingComponent";

export default function Page() {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await getFromAsyncStorage("user");

      if (user && user.mobile) {
        setIsLoggedIn(true);
        router.replace({ pathname: "(home)/chat" });
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
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"}/>
        <Image
          style={styles.image}
          source={require("../assets/index.jpeg")}
          contentFit="cover"
          transition={1000}
        />
         <Image
          style={styles.image2}
          source={require("../assets/index.jpeg")}
          contentFit="cover"
          transition={1000}
        />
        <View className="flex flex-col items-center justify-center gap-4">
        <Text className="uppercase font-bold text-5xl italic"><Text className="text-red-500 ">ZERO</Text> ADDICTION</Text>
        <Text style={styles.textTitle}>
          Your Mobile Under Your Control, Not Controlling You
        </Text>
        </View>
  
        <View style={styles.viewContainer}>
          <Pressable
            onPress={() => router.push("(auth)/signup")}
            style={styles.pressableButton}
          >
            <Text style={styles.buttonText}>
              Get Started
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 80,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: Dimensions.get("screen").height,
    resizeMode: 'contain',
    opacity: 0.2,
    position: 'absolute',
  },
  image2: {
    width: '90%',
    borderRadius: 15,
    height: Dimensions.get("screen").height/2.5,
    resizeMode: 'contain',
  },
  textTitle: {
    color: '#000000',
    // marginTop: 10,
    marginHorizontal: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 20,
  },
  
  pressableButton: {
    backgroundColor: 'green',
    borderRadius: 30,
    marginTop: 20,
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