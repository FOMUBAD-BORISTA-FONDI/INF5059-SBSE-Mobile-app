import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Onboarding1"); // Move to first onboarding screen
    }, 3000); // 3 seconds delay
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://the-app-logo.com/splash.png" }} style={styles.logo} />
      <Text style={styles.title}>Welcome to Hiresy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007BFF",
  },
  logo: {
    width: 150,
    height: 100,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default SplashScreen;
