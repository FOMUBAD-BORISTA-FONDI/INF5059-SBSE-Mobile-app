// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting to login with:", { username: email });
      
      const response = await axios.post("http://192.168.1.101:5000/login", {
        username: email,
        password: password  
      });

      console.log("Login response:", response.data);

      if (response.data) {
        // Save user data for future use (like applying for jobs)
        try {
          // Match the actual keys from the API response
          await AsyncStorage.setItem('userId', response.data.user_id.toString());
          await AsyncStorage.setItem('jwt_token', response.data.access_token);
          await AsyncStorage.setItem('userName', email);
          
          Alert.alert("Welcome", "Login successful!");
          navigation.navigate("Home");
        } catch (storageError) {
          console.error("Storage error:", storageError);
          // Still navigate even if storage fails
          navigation.navigate("Home");
        }
      } else {
        Alert.alert(
          "Login Failed",
          response.data.message || "Invalid credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // More detailed error handling
      if (error.response) {
        console.error("Server error data:", error.response.data);
        Alert.alert("Login Failed", error.response.data.message || "Server error. Please try again.");
      } else if (error.request) {
        Alert.alert("Connection Error", "Could not connect to the server. Please check your internet connection.");
      } else {
        Alert.alert("Error", "Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Hiresy</Text>
        <Text style={styles.subtitle}>
          Make your dream job come to reality !
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Toggle between Login and Sign Up */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, styles.activeToggle]}
            onPress={() => {}}
          >
            <Text style={styles.activeToggleText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.toggleText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={18} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={18} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="twitter" size={18} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or login with</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email/Username</Text>
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0066FF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  activeToggle: {
    backgroundColor: "#0066FF",
  },
  toggleText: {
    fontSize: 16,
    color: "#666",
  },
  activeToggleText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  orText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 5,
  },
  forgotPasswordText: {
    color: "#0066FF",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#0066FF",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen;

// // LoginScreen.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter both email and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("Attempting to login with:", { username: email });
      
//       const response = await axios.post("http://192.168.1.101:5000/login", {
//         username: email,
//         password: password  
//       });

//       console.log("Login response:", response.data);

//       if (response.data) {
//         // Save user data for future use (like applying for jobs)
//         try {
//           await AsyncStorage.setItem('userId', response.data.userId.toString());
//           await AsyncStorage.setItem('userToken', response.data.token);
//           await AsyncStorage.setItem('userName', response.data.username || email);
          
//           Alert.alert("Welcome", "Login successful!");
//           navigation.navigate("Home");
//         } catch (storageError) {
//           console.error("Storage error:", storageError);
//           // Still navigate even if storage fails
//           navigation.navigate("Home");
//         }
//       } else {
//         Alert.alert(
//           "Login Failed",
//           response.data.message || "Invalid credentials."
//         );
//       }
//     } catch (error) {
//       console.error("Login error:", error);
      
//       // More detailed error handling
//       if (error.response) {
//         console.error("Server error data:", error.response.data);
//         Alert.alert("Login Failed", error.response.data.message || "Server error. Please try again.");
//       } else if (error.request) {
//         Alert.alert("Connection Error", "Could not connect to the server. Please check your internet connection.");
//       } else {
//         Alert.alert("Error", "Something went wrong. Try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.header}>
//         <Text style={styles.title}>Hiresy</Text>
//         <Text style={styles.subtitle}>
//           Make your dream job come to reality !
//         </Text>
//       </View>

//       <View style={styles.formContainer}>
//         {/* Toggle between Login and Sign Up */}
//         <View style={styles.toggleContainer}>
//           <TouchableOpacity
//             style={[styles.toggleButton, styles.activeToggle]}
//             onPress={() => {}}
//           >
//             <Text style={styles.activeToggleText}>Login</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.toggleButton}
//             onPress={() => navigation.navigate("Signup")}
//           >
//             <Text style={styles.toggleText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Social Login */}
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton}>
//             <FontAwesome name="google" size={18} color="#DB4437" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <FontAwesome name="facebook" size={18} color="#4267B2" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <FontAwesome name="twitter" size={18} color="#1DA1F2" />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.orText}>or login with</Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputLabel}>Email/Username</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="example@email.com"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputLabel}>Password</Text>
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="••••••••"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.eyeIcon}
//             >
//               <Ionicons
//                 name={showPassword ? "eye-outline" : "eye-off-outline"}
//                 size={20}
//                 color="#888"
//               />
//             </TouchableOpacity>
//           </View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("ForgotPassword")}
//             style={styles.forgotPasswordButton}
//           >
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <Text style={styles.loginButtonText}>Login</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0066FF",
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 30,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "white",
//     opacity: 0.9,
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     backgroundColor: "#F0F0F0",
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//   },
//   toggleButton: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 25,
//   },
//   activeToggle: {
//     backgroundColor: "#0066FF",
//   },
//   toggleText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   activeToggleText: {
//     fontSize: 16,
//     color: "white",
//     fontWeight: "600",
//   },
//   socialContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 15,
//   },
//   socialButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#F0F0F0",
//     justifyContent: "center",
//     alignItems: "center",
//     marginHorizontal: 10,
//   },
//   orText: {
//     textAlign: "center",
//     color: "#888",
//     marginBottom: 15,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: "#333",
//     marginBottom: 5,
//   },
//   input: {
//     height: 50,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     height: 50,
//     alignItems: "center",
//   },
//   passwordInput: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   eyeIcon: {
//     paddingHorizontal: 15,
//   },
//   forgotPasswordButton: {
//     alignSelf: "flex-end",
//     marginTop: 5,
//   },
//   forgotPasswordText: {
//     color: "#0066FF",
//     fontSize: 14,
//   },
//   loginButton: {
//     backgroundColor: "#0066FF",
//     height: 50,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default LoginScreen;