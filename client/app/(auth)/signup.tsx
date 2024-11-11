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
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const handleSignup = async () => {
    if (mobile == "" || mobile == null) {
      AlertToast("Mobile is required");
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
    if(!mobile.match("^07[012345678]{1}[0-9]{7}$")){
      AlertToast("Mobile number must be 10 digits and start with 07");
      return;
    }
    if(!password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$")){
      AlertToast("Password must contain at least one uppercase letter, one lowercase letter, one number and one special character");
      return;
    }

    try {
      const userDetails = {
        mobile: mobile,
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
          setToAsyncStorage("signupDetails", { mobile: mobile, password: password });
          router.navigate("/addProfile");
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

      if (user && user.mobile) {
        setIsLoggedIn(true);
        router.replace("(home)/chat"); // Redirect if already logged in, prevent back
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
            Sign up to Start chatting with your friends
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <KeyboardAvoidingView style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile"
              placeholderTextColor={"#d4d4d4"}
              value={mobile}
              onChangeText={setMobile}
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={"#d4d4d4"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              maxLength={20}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={"#d4d4d4"}
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
              router.push("(auth)/signin");
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
    backgroundColor: "#111827",
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
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  subHeadingText: {
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "600",
    color: "#ffffff",
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
    backgroundColor: "rgba(31, 41, 55, 0.7)",
    marginBottom: 12,
    fontSize: 18,
    paddingHorizontal: 16,
    shadowColor: "#1f2937",
    color: "white",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3B82F6",
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
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default SignUp;
