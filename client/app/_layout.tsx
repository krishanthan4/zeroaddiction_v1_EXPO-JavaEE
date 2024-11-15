import '../global.css';
import { Stack } from 'expo-router';
import { RootSiblingParent } from "react-native-root-siblings";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <RootSiblingParent>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false ,animation:'slide_from_left'}} />
      <Stack.Screen name="(auth)/signin" options={{headerShown: false ,animation:'slide_from_left'}} />
      <Stack.Screen name="(auth)/signup" options={{headerShown: false ,animation:'slide_from_left'}} />
    </Stack>
    </RootSiblingParent>
  );
}
