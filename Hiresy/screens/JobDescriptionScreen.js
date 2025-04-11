import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JobDescriptionScreen = ({ route, navigation }) => {
  const { jobDetails } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Job Card */}
        <View style={styles.header}>
          <View
            style={[
              styles.companyLogoContainer,
              { backgroundColor: jobDetails.color || "#4f46e5" },
            ]}
          >
            <Text style={styles.companyLogo}>
              {jobDetails.companyInitial || "C"}
            </Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.jobTitle}>{jobDetails.title}</Text>
            <Text style={styles.companyName}>{jobDetails.company}</Text>
            <Text style={styles.jobLocation}>{jobDetails.location}</Text>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{jobDetails.work_time}</Text>
          <Text style={styles.badge}>{jobDetails.work_place}</Text>
          <Text style={styles.badge}>
            {jobDetails.available_place} place(s)
          </Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.descriptionText}>{jobDetails.description}</Text>

          <Text style={styles.sectionTitle}>Author</Text>
          <Text style={styles.descriptionText}>{jobDetails.author}</Text>

          <Text style={styles.sectionTitle}>Contact Email</Text>
          <Text style={styles.descriptionText}>{jobDetails.email_address}</Text>

          <Text style={styles.sectionTitle}>Phone</Text>
          <Text style={styles.descriptionText}>{jobDetails.phone_address}</Text>

          <Text style={styles.sectionTitle}>Salary Range</Text>
          <Text style={styles.descriptionText}>
            {jobDetails.salary_min} - {jobDetails.salary_max} FCFA
          </Text>

          <Text style={styles.sectionTitle}>Application Deadline</Text>
          <Text style={styles.descriptionText}>
            {new Date(jobDetails.deadline).toLocaleDateString()}
          </Text>

          <Text style={styles.sectionTitle}>Job Location</Text>
          <Text style={styles.descriptionText}>{jobDetails.location}</Text>
        </View>

        {/* Apply Button */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate("apply", { jobDetails })}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  placeholder: { width: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  companyLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  companyLogo: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  headerTextContainer: { flex: 1 },
  jobTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  companyName: { fontSize: 14, color: "#666", marginBottom: 2 },
  jobLocation: { fontSize: 14, color: "#999" },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  badge: {
    backgroundColor: "#e0e7ff",
    color: "#1e40af",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "600",
  },
  descriptionContainer: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  descriptionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 14,
  },
  applyButton: {
    backgroundColor: "#2563eb",
    margin: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});

export default JobDescriptionScreen;

// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const JobDescriptionScreen = ({ route, navigation }) => {
//   const { jobDetails } = route.params;

//   return (
//     <View style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="arrow-back" size={24} color="#333" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Job Details</Text>
//           <View style={styles.placeholder} />
//         </View>

//         {/* Job Card */}
//         <View style={styles.header}>
//           <View
//             style={[
//               styles.companyLogoContainer,
//               { backgroundColor: jobDetails.color },
//             ]}
//           >
//             <Text style={styles.companyLogo}>{jobDetails.companyInitial}</Text>
//           </View>
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.jobTitle}>{jobDetails.title}</Text>
//             <Text style={styles.companyName}>{jobDetails.company}</Text>
//             <Text style={styles.jobLocation}>{jobDetails.location}</Text>
//           </View>
//         </View>

//         {/* Description */}
//         <View style={styles.descriptionContainer}>
//           <Text style={styles.sectionTitle}>Job Description</Text>
//           <Text style={styles.descriptionText}>
//             This is a placeholder job description. Add real job
//             responsibilities, qualifications, and benefits here to better inform
//             applicants.
//           </Text>
//         </View>

//         {/* Apply Button */}
//         <TouchableOpacity style={styles.applyButton}>
//           <Text style={styles.applyButtonText}>Apply Now</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 20,
//   },
//   backButton: { padding: 5 },
//   headerTitle: { fontSize: 18, fontWeight: "bold" },
//   placeholder: { width: 24 },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   companyLogoContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   companyLogo: { color: "#fff", fontSize: 24, fontWeight: "bold" },
//   headerTextContainer: { flex: 1 },
//   jobTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
//   companyName: { fontSize: 14, color: "#666", marginBottom: 2 },
//   jobLocation: { fontSize: 14, color: "#999" },
//   descriptionContainer: { paddingHorizontal: 20, marginTop: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
//   descriptionText: { fontSize: 14, color: "#333", lineHeight: 22 },
//   applyButton: {
//     backgroundColor: "#2563eb",
//     margin: 20,
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   applyButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
// });

// export default JobDescriptionScreen;
