import React from "react";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return <AppNavigator />;
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';

// // Import your screens
// import JobDashboard from './screens/HomeScreen';
// import MapScreen from './screens/mapscreen';
// import SavedScreen from './screens/SavedScreen'; // Create this file if it doesn't exist
// import ProfileScreen from './screens/ProfileScreen'; // Create this file if it doesn't exist

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'home' : 'home-outline';
//             } else if (route.name === 'Map') {
//               iconName = focused ? 'map' : 'map-outline';
//             } else if (route.name === 'Saved') {
//               iconName = focused ? 'bookmark' : 'bookmark-outline';
//             } else if (route.name === 'Profile') {
//               iconName = focused ? 'person' : 'person-outline';
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: '#2563eb',
//           tabBarInactiveTintColor: '#999',
//           tabBarStyle: {
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//             height: 60,
//             paddingBottom: 5,
//             paddingTop: 5,
//           },
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Home" component={JobDashboard} />
//         <Tab.Screen name="Map" component={MapScreen} />
//         <Tab.Screen name="Saved" component={SavedScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
