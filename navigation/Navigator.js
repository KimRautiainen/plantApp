import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/ListScreen";
import ScanScreen from "../screens/ScanScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlantDetailScreen from "../screens/PlantDetailsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for List, Scan and Detail screens
const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ListScreen"
      component={ListScreen}
      options={{
        headerShown: false,
        title: "My Plants",
      }}
    />
    <Stack.Screen
      name="Scan"
      component={ScanScreen}
      options={{
        headerShown: false,
        title: "Add a Plant",
      }}
    />
    <Stack.Screen
      name="PlantDetail"
      component={PlantDetailScreen}
      options={{
        headerShown: false,
        title: "Add a Plant",
      }}
    />
  </Stack.Navigator>
);

// bottom tab navigator for homescreen, setting and profile
const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* List Tab with Stack Navigation */}
      <Tab.Screen
        name="Plants"
        component={ListStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Empty Settings Tab */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
      {/* Empty Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
