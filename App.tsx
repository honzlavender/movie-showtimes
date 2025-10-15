import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HeaderBar from "./src/components/HeaderBar";
import HomeScreen from "./src/app/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Clock, Church } from "lucide-react-native";
import { View, Text } from "react-native";

export type RootStackParamList = {
  BottomTabs: undefined;
  theaters: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      >
        {() => <HomeScreen type="movies" />}
      </Tab.Screen>
      <Tab.Screen
        name="Theaters"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Church color={color} size={size} />,
        }}
      >
        {() => <HomeScreen type="theaters" />}
      </Tab.Screen>
      <Tab.Screen
        name="Showtimes"
        options={{
          // headerShown: false,
          headerTitle: () => (
            <View>
              <Text>
                Shows are sorted by time in ascending order and grouped by hour
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      >
        {() => <HomeScreen type="showtimes" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={MyTabs}
        options={{
          title: "WEDNESDAY, OCTOBER 15",
          headerTitle: (props) => <HeaderBar {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
