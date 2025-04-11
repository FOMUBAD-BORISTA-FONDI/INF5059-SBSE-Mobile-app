// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const HomeScreen = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const userId = await AsyncStorage.getItem('user_id');

//         if (!token || !userId) {
//           console.warn('Token or user ID not found');
//           return;
//         }

//         const response = await axios.get(`http://your-backend-url/user/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {userData ? (
//         <View style={styles.card}>
//           <Text style={styles.title}>Welcome, {userData.username}!</Text>
//           <Text style={styles.info}>User Type: {userData.type}</Text>
//           <Text style={styles.info}>User ID: {userData.id}</Text>
//         </View>
//       ) : (
//         <Text style={styles.loading}>Loading user data...</Text>
//       )}
//     </ScrollView>
