import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const JobDescriptionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { jobId } = route.params;
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      // Use the same base URL as your job list fetch
      const response = await fetch(`http://192.168.1.101:5000/job_offers/${jobId}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }

      const data = await response.json();
      setJob(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to load job details. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const handleApply = () => {
    // Navigate to the JobApplicationScreen with the job ID
    navigation.navigate("apply", { jobId: jobId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Details</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading job details...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchJobDetails}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : job ? (
        <>
          <ScrollView style={styles.contentContainer}>
            <View style={styles.jobHeader}>
              <View
                style={[
                  styles.companyLogo,
                  { backgroundColor: job.logoColor || "#2563eb" },
                ]}
              >
                <Text style={styles.companyInitial}>
                  {job.company ? job.company.charAt(0) : "C"}
                </Text>
              </View>
              <View style={styles.jobTitleContainer}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.companyName}>{job.company}</Text>
                <View style={styles.jobMetaInfo}>
                  <Text style={styles.jobLocation}>
                    <Ionicons name="location-outline" size={14} color="#666" /> {job.location}
                  </Text>
                  <Text style={styles.jobSalary}>
                    <Ionicons name="cash-outline" size={14} color="#666" /> {job.salary}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Job Description</Text>
              <Text style={styles.descriptionText}>{job.description}</Text>
            </View>

            {job.requirements && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Requirements</Text>
                {job.requirements.map((req, index) => (
                  <View key={index} style={styles.requirementItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.requirementText}>{req}</Text>
                  </View>
                ))}
              </View>
            )}

            {job.benefits && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Benefits</Text>
                {job.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#2563eb" />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Company</Text>
              <Text style={styles.companyDescription}>
                {job.companyDescription || 
                 `${job.company} is a leading company in the industry focused on innovation and growth.`}
              </Text>
            </View>
            
            {/* Adding padding at bottom for scrolling past apply button */}
            <View style={{ height: 100 }} />
          </ScrollView>

          <View style={styles.applyContainer}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Job not found</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  favoriteButton: {
    padding: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  jobHeader: {
    flexDirection: "row",
    marginBottom: 25,
  },
  companyLogo: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  companyInitial: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  jobTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  jobMetaInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  jobLocation: {
    fontSize: 14,
    color: "#666",
    marginRight: 15,
  },
  jobSalary: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2563eb",
    marginTop: 8,
    marginRight: 10,
  },
  requirementText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  benefitText: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginLeft: 10,
  },
  companyDescription: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  applyContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f2f5",
    padding: 20,
  },
  applyButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default JobDescriptionScreen;



// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// const JobDescriptionScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { jobId } = route.params;
  
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchJobDetails = async () => {
//     try {
//       setLoading(true);
//       // Use the same base URL as your job list fetch
//       const response = await fetch(`http://192.168.1.101:5000/job_offers/${jobId}`);

//       if (!response.ok) {
//         throw new Error(`Network response was not ok (${response.status})`);
//       }

//       const data = await response.json();
//       setJob(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching job details:", error);
//       setError("Failed to load job details. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails();
//   }, [jobId]);

//   const handleApply = () => {
//     Alert.alert(
//       "Application Submition",
//       "You are now about to apply to this job!",
//       [{ text: "Continue", onPress: () => navigation.navigate("apply") }]
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Job Details</Text>
//         <TouchableOpacity style={styles.favoriteButton}>
//           <Ionicons name="heart-outline" size={24} color="#999" />
//         </TouchableOpacity>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#2563eb" />
//           <Text style={styles.loadingText}>Loading job details...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={fetchJobDetails}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : job ? (
//         <>
//           <ScrollView style={styles.contentContainer}>
//             <View style={styles.jobHeader}>
//               <View
//                 style={[
//                   styles.companyLogo,
//                   { backgroundColor: job.logoColor || "#2563eb" },
//                 ]}
//               >
//                 <Text style={styles.companyInitial}>
//                   {job.company ? job.company.charAt(0) : "C"}
//                 </Text>
//               </View>
//               <View style={styles.jobTitleContainer}>
//                 <Text style={styles.jobTitle}>{job.title}</Text>
//                 <Text style={styles.companyName}>{job.company}</Text>
//                 <View style={styles.jobMetaInfo}>
//                   <Text style={styles.jobLocation}>
//                     <Ionicons name="location-outline" size={14} color="#666" /> {job.location}
//                   </Text>
//                   <Text style={styles.jobSalary}>
//                     <Ionicons name="cash-outline" size={14} color="#666" /> {job.salary}
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Job Description</Text>
//               <Text style={styles.descriptionText}>{job.description}</Text>
//             </View>

//             {job.requirements && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Requirements</Text>
//                 {job.requirements.map((req, index) => (
//                   <View key={index} style={styles.requirementItem}>
//                     <View style={styles.bulletPoint} />
//                     <Text style={styles.requirementText}>{req}</Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//             {job.benefits && (
//               <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Benefits</Text>
//                 {job.benefits.map((benefit, index) => (
//                   <View key={index} style={styles.benefitItem}>
//                     <Ionicons name="checkmark-circle" size={16} color="#2563eb" />
//                     <Text style={styles.benefitText}>{benefit}</Text>
//                   </View>
//                 ))}
//               </View>
//             )}

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>About Company</Text>
//               <Text style={styles.companyDescription}>
//                 {job.companyDescription || 
//                  `${job.company} is a leading company in the industry focused on innovation and growth.`}
//               </Text>
//             </View>
            
//             {/* Adding padding at bottom for scrolling past apply button */}
//             <View style={{ height: 100 }} />
//           </ScrollView>

//           <View style={styles.applyContainer}>
//             <TouchableOpacity
//               style={styles.applyButton}
//               onPress={handleApply}
//             >
//               <Text style={styles.applyButtonText}>Apply Now</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       ) : (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Job not found</Text>
//           <TouchableOpacity
//             style={styles.retryButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.retryButtonText}>Go Back</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f2f5",
//   },
//   backButton: {
//     padding: 5,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   favoriteButton: {
//     padding: 5,
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#666",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   errorText: {
//     color: "#ff3b30",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   retryButton: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   retryButtonText: {
//     color: "#fff",
//     fontWeight: "500",
//   },
//   jobHeader: {
//     flexDirection: "row",
//     marginBottom: 25,
//   },
//   companyLogo: {
//     width: 70,
//     height: 70,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   companyInitial: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 28,
//   },
//   jobTitleContainer: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   jobTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   companyName: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 5,
//   },
//   jobMetaInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   jobLocation: {
//     fontSize: 14,
//     color: "#666",
//     marginRight: 15,
//   },
//   jobSalary: {
//     fontSize: 14,
//     color: "#666",
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },
//   descriptionText: {
//     fontSize: 15,
//     color: "#333",
//     lineHeight: 22,
//   },
//   requirementItem: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 8,
//   },
//   bulletPoint: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#2563eb",
//     marginTop: 8,
//     marginRight: 10,
//   },
//   requirementText: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//     lineHeight: 22,
//   },
//   benefitItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   benefitText: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//     lineHeight: 22,
//     marginLeft: 10,
//   },
//   companyDescription: {
//     fontSize: 15,
//     color: "#333",
//     lineHeight: 22,
//   },
//   applyContainer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#f0f2f5",
//     padding: 20,
//   },
//   applyButton: {
//     backgroundColor: "#2563eb",
//     borderRadius: 12,
//     paddingVertical: 16,
//     alignItems: "center",
//   },
//   applyButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default JobDescriptionScreen;

