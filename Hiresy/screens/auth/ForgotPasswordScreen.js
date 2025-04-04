import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Hiresy</Text>
        <Text style={styles.subtitle}>Make your dream job come to reality !</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Forgot Password</Text>
        <Text style={styles.formDescription}>
          Please enter your email for us to send confirmation regarding your password change.
        </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="tsotsa.dev@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Send Email Button */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('verify-otp')}
        >
          <Text style={styles.loginButtonText}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0066FF',
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 14,
      color: 'white',
      opacity: 0.9,
    },
    formContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    formTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    formDescription: {
      fontSize: 14,
      color: '#666',
      marginBottom: 20,
    },
    toggleContainer: {
      flexDirection: 'row',
      backgroundColor: '#F0F0F0',
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
    },
    toggleButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    activeToggle: {
      backgroundColor: '#0066FF',
    },
    toggleText: {
      fontSize: 16,
      color: '#666',
    },
    activeToggleText: {
      fontSize: 16,
      color: 'white',
      fontWeight: '600',
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
    },
    socialButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    orText: {
      textAlign: 'center',
      color: '#888',
      marginBottom: 15,
    },
    inputContainer: {
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 14,
      color: '#333',
      marginBottom: 5,
    },
    input: {
      height: 50,
      backgroundColor: '#F8F8F8',
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
    },
    passwordContainer: {
      flexDirection: 'row',
      backgroundColor: '#F8F8F8',
      borderRadius: 10,
      height: 50,
      alignItems: 'center',
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
      alignSelf: 'flex-end',
      marginTop: 5,
    },
    forgotPasswordText: {
      color: '#0066FF',
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: '#0066FF',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    phoneContainer: {
      flexDirection: 'row',
      height: 50,
    },
    countryCode: {
      width: 60,
      height: 50,
      backgroundColor: '#F8F8F8',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      flexDirection: 'row',
    },
    phoneInput: {
      flex: 1,
      height: 50,
      backgroundColor: '#F8F8F8',
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
    },
  });
  
  export default ForgotPasswordScreen;