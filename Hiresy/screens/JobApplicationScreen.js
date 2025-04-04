import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobApplicationScreen = ({ navigation }) => {
  const [cvFile, setCvFile] = useState({ name: 'CV Borista test.pdf', size: '12KB' });
  const [portfolioFile, setPortfolioFile] = useState({ name: 'Portfolio Borista Test', size: '11KB' });
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUploadCV = () => {
    console.log('Upload CV pressed');
  };

const handleUploadPortfolio = () => {
  // In a real app, this would open the file picker
  console.log('Upload Portfolio pressed');
};

  const handleRemoveFile = (fileType) => {
    if (fileType === 'cv') {
      setCvFile(null);
    } else {
      setPortfolioFile(null);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would send the application data to a server
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // In a real app, this would navigate back to the job listings
    // navigation.navigate('JobListings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
            <TouchableOpacity onPress={() => handleRemoveFile('cv')}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Portfolio</Text>
        
        {!portfolioFile ? (
          <TouchableOpacity style={styles.uploadBox} onPress={handleUploadPortfolio}>
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
            <TouchableOpacity onPress={() => handleRemoveFile('portfolio')}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.orText}>or use link portfolio</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputPrefix}>https://</Text>
          <TextInput
            style={styles.input}
            placeholder="borista-portfolio.com"
            value={portfolioUrl}
            onChangeText={setPortfolioUrl}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Apply</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Apply Success</Text>
            <Text style={styles.successMessage}>
              Your job apply successfully deliver. wait for the company to accept and follow back to you.
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  uploadBox: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    color: '#999',
    marginTop: 8,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileDetails: {
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    color: '#333',
  },
  fileSize: {
    fontSize: 12,
    color: '#999',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputPrefix: {
    color: '#999',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successMessage: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default JobApplicationScreen;




// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Platform, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// // import * as DocumentPicker from 'expo-document-picker';
// import * as FileSystem from 'expo-file-system';

// const JobApplicationScreen = ({ navigation }) => {
//   const [cvFile, setCvFile] = useState(null);
//   const [portfolioFile, setPortfolioFile] = useState(null);
//   const [portfolioUrl, setPortfolioUrl] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   const pickCV = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//         copyToCacheDirectory: true,
//       });
      
//       if (result.canceled) {
//         console.log('User cancelled document picker');
//         return;
//       }
      
//       const fileInfo = result.assets[0];
      
//       // Check file size (limit to 5MB)
//       if (fileInfo.size > 5 * 1024 * 1024) {
//         Alert.alert('File too large', 'Please select a file smaller than 5MB');
//         return;
//       }
      
//       setCvFile({
//         name: fileInfo.name,
//         size: formatFileSize(fileInfo.size),
//         uri: fileInfo.uri,
//         type: fileInfo.mimeType,
//       });
//     } catch (error) {
//       console.log('Error picking document:', error);
//       Alert.alert('Error', 'Failed to select document');
//     }
//   };

//   const pickPortfolio = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ['application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//         copyToCacheDirectory: true,
//       });
      
//       if (result.canceled) {
//         console.log('User cancelled document picker');
//         return;
//       }
      
//       const fileInfo = result.assets[0];
      
//       // Check file size (limit to 10MB)
//       if (fileInfo.size > 10 * 1024 * 1024) {
//         Alert.alert('File too large', 'Please select a file smaller than 10MB');
//         return;
//       }
      
//       setPortfolioFile({
//         name: fileInfo.name,
//         size: formatFileSize(fileInfo.size),
//         uri: fileInfo.uri,
//         type: fileInfo.mimeType,
//       });
//     } catch (error) {
//       console.log('Error picking document:', error);
//       Alert.alert('Error', 'Failed to select document');
//     }
//   };

//   const handleRemoveFile = (fileType) => {
//     if (fileType === 'cv') {
//       setCvFile(null);
//     } else {
//       setPortfolioFile(null);
//     }
//   };

//   const validatePortfolioUrl = (url) => {
//     // Basic URL validation
//     const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
//     return urlPattern.test(url);
//   };

//   const handleSubmit = async () => {
//     // Validate required fields
//     if (!cvFile) {
//       Alert.alert('Required Field', 'Please upload your CV');
//       return;
//     }
    
//     if (!portfolioFile && !portfolioUrl) {
//       Alert.alert('Required Field', 'Please upload your portfolio or provide a portfolio URL');
//       return;
//     }
    
//     if (portfolioUrl && !validatePortfolioUrl(portfolioUrl)) {
//       Alert.alert('Invalid URL', 'Please enter a valid portfolio URL');
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // In a real app, here you would:
//       // 1. Create a FormData object
//       // 2. Append files and other data
//       // 3. Send it to your backend API
      
//       const formData = new FormData();
      
//       // Append CV file
//       formData.append('cv', {
//         uri: cvFile.uri,
//         name: cvFile.name,
//         type: cvFile.type,
//       });
      
//       // Append portfolio file if available
//       if (portfolioFile) {
//         formData.append('portfolio', {
//           uri: portfolioFile.uri,
//           name: portfolioFile.name,
//           type: portfolioFile.type,
//         });
//       }
      
//       // Append portfolio URL if available
//       if (portfolioUrl) {
//         formData.append('portfolioUrl', portfolioUrl);
//       }
      
//       // This is where you would normally send the data to your API
//       // const response = await fetch('https://your-api.com/apply', {
//       //   method: 'POST',
//       //   body: formData,
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data',
//       //   },
//       // });
      
//       // For demo purposes, we'll simulate a successful API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setIsSubmitting(false);
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error('Error submitting application:', error);
//       setIsSubmitting(false);
//       Alert.alert('Error', 'Failed to submit application. Please try again.');
//     }
//   };

//   const closeSuccessModal = () => {
//     setShowSuccessModal(false);
//     // Reset form after successful submission
//     setCvFile(null);
//     setPortfolioFile(null);
//     setPortfolioUrl('');
//     // In a real app, this would navigate back to the job listings
//     // navigation.navigate('JobListings');
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
//           <TouchableOpacity style={styles.uploadBox} onPress={pickCV}>
//             <Ionicons name="document-outline" size={24} color="#999" />
//             <Text style={styles.uploadText}>Upload your CV Here</Text>
//             <Text style={styles.uploadSubtext}>PDF, DOC, or DOCX (Max 5MB)</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.fileContainer}>
//             <View style={styles.fileInfo}>
//               <Ionicons name="document-text-outline" size={24} color="#666" />
//               <View style={styles.fileDetails}>
//                 <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">{cvFile.name}</Text>
//                 <Text style={styles.fileSize}>{cvFile.size}</Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={() => handleRemoveFile('cv')}>
//               <Ionicons name="close" size={24} color="#999" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Portfolio</Text>
        
//         {!portfolioFile ? (
//           <TouchableOpacity style={styles.uploadBox} onPress={pickPortfolio}>
//             <Ionicons name="document-outline" size={24} color="#999" />
//             <Text style={styles.uploadText}>Upload your Portfolio</Text>
//             <Text style={styles.uploadSubtext}>PDF, DOC, DOCX, or ZIP (Max 10MB)</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.fileContainer}>
//             <View style={styles.fileInfo}>
//               <Ionicons name="document-text-outline" size={24} color="#666" />
//               <View style={styles.fileDetails}>
//                 <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">{portfolioFile.name}</Text>
//                 <Text style={styles.fileSize}>{portfolioFile.size}</Text>
//               </View>
//             </View>
//             <TouchableOpacity onPress={() => handleRemoveFile('portfolio')}>
//               <Ionicons name="close" size={24} color="#999" />
//             </TouchableOpacity>
//           </View>
//         )}

//         <Text style={styles.orText}>or use link portfolio</Text>
        
//         <View style={styles.inputContainer}>
//           <Text style={styles.inputPrefix}>https://</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="portfoliojohan.com"
//             value={portfolioUrl}
//             onChangeText={setPortfolioUrl}
//             autoCapitalize="none"
//             autoCorrect={false}
//           />
//         </View>

//         <TouchableOpacity 
//           style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <Text style={styles.submitButtonText}>
//             {isSubmitting ? 'Sending...' : 'Send Apply'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Success Modal */}
//       <Modal
//         visible={showSuccessModal}
//         transparent={true}
//         animationType="fade"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark" size={40} color="#fff" />
//             </View>
//             <Text style={styles.successTitle}>Apply Success</Text>
//             <Text style={styles.successMessage}>
//               Your job apply successfully deliver. wait for the company to accept and follow back to you.
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
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: '#2196F3',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   content: {
//     padding: 16,
//     flex: 1,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   uploadBox: {
//     height: 100,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   uploadText: {
//     color: '#999',
//     marginTop: 8,
//   },
//   uploadSubtext: {
//     color: '#bbb',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   fileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   fileInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   fileDetails: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   fileName: {
//     fontSize: 14,
//     color: '#333',
//   },
//   fileSize: {
//     fontSize: 12,
//     color: '#999',
//   },
//   orText: {
//     textAlign: 'center',
//     color: '#999',
//     marginVertical: 12,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     marginBottom: 24,
//   },
//   inputPrefix: {
//     color: '#999',
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 8,
//   },
//   submitButton: {
//     backgroundColor: '#2196F3',
//     borderRadius: 8,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 'auto',
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#90CAF9',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 24,
//     width: '80%',
//     alignItems: 'center',
//   },
//   successIcon: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: '#8BC34A',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   successTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   successMessage: {
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 24,
//   },
//   closeButton: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default JobApplicationScreen;


