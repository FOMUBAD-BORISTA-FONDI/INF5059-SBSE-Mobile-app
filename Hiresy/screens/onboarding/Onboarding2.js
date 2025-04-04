import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Onboarding2 = ({ navigation }) => {
  const backIcon = Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back';
  const forwardIcon = Platform.OS === 'ios' ? 'chevron-forward' : 'arrow-forward';
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require("../../assets/Images/onboarding-2.png")} 
          style={styles.image} 
        />
        
        <Text style={styles.title}>Get Your Dream Job!</Text>
        <Text style={styles.description}>
          With the right information, you can find a job that matches your skills.
        </Text>
        
        <View style={styles.pagination}>
        <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
        
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Onboarding1")}>
            <Ionicons name={backIcon} size={24} color="#007BFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate("Onboarding3")}
          >
            <Ionicons name={forwardIcon} size={24} color="#007BFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 22,
    marginBottom: 25,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007BFF",
    width: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  navButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 18,
    color: "#999",
  },
  nextText: {
    fontSize: 18,
    color: "#007BFF",
  },
});

export default Onboarding2;

