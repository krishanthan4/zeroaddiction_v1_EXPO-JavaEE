import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AlertToast from "~/components/AlertToast";
import LoadingComponent from "~/components/LoadingComponent";
import useTotalCountStore from "~/store/totalCountStore";
import { getFromAsyncStorage, setToAsyncStorage } from "~/util/storage";

const SignIn = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const {clearTotalCount} = useTotalCountStore();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await getFromAsyncStorage("user");
      if (user && user.username) router.replace({ pathname: "/(tabs)/" })
    };
    checkLoggedIn();
  }, []);

  const handleSignup = async () => {
    if (username === "" || username == null) {
      AlertToast("username is required");
      return;
    }
    if (password === "" || password == null) {
      AlertToast("Password is required");
      return;
    }

    try {
      setIsLoading(true);
      const userDetails = { username, password };
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(userDetails),
      });
      if (response.ok) {
      const data = await response.json();
        if (data.success) {
                await setToAsyncStorage("user", {
                  username: data.message.username,
                  email: data.message.email,
                });
                await setToAsyncStorage("dailyUsage", {dailyUsage:0});
                    router.replace({ pathname: "/(tabs)/" });
          };

      } else {
        AlertToast("HTTP error: " + response.status);
      }
    } catch (e: any) {
      AlertToast("Error: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingComponent />;
  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Welcome Back {":)"}</Text>
          <Text style={styles.subtitle}>Let's keep the streak ... Again!</Text>
        </View>
        <View style={styles.inputContainer}>
          <KeyboardAvoidingView style={styles.keyboardView}>
            <TextInput
              style={styles.input}
              placeholder="Enter username"
              placeholderTextColor={"#7e807f"}
              value={username}
              onChangeText={setusername}
              keyboardType="default"
              maxLength={10}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={"#7e807f"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              maxLength={20}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpPrompt}>
          <Text style={styles.signUpText}>Wanna be a member?</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            hitSlop={20}
            onPress={() => router.push({ pathname: "/(auth)/signup" })} >
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#111827",
    paddingTop: 80,
    paddingBottom: 96,
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  welcomeContainer: {
    marginTop: 112,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    // color: "#ffffff",
    marginBottom: 16, 
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontWeight: "600",
    // color: "#ffffff",
    marginBottom: 16,
  },
  inputContainer: {
    gap: 40,
  },
  keyboardView: {
    gap: 4, 
  },
  input: {
    height: 40, 
    borderRadius: 8,
    backgroundColor: "#f2fcf6",
    marginBottom: 12, 
    fontSize: 18,
    paddingHorizontal: 16,
    shadowColor: "#1f2937",
    color:"#757575",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 24, 
    paddingVertical: 12,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
  },
  signUpPrompt: {
    gap: 8,
  },
  signUpText: {
    textAlign: "center",
    color: "#9ca3af",
  },
  signUpLink: {
    textAlign: "center",
    color: "black",
    fontWeight: "600",
  },
});

export default SignIn;
