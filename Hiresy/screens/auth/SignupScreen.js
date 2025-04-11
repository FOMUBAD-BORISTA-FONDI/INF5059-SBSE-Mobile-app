import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { Picker } from "@react-native-picker/picker"; // Commented out since we're not using it
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("jobseeker"); // Commented out role
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // 1. Check if all fields are filled
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    //2. Password verification
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.1.101:5000/register/job_seeker",
        // "https://3a26-129-0-189-42.ngrok-free.app/register",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          username,
          // role,
          password,
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Account created! Please login.");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Registration Failed",
          response.data.message || "Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert(
        "Error",
        "Unable to register. Please check your connection or try again."
      );
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Hiresy</Text>
        <Text style={styles.subtitle}>
          Make your dream job come to reality!
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.toggleText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
            <Text style={styles.activeToggleText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {/* First Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="tsotsa.test@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
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
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0066FF" },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "white", opacity: 0.9 },
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
  activeToggle: { backgroundColor: "#0066FF" },
  toggleText: { fontSize: 16, color: "#666" },
  activeToggleText: { fontSize: 16, color: "white", fontWeight: "600" },
  inputContainer: { marginBottom: 15 },
  inputLabel: { fontSize: 14, color: "#333", marginBottom: 5 },
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
  passwordInput: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16 },
  eyeIcon: { paddingHorizontal: 15 },
  loginButton: {
    backgroundColor: "#0066FF",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});

export default SignUpScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { Picker } from "@react-native-picker/picker";
// import axios from "axios";

// const SignUpScreen = ({ navigation }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("jobseeker");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [countryCode, setCountryCode] = useState("+237");
//   const [loading, setLoading] = useState(false);

//   const handleSignUp = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://092e-129-0-189-48.ngrok-free.app/register",
//         {
//           first_name: firstName,
//           last_name: lastName,
//           phone: `${countryCode}${phone}`,
//           email,
//           role,
//           password,
//         }
//       );

//       if (response.data.success) {
//         Alert.alert("Success", "Account created! Please login.");
//         navigation.navigate("Login");
//       } else {
//         Alert.alert(
//           "Registration Failed",
//           response.data.message || "Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       Alert.alert(
//         "Error",
//         "Unable to register. Please check your connection or try again."
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <View style={styles.header}>
//         <Text style={styles.title}>Hiresy</Text>
//         <Text style={styles.subtitle}>
//           Make your dream job come to reality!
//         </Text>
//       </View>

//       <View style={styles.formContainer}>
//         <View style={styles.toggleContainer}>
//           <TouchableOpacity
//             style={styles.toggleButton}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text style={styles.toggleText}>Login</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
//             <Text style={styles.activeToggleText}>Sign Up</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView style={styles.scrollView}>
//           {/* First Name */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>First Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="First name"
//               value={firstName}
//               onChangeText={setFirstName}
//             />
//           </View>

//           {/* Last Name */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Last Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Last Name"
//               value={lastName}
//               onChangeText={setLastName}
//             />
//           </View>

//           {/* Phone */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Phone</Text>
//             <View style={styles.phoneContainer}>
//               <View style={styles.countryCodePicker}>
//                 <Picker
//                   selectedValue={countryCode}
//                   onValueChange={(itemValue) => setCountryCode(itemValue)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="+237 (CM)" value="+237" />
//                   <Picker.Item label="+234 (NG)" value="+234" />
//                   <Picker.Item label="+225 (CI)" value="+225" />
//                   <Picker.Item label="+33 (FR)" value="+33" />
//                   <Picker.Item label="+1 (US)" value="+1" />
//                 </Picker>
//               </View>
//               <TextInput
//                 style={styles.phoneInput}
//                 placeholder="65053..."
//                 value={phone}
//                 onChangeText={setPhone}
//                 keyboardType="phone-pad"
//               />
//             </View>
//           </View>

//           {/* Email */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="tsotsa.test@example.com"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           {/* Role Picker */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Role</Text>
//             <View style={styles.pickerWrapper}>
//               <Picker
//                 selectedValue={role}
//                 onValueChange={(itemValue) => setRole(itemValue)}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Jobseeker" value="jobseeker" />
//                 <Picker.Item label="Employer" value="employer" />
//                 <Picker.Item label="Admin" value="admin" />
//               </Picker>
//             </View>
//           </View>

//           {/* Password */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="••••••••"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!showPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-outline" : "eye-off-outline"}
//                   size={20}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Confirm Password */}
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputLabel}>Confirm Password</Text>
//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="••••••••"
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={!showConfirmPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <Ionicons
//                   name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
//                   size={20}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Submit */}
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={handleSignUp}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.loginButtonText}>Sign Up</Text>
//             )}
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0066FF" },
//   header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 30 },
//   title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 5 },
//   subtitle: { fontSize: 14, color: "white", opacity: 0.9 },
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
//   activeToggle: { backgroundColor: "#0066FF" },
//   toggleText: { fontSize: 16, color: "#666" },
//   activeToggleText: { fontSize: 16, color: "white", fontWeight: "600" },
//   inputContainer: { marginBottom: 15 },
//   inputLabel: { fontSize: 14, color: "#333", marginBottom: 5 },
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
//   passwordInput: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16 },
//   eyeIcon: { paddingHorizontal: 15 },
//   loginButton: {
//     backgroundColor: "#0066FF",
//     height: 50,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   loginButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
//   phoneContainer: { flexDirection: "row", height: 50 },
//   countryCodePicker: {
//     width: 100,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     justifyContent: "center",
//     marginRight: 10,
//   },
//   phoneInput: {
//     flex: 1,
//     height: 50,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   pickerWrapper: {
//     backgroundColor: "#F8F8F8",
//     borderRadius: 10,
//     overflow: "hidden",
//     height: 50,
//     justifyContent: "center",
//   },
//   picker: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default SignUpScreen;
