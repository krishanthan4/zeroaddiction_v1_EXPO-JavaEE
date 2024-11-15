import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  Button,
  View,
  Pressable,
  KeyboardAvoidingView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AlertToast from "~/components/AlertToast";
import LoadingComponent from "~/components/LoadingComponent";
import { getFromAsyncStorage, setToAsyncStorage } from "~/util/storage";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const handleSignup = async () => {
    if (username == "" || username == null) {
      AlertToast("username is required");
      return;
    }
    if (email == "" || email == null) {
      AlertToast("Email is required");
      return;
    }
    if (password == "" || password == null) {
      AlertToast("Password is required");
      return;
    }
    if (retypePassword == "" || retypePassword == null) {
      AlertToast("Please retype password");
      return;
    }
    if (password !== retypePassword) {
      AlertToast("Passwords do not match");
      return;
    }
    //set a email regex
    if(!email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
      AlertToast("Invalid Email");
      return;
    }
    if(!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$")){
      AlertToast("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
      return;
    }

    try {
      const userDetails = {
        email: email,
      };
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/CheckUserAlreadyAvailable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.success) {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/SignUp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
            body: JSON.stringify({ username: username,email:email, password: password }),
          });
          const data = await response.json();
          if (response.ok) {
            if (data.success) {
              router.navigate({ pathname: "(auth)/signin" });
            } else {
              AlertToast(data.message);
            }
          } else {
            AlertToast("HTTP error: " + response.status);
          }

        } else {
          AlertToast(data.message);
        }
      } else {
        AlertToast("HTTP error: " + response.status);
      }
    } catch (e: any) {
      AlertToast("Error: " + e.message);
    }

  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await getFromAsyncStorage("user");

      if (user && user.username) {
        setIsLoggedIn(true);
        router.replace({ pathname: "/(tabs)/" }); // Redirect if already logged in, prevent back
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  if (isLoggedIn === null) {return <LoadingComponent />;}

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Create An Account</Text>
          <Text style={styles.subHeadingText}>
            Sign up to Start your journey
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <KeyboardAvoidingView style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Username"
              placeholderTextColor={"#7e807f"}
              value={username}
              onChangeText={setusername}
              keyboardType="default"
              maxLength={20}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor={"#7e807f"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              maxLength={200}
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={"#7e807f"}
              value={retypePassword}
              onChangeText={setRetypePassword}
              secureTextEntry
              maxLength={20}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => {handleSignup()}}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signInPrompt}>
          <Text style={styles.signInText}>Already a member?</Text>
          <TouchableOpacity
            hitSlop={20}
            activeOpacity={0.5}
            onPress={() => {
              router.push({ pathname: "/(auth)/signin" });
            }}
          >
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
  headingContainer: {
    marginTop: 112,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
    textAlign: "center",
  },
  subHeadingText: {
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#000000",
  },
  inputContainer: {
    gap: 40,
  },
  inputWrapper: {
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
    color: "#757575",
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
  signInPrompt: {
    gap: 8,
  },
  signInText: {
    textAlign: "center",
    color: "#9ca3af",
  },
  signInLink: {
    textAlign: "center",
    color: "black",
    fontWeight: "600",
  },
});

export default SignUp;
