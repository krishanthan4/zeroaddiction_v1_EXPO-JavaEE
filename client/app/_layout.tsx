import '../global.css';
import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false ,animation:'slide_from_left'}} />
      <Stack.Screen name="(auth)/signin" options={{headerShown: false ,animation:'slide_from_left'}} />
      <Stack.Screen name="(auth)/signup" options={{headerShown: false ,animation:'slide_from_left'}} />
    </Stack>
  );
}
