import { Link, Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          tabBarShowLabel:false,
          tabBarIcon: ({ color,size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="LeaderBoard"
        options={{
          headerShown: false, 
          tabBarShowLabel:false,
          tabBarIcon: ({ color,size }) => <MaterialIcons name="leaderboard" size={size} color={color} />,
        }}
      />
        <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false, 
          tabBarShowLabel:false,
          tabBarIcon: ({ color,size }) => <FontAwesome6 name="face-smile" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

