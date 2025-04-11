import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import Onboarding1 from "../screens/onboarding/Onboarding1";
import Onboarding2 from "../screens/onboarding/Onboarding2";
import Onboarding3 from "../screens/onboarding/Onboarding3";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import JobOpportunityScreen from "../screens/JobOpportunityScreen";
import AccountScreen from "../screens/AccountScreen";
import EditAccountScreen from "../screens/EditAccountScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import MyWalletScreen from "../screens/MyWalletScreen";
import JobAppliedScreen from "../screens/JobAppliedScreen";
import FavoriteJobScreen from "../screens/FavoriteJobScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import SavedJobsScreen from "../screens/SavedJobsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import JobApplicationScreen from "../screens/JobApplicationScreen";
import VerifyOTP from "../screens/auth/VerifyOTP";
import VerifyEmail from "../screens/auth/VerifyEmail";
import JobDescriptionScreen from "../screens/JobDescriptionScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="Onboarding3" component={Onboarding3} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="JobOpportunity" component={JobOpportunityScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="EditAccount" component={EditAccountScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettingsScreen}
        />
        <Stack.Screen name="MyWallet" component={MyWalletScreen} />
        <Stack.Screen name="JobApplied" component={JobAppliedScreen} />
        <Stack.Screen name="FavoriteJob" component={FavoriteJobScreen} />
        <Stack.Screen name="SearchResult" component={SearchResultScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="Saved" component={SavedJobsScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="apply" component={JobApplicationScreen} />
        <Stack.Screen name="JobDescription" component={JobDescriptionScreen} />
        <Stack.Screen name="verify-otp" component={VerifyOTP} />
        <Stack.Screen name="verify-email" component={VerifyEmail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
