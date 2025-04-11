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
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JobApplicationScreen = ({ route, navigation }) => {
  const { jobId } = route.params;
  const [cvFile, setCvFile] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadCV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (result?.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setCvFile({
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

  const handleUploadPortfolio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result?.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setPortfolioFile({
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

  const handleRemoveFile = (fileType) => {
    if (fileType === "cv") {
      setCvFile(null);
    } else {
      setPortfolioFile(null);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!cvFile) {
      Alert.alert("Missing CV", "Please upload your CV before applying.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Get JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("jwt_token");

      if (!token) {
        Alert.alert(
          "Authentication Required",
          "Please log in to apply for jobs."
        );
        setIsSubmitting(false);
        navigation.navigate("Login"); // Assuming you have a Login screen
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append("job_offer_id", jobId);

      // Append CV file
      formData.append("cv", {
        uri: cvFile.uri,
        name: cvFile.name,
        type: cvFile.type,
      });

      // If portfolio URL is provided, append it
      if (portfolioUrl) {
        formData.append("portfolio_url", portfolioUrl);
      }

      // If portfolio file is uploaded, append it
      if (portfolioFile) {
        formData.append("portfolio", {
          uri: portfolioFile.uri,
          name: portfolioFile.name,
          type: portfolioFile.type,
        });
      }

      // Send application to the API
      const response = await fetch("http://192.168.1.101:5000/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
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
        <Text style={styles.headerTitle}>Apply Job</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Curriculum Vitae</Text>

        {!cvFile ? (
          <TouchableOpacity style={styles.uploadBox} onPress={handleUploadCV}>
            <Ionicons name="document-outline" size={24} color="#999" />
            <Text style={styles.uploadText}>Upload your CV Here</Text>
            <Text style={styles.uploadSubtext}>(.pdf, .doc, .docx)</Text>
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
            <TouchableOpacity onPress={() => handleRemoveFile("cv")}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Portfolio (Optional)
        </Text>

        {!portfolioFile ? (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={handleUploadPortfolio}
          >
            <Ionicons name="document-outline" size={24} color="#999" />
            <Text style={styles.uploadText}>Upload your Portfolio</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.fileContainer}>
            <View style={styles.fileInfo}>
              <Ionicons name="document-text-outline" size={24} color="#666" />
              <View style={styles.fileDetails}>
                <Text style={styles.fileName}>{portfolioFile.name}</Text>
                <Text style={styles.fileSize}>{portfolioFile.size}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveFile("portfolio")}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.orText}>or use link portfolio</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputPrefix}>https://</Text>
          <TextInput
            style={styles.input}
            placeholder="your-portfolio.com"
            value={portfolioUrl}
            onChangeText={setPortfolioUrl}
          />
        </View>

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
            <Text style={styles.submitButtonText}>Send Application</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Apply Success</Text>
            <Text style={styles.successMessage}>
              Your job application was successfully delivered. Wait for the
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
  container: { flex: 1, backgroundColor: "#fff" },
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
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  content: { padding: 16, flex: 1 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
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
  orText: { textAlign: "center", color: "#999", marginVertical: 12 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputPrefix: { color: "#999" },
  input: { flex: 1, paddingVertical: 12, paddingHorizontal: 8 },
  submitButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: "auto",
  },
  submitButtonDisabled: {
    backgroundColor: "#88c4f8",
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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
    width: "80%",
    alignItems: "center",
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#8BC34A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  successMessage: { textAlign: "center", color: "#666", marginBottom: 24 },
  closeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
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
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import { Ionicons } from "@expo/vector-icons";

// const JobApplicationScreen = ({ navigation }) => {
//   const [cvFile, setCvFile] = useState(null);
//   const [portfolioFile, setPortfolioFile] = useState(null);
//   const [portfolioUrl, setPortfolioUrl] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const handleUploadCV = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "*/*",
//       copyToCacheDirectory: true,
//     });
//     if (result?.assets && result.assets.length > 0) {
//       const file = result.assets[0];
//       setCvFile({ name: file.name, size: `${Math.round(file.size / 1024)}KB` });
//     }
//   };

//   const handleUploadPortfolio = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "*/*",
//       copyToCacheDirectory: true,
//     });
//     if (result?.assets && result.assets.length > 0) {
//       const file = result.assets[0];
//       setPortfolioFile({
//         name: file.name,
//         size: `${Math.round(file.size / 1024)}KB`,
//       });
//     }
//   };

//   const handleRemoveFile = (fileType) => {
//     if (fileType === "cv") {
//       setCvFile(null);
//     } else {
//       setPortfolioFile(null);
//     }
//   };

//   const handleSubmit = () => {
//     // In a real app, you'd send this to a backend server
//     setShowSuccessModal(true);
//   };

//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//     // navigation.navigate('JobListings'); // Enable if using navigation
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerIcon}>
//           <Ionicons name="briefcase" size={24} color="#fff" />
//         </View>
//         <Text style={styles.headerTitle}>Apply Job</Text>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.sectionTitle}>Curriculum Vitae</Text>

//         {!cvFile ? (
//           <TouchableOpacity style={styles.uploadBox} onPress={handleUploadCV}>
//             <Ionicons name="document-outline" size={24} color="#999" />
//             <Text style={styles.uploadText}>Upload your CV Here</Text>
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
//             <TouchableOpacity onPress={() => handleRemoveFile("cv")}>
//               <Ionicons name="close" size={24} color="#999" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Portfolio</Text>

//         {!portfolioFile ? (
//           <TouchableOpacity
//             style={styles.uploadBox}
//             onPress={handleUploadPortfolio}
//           >
//             <Ionicons name="document-outline" size={24} color="#999" />
//             <Text style={styles.uploadText}>Upload your Portfolio</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.fileContainer}>
//             <View style={styles.fileInfo}>
//               <Ionicons name="document-text-outline" size={24} color="#666" />
//               <View style={styles.fileDetails}>
//                 <Text style={styles.fileName}>{portfolioFile.name}</Text>
//                 <Text style={styles.fileSize}>{portfolioFile.size}</Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={() => handleRemoveFile("portfolio")}>
//               <Ionicons name="close" size={24} color="#999" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <Text style={styles.orText}>or use link portfolio</Text>

//         <View style={styles.inputContainer}>
//           <Text style={styles.inputPrefix}>https://</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="your-portfolio.com"
//             value={portfolioUrl}
//             onChangeText={setPortfolioUrl}
//           />
//         </View>

//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>Send Apply</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal visible={showSuccessModal} transparent={true} animationType="fade">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark" size={40} color="#fff" />
//             </View>
//             <Text style={styles.successTitle}>Apply Success</Text>
//             <Text style={styles.successMessage}>
//               Your job apply successfully delivered. Wait for the company to
//               accept and follow up with you.
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
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   headerIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: "#2196F3",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   headerTitle: { fontSize: 18, fontWeight: "bold" },
//   content: { padding: 16, flex: 1 },
//   sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
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
//   orText: { textAlign: "center", color: "#999", marginVertical: 12 },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 24,
//   },
//   inputPrefix: { color: "#999" },
//   input: { flex: 1, paddingVertical: 12, paddingHorizontal: 8 },
//   submitButton: {
//     backgroundColor: "#2196F3",
//     borderRadius: 8,
//     padding: 16,
//     alignItems: "center",
//     marginTop: "auto",
//   },
//   submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
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
//     width: "80%",
//     alignItems: "center",
//   },
//   successIcon: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: "#8BC34A",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   successTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
//   successMessage: { textAlign: "center", color: "#666", marginBottom: 24 },
//   closeButton: {
//     backgroundColor: "#2196F3",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   closeButtonText: { color: "#fff", fontWeight: "bold" },
// });

// export default JobApplicationScreen;
