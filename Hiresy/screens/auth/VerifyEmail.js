import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Keyboard
} from 'react-native';

const VerifyEmail = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Move to next input if character entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace and move to previous input
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Confirm OTP
  const handleConfirmOTP = () => {
    const enteredOtp = otp.join('');
    console.log('OTP Entered:', enteredOtp);
    // Navigate to the next screen or perform verification
    // navigation.navigate('NextScreen');
  };

  // Resend OTP
  const handleResendOTP = () => {
    console.log('Resending OTP');
    // Implement resend logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Hiresy</Text>
        <Text style={styles.subtitle}>Make your dream job come to reality!</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Check Your Email</Text>
        <Text style={styles.formDescription}>
          Please enter the code which has been sent to your Email to confirm your Account Creation.
        </Text>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <View key={index} style={styles.otpInputContainer}>
              <TextInput
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            </View>
          ))}
        </View>

        {/* Confirm OTP Button */}
        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirmOTP}
        >
          <Text style={styles.confirmButtonText} onPress={() => navigation.navigate('Login')}>Confirm</Text>
        </TouchableOpacity>

        {/* Resend OTP */}
        <TouchableOpacity 
          style={styles.resendContainer}
          onPress={handleResendOTP}
        >
          <Text style={styles.resendText} >
            Didn't receive code? <Text style={styles.resendHighlight}>Resend code</Text>
          </Text>
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
    marginBottom: 30,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInputContainer: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#0066FF',
  },
  otpInput: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#0066FF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendHighlight: {
    color: '#0066FF',
    fontWeight: '600',
  },
});

export default VerifyEmail;