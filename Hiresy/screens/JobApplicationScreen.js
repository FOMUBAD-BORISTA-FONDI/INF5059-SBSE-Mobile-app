import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const JobApplicationScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const [cvFile, setCvFile] = useState(null);
  const [email, setEmail] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadCV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"], // Only allow PDF files
        copyToCacheDirectory: true,
      });

      if (result?.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        // Extra validation to ensure it's a PDF
        if (!file.mimeType || file.mimeType !== "application/pdf") {
          Alert.alert("Invalid File Type", "Please upload only PDF files.");
          return;
        }
        
        setCvFile({
          name: file.name,
          size: `${Math.round(file.size / 1024)}KB`,
          uri: file.uri,
          type: file.mimeType,
        });
        
        console.log("Selected CV file:", {
          name: file.name,
          size: `${Math.round(file.size / 1024)}KB`,
          uri: file.uri,
          type: file.mimeType,
        });
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "There was an error selecting the file.");
    }
  };

  const handleRemoveFile = () => {
    setCvFile(null);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!cvFile) {
      Alert.alert("Missing CV", "Please upload your CV before applying.");
      return;
    }

    // Email is optional for notifications but no longer required
    // if provided, validate format
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address for notifications.");
        return;
      }
    }

    try {
      setIsSubmitting(true);

      // Get JWT token from AsyncStorage - using the correct key
      const token = await AsyncStorage.getItem("jwt_token");
      
      console.log("Retrieved token:", token ? "Token found" : "No token found");

      if (!token) {
        Alert.alert(
          "Authentication Required",
          "Please log in to apply for jobs."
        );
        setIsSubmitting(false);
        navigation.navigate("Login"); 
        return;
      }

      // Create form data for multipart/form-data request
      const formData = new FormData();
      
      // Make sure job_offer_id is added as a string
      formData.append("job_offer_id", jobId.toString());
      
      // Verify file exists before adding to form data
      const fileInfo = await FileSystem.getInfoAsync(cvFile.uri);
      console.log("File info:", fileInfo);
      
      if (fileInfo.exists) {
        // Add CV file to form data with correct field name
        // Make sure blob is properly formed with the right content
        formData.append("cv", {
          uri: Platform.OS === 'ios' ? cvFile.uri.replace('file://', '') : cvFile.uri,
          name: cvFile.name,
          type: cvFile.type || 'application/pdf',
        });
        
        // Log the form data for debugging
        console.log("Form data entries:");
        for (const [key, value] of Object.entries(formData._parts)) {
          console.log(`Key: ${key}, Value:`, value);
        }
      } else {
        throw new Error("CV file not found at path: " + cvFile.uri);
      }

      console.log("Sending application with data:", { 
        job_offer_id: jobId, 
        cv_file: cvFile.name,
        file_uri: cvFile.uri,
        file_exists: fileInfo.exists 
      });

      // Don't explicitly set Content-Type header, let fetch set the boundary
      const response = await fetch("http://192.168.1.101:5000/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Let fetch handle the Content-Type header with proper boundary
        },
        body: formData,
      });

      // Check if the response is OK before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      // Try to parse response as JSON
      let responseData;
      try {
        const responseText = await response.text();
        if (responseText) {
          responseData = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.log("Response was not JSON:", parseError);
        // Not a JSON response, but the request was successful
      }
      
      // If successful, show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      Alert.alert(
        "Application Failed",
        `Unable to submit your application: ${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // Navigate back to job listings
    navigation.navigate("JobOpportunity");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerIcon}>
          <Ionicons name="briefcase" size={24} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>Apply for Job</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Curriculum Vitae</Text>
        {!cvFile ? (
          <TouchableOpacity style={styles.uploadBox} onPress={handleUploadCV}>
            <Ionicons name="document-outline" size={24} color="#999" />
            <Text style={styles.uploadText}>Upload your CV Here</Text>
            <Text style={styles.uploadSubtext}>(.pdf only)</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.fileContainer}>
            <View style={styles.fileInfo}>
              <Ionicons name="document-text-outline" size={24} color="#666" />
              <View style={styles.fileDetails}>
                <Text style={styles.fileName}>{cvFile.name}</Text>
                <Text style={styles.fileSize}>{cvFile.size}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleRemoveFile}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Portfolio URL (Optional)
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="link-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="https://your-portfolio.com"
            value={portfolioUrl}
            onChangeText={setPortfolioUrl}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.noteText}>
          Your portfolio URL is for our records only and won't be sent with this application
        </Text>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Application Submitted</Text>
            <Text style={styles.successMessage}>
              Your job application was successfully submitted. Wait for the
              company to review and contact you.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeSuccessModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  content: { 
    padding: 20, 
    flex: 1 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 12 
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: { 
    flex: 1, 
    paddingVertical: 12, 
    paddingHorizontal: 8 
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
    marginTop: 4,
    marginBottom: 16,
  },
  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: { color: "#999", marginTop: 8 },
  uploadSubtext: { color: "#999", fontSize: 12, marginTop: 4 },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
  },
  fileInfo: { flexDirection: "row", alignItems: "center" },
  fileDetails: { marginLeft: 12 },
  fileName: { fontSize: 14, color: "#333" },
  fileSize: { fontSize: 12, color: "#999" },
  submitButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  submitButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
  submitButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#4ade80",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8 
  },
  successMessage: { 
    textAlign: "center", 
    color: "#666", 
    marginBottom: 24,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: { 
    color: "#fff", 
    fontWeight: "600" 
  },
});

export default JobApplicationScreen;



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as FileSystem from "expo-file-system";

// const JobApplicationScreen = ({ route, navigation }) => {
//   const { jobId } = route.params;
//   const [cvFile, setCvFile] = useState(null);
//   const [email, setEmail] = useState("");
//   const [portfolioUrl, setPortfolioUrl] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleUploadCV = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: [
//           "application/pdf",
//           "application/msword",
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         ],
//         copyToCacheDirectory: true,
//       });

//       if (result?.assets && result.assets.length > 0) {
//         const file = result.assets[0];
//         setCvFile({
//           name: file.name,
//           size: `${Math.round(file.size / 1024)}KB`,
//           uri: file.uri,
//           type: file.mimeType,
//         });
//       }
//     } catch (error) {
//       console.error("Error picking document:", error);
//       Alert.alert("Error", "There was an error selecting the file.");
//     }
//   };

//   const handleRemoveFile = () => {
//     setCvFile(null);
//   };

//   const handleSubmit = async () => {
//     // Validate required fields
//     if (!cvFile) {
//       Alert.alert("Missing CV", "Please upload your CV before applying.");
//       return;
//     }

//     // Email is optional for notifications but no longer required
//     // if provided, validate format
//     if (email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(email)) {
//         Alert.alert("Invalid Email", "Please enter a valid email address for notifications.");
//         return;
//       }
//     }

//     try {
//       setIsSubmitting(true);

//       // Get JWT token from AsyncStorage - using the correct key
//       const token = await AsyncStorage.getItem("jwt_token");
      
//       console.log("Retrieved token:", token ? "Token found" : "No token found");

//       if (!token) {
//         Alert.alert(
//           "Authentication Required",
//           "Please log in to apply for jobs."
//         );
//         setIsSubmitting(false);
//         navigation.navigate("Login"); 
//         return;
//       }

//       // Create form data for multipart/form-data request
//       const formData = new FormData();
//       formData.append("job_offer_id", jobId);

      
//       // Add CV file to form data
//       const fileInfo = await FileSystem.getInfoAsync(cvFile.uri);
//       if (fileInfo.exists) {
//         formData.append("cv_file", {
//           uri: cvFile.uri,
//           name: cvFile.name,
//           type: cvFile.type,
//         });
//       } else {
//         throw new Error("CV file not found");
//       }
      
//       console.log("formData", formData)
//       console.log("Sending application with data:", { job_offer_id: jobId, cv_file: cvFile.name });

//       // Send application to the API with multipart/form-data
//       const response = await fetch("http://192.168.1.101:5000/apply", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         body: formData,
//       });

//       // Check if the response is OK before trying to parse JSON
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API Error Response:", errorText);
//         throw new Error(`Server error: ${response.status}`);
//       }

//       // Try to parse response as JSON
//       let responseData;
//       try {
//         const responseText = await response.text();
//         if (responseText) {
//           responseData = JSON.parse(responseText);
//         }
//       } catch (parseError) {
//         console.log("Response was not JSON:", parseError);
//         // Not a JSON response, but the request was successful
//       }
      
//       // If successful, show success modal
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error("Error submitting application:", error);
//       Alert.alert(
//         "Application Failed",
//         `Unable to submit your application: ${error.message}`
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//     // Navigate back to job listings
//     navigation.navigate("apply");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={styles.headerIcon}>
//           <Ionicons name="briefcase" size={24} color="#fff" />
//         </View>
//         <Text style={styles.headerTitle}>Apply for Job</Text>
//       </View>

//       <View style={styles.content}>
//         <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Curriculum Vitae</Text>
//         {!cvFile ? (
//           <TouchableOpacity style={styles.uploadBox} onPress={handleUploadCV}>
//             <Ionicons name="document-outline" size={24} color="#999" />
//             <Text style={styles.uploadText}>Upload your CV Here</Text>
//             <Text style={styles.uploadSubtext}>(.pdf, .doc, .docx)</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.fileContainer}>
//             <View style={styles.fileInfo}>
//               <Ionicons name="document-text-outline" size={24} color="#666" />
//               <View style={styles.fileDetails}>
//                 <Text style={styles.fileName}>{cvFile.name}</Text>
//                 <Text style={styles.fileSize}>{cvFile.size}</Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={handleRemoveFile}>
//               <Ionicons name="close" size={24} color="#999" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
//           Portfolio URL (Optional)
//         </Text>
//         <View style={styles.inputContainer}>
//           <Ionicons name="link-outline" size={20} color="#999" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="https://your-portfolio.com"
//             value={portfolioUrl}
//             onChangeText={setPortfolioUrl}
//             autoCapitalize="none"
//           />
//         </View>
//         <Text style={styles.noteText}>
//           Your portfolio URL is for our records only and won't be sent with this application
//         </Text>

//         <TouchableOpacity
//           style={[
//             styles.submitButton,
//             isSubmitting && styles.submitButtonDisabled,
//           ]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.submitButtonText}>Submit Application</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <Modal visible={showSuccessModal} transparent={true} animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark" size={40} color="#fff" />
//             </View>
//             <Text style={styles.successTitle}>Application Submitted</Text>
//             <Text style={styles.successMessage}>
//               Your job application was successfully submitted. Wait for the
//               company to review and contact you.
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={closeSuccessModal}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: "#fff" 
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   backButton: {
//     padding: 5,
//     marginRight: 10,
//   },
//   headerIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: "#2563eb",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   headerTitle: { 
//     fontSize: 18, 
//     fontWeight: "bold" 
//   },
//   content: { 
//     padding: 20, 
//     flex: 1 
//   },
//   sectionTitle: { 
//     fontSize: 16, 
//     fontWeight: "600", 
//     marginBottom: 12 
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: { 
//     flex: 1, 
//     paddingVertical: 12, 
//     paddingHorizontal: 8 
//   },
//   noteText: {
//     fontSize: 12,
//     color: "#666",
//     fontStyle: "italic",
//     marginTop: 4,
//     marginBottom: 16,
//   },
//   uploadBox: {
//     height: 100,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderStyle: "dashed",
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   uploadText: { color: "#999", marginTop: 8 },
//   uploadSubtext: { color: "#999", fontSize: 12, marginTop: 4 },
//   fileContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   fileInfo: { flexDirection: "row", alignItems: "center" },
//   fileDetails: { marginLeft: 12 },
//   fileName: { fontSize: 14, color: "#333" },
//   fileSize: { fontSize: 12, color: "#999" },
//   submitButton: {
//     backgroundColor: "#2563eb",
//     borderRadius: 12,
//     padding: 16,
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   submitButtonDisabled: {
//     backgroundColor: "#93c5fd",
//   },
//   submitButtonText: { 
//     color: "#fff", 
//     fontSize: 16, 
//     fontWeight: "600" 
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 24,
//     width: "85%",
//     alignItems: "center",
//   },
//   successIcon: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: "#4ade80",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   successTitle: { 
//     fontSize: 18, 
//     fontWeight: "bold", 
//     marginBottom: 8 
//   },
//   successMessage: { 
//     textAlign: "center", 
//     color: "#666", 
//     marginBottom: 24,
//     lineHeight: 20,
//   },
//   closeButton: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   closeButtonText: { 
//     color: "#fff", 
//     fontWeight: "600" 
//   },
// });

// export default JobApplicationScreen;
