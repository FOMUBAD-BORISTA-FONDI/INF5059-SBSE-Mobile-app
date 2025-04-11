import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const JobOpportunityScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.1.101:5000/job_offers");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load jobs. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const categories = [
    { id: 1, name: "All Jobs", isActive: true },
    { id: 2, name: "Design", isActive: false },
    { id: 3, name: "Product Management", isActive: false },
    { id: 4, name: "Engineering", isActive: false },
  ];

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("JobDescription", {
          jobId: item.id, // Pass job ID instead of full details
        })
      }
      style={styles.jobItem}
    >
      <View style={styles.jobInfo}>
        <View
          style={[
            styles.companyLogo,
            { backgroundColor: item.logoColor || "#2563eb" },
          ]}
        >
          <Text style={styles.companyInitial}>
            {item.company ? item.company.charAt(0) : "C"}
          </Text>
        </View>
        <View style={styles.jobDetails}>
          <Text style={styles.jobCompany}>{item.company}</Text>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobSalary}>
            {item.salary} · {item.location}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Job Opportunity</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search Job here..."
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryPill,
              category.isActive && styles.activeCategoryPill,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                category.isActive && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={styles.loadingText}>Loading jobs...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchJobs}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.jobList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No job offers available at the moment.
            </Text>
          }
        />
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons name="map-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItemActive}
          onPress={() => navigation.navigate("JobOpportunity")}
        >
          <Ionicons name="briefcase" size={20} color="#fff" />
          <Text style={styles.navTextActive}>Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Account")}
        >
          <Ionicons name="person-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchInput: { flex: 1, marginLeft: 10 },
  filterButton: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: { paddingHorizontal: 1, marginBottom: 0 },
  categoryPill: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f7fa",
    marginHorizontal: 5,
  },
  activeCategoryPill: { backgroundColor: "#2563eb" },
  categoryText: { color: "#666" },
  activeCategoryText: { color: "#fff", fontWeight: "500" },
  jobList: { paddingHorizontal: 20, paddingBottom: 100 },
  jobItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f2f5",
  },
  jobInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  companyInitial: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  jobDetails: { flex: 1 },
  jobCompany: { fontSize: 12, color: "#666", marginBottom: 2 },
  jobTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  jobSalary: { fontSize: 12, color: "#666" },
  favoriteButton: { padding: 8 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
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
    paddingBottom: 50,
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
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f2f5",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: "center", padding: 8 },
  navItemActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  navTextActive: { color: "#fff", marginLeft: 5, fontWeight: "500" },
});

export default JobOpportunityScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const JobOpportunityScreen = () => {
//   const navigation = useNavigation();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://192.168.1.101:5000/job_offers");

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       setJobs(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setError("Failed to load jobs. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const categories = [
//     { id: 1, name: "All Jobs", isActive: true },
//     { id: 2, name: "Design", isActive: false },
//     { id: 3, name: "Product Management", isActive: false },
//     { id: 4, name: "Engineering", isActive: false },
//   ];

//   const renderJobItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("JobDescription", {
//           jobDetails: {
//             title: item.title,
//             salary: item.salary,
//             location: item.location,
//             company: item.company,
//             color: item.logoColor || "#2563eb", // Fallback color if not provided by API
//             companyInitial: item.company ? item.company.charAt(0) : "C",
//           },
//         })
//       }
//       style={styles.jobItem}
//     >
//       <View style={styles.jobInfo}>
//         <View
//           style={[
//             styles.companyLogo,
//             { backgroundColor: item.logoColor || "#2563eb" },
//           ]}
//         >
//           <Text style={styles.companyInitial}>
//             {item.company ? item.company.charAt(0) : "C"}
//           </Text>
//         </View>
//         <View style={styles.jobDetails}>
//           <Text style={styles.jobCompany}>{item.company}</Text>
//           <Text style={styles.jobTitle}>{item.title}</Text>
//           <Text style={styles.jobSalary}>
//             {item.salary} · {item.location}
//           </Text>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.favoriteButton}>
//         <Ionicons name="heart-outline" size={20} color="#999" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Job Opportunity</Text>
//       </View>

//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search-outline" size={20} color="#999" />
//           <TextInput
//             placeholder="Search Job here..."
//             style={styles.searchInput}
//           />
//         </View>
//         <TouchableOpacity style={styles.filterButton}>
//           <Ionicons name="options-outline" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoriesContainer}
//       >
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category.id}
//             style={[
//               styles.categoryPill,
//               category.isActive && styles.activeCategoryPill,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.categoryText,
//                 category.isActive && styles.activeCategoryText,
//               ]}
//             >
//               {category.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#2563eb" />
//           <Text style={styles.loadingText}>Loading jobs...</Text>
//         </View>
//       ) : error ? (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={fetchJobs}>
//             <Text style={styles.retryButtonText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <FlatList
//           data={jobs}
//           renderItem={renderJobItem}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={styles.jobList}
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>
//               No job offers available at the moment.
//             </Text>
//           }
//         />
//       )}

//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Home")}
//         >
//           <Ionicons name="home-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Map")}
//         >
//           <Ionicons name="map-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItemActive}
//           onPress={() => navigation.navigate("JobOpportunity")}
//         >
//           <Ionicons name="briefcase" size={20} color="#fff" />
//           <Text style={styles.navTextActive}>Job</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Account")}
//         >
//           <Ionicons name="person-outline" size={24} color="#999" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
//   headerTitle: { fontSize: 22, fontWeight: "bold" },
//   searchContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f7fa",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   searchInput: { flex: 1, marginLeft: 10 },
//   filterButton: {
//     backgroundColor: "#2563eb",
//     borderRadius: 10,
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   categoriesContainer: { paddingHorizontal: 1, marginBottom: 0 },
//   categoryPill: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f5f7fa",
//     marginHorizontal: 5,
//   },
//   activeCategoryPill: { backgroundColor: "#2563eb" },
//   categoryText: { color: "#666" },
//   activeCategoryText: { color: "#fff", fontWeight: "500" },
//   jobList: { paddingHorizontal: 20, paddingBottom: 100 },
//   jobItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f2f5",
//   },
//   jobInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
//   companyLogo: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   companyInitial: { color: "#fff", fontWeight: "bold", fontSize: 18 },
//   jobDetails: { flex: 1 },
//   jobCompany: { fontSize: 12, color: "#666", marginBottom: 2 },
//   jobTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
//   jobSalary: { fontSize: 12, color: "#666" },
//   favoriteButton: { padding: 8 },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: 50,
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
//     paddingBottom: 50,
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
//   emptyText: {
//     textAlign: "center",
//     color: "#666",
//     marginTop: 40,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#f0f2f5",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: { alignItems: "center", padding: 8 },
//   navItemActive: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#2563eb",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   navTextActive: { color: "#fff", marginLeft: 5, fontWeight: "500" },
// });

// export default JobOpportunityScreen;

// Old-static data from the old code.

// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const JobOpportunityScreen = () => {
//   const navigation = useNavigation();

//   const jobs = [
//     {
//       id: 1,
//       title: "Software Engineer",
//       salary: "$3000",
//       location: "Jakarta, Indonesia",
//       company: "Gojek",
//       logoColor: "#50B83C",
//     },
//     {
//       id: 2,
//       title: "Data Analyst",
//       salary: "$2500",
//       location: "Jakarta, Indonesia",
//       company: "Grab",
//       logoColor: "#00B14F",
//     },
//     {
//       id: 3,
//       title: "IT Project Manager",
//       salary: "$4000",
//       location: "Jakarta, Indonesia",
//       company: "Twitter",
//       logoColor: "#1DA1F2",
//     },
//     {
//       id: 4,
//       title: "Cybersecurity Analyst",
//       salary: "$3900",
//       location: "Jakarta, Indonesia",
//       company: "Mozilla",
//       logoColor: "#FF9400",
//     },
//     {
//       id: 5,
//       title: "Data Scientist",
//       salary: "$4200",
//       location: "Jakarta, Indonesia",
//       company: "Societe",
//       logoColor: "#E91E63",
//     },
//   ];

//   const categories = [
//     { id: 1, name: "All Jobs", isActive: true },
//     { id: 2, name: "Design", isActive: false },
//     { id: 3, name: "Product Management", isActive: false },
//     { id: 4, name: "Engineering", isActive: false },
//   ];

//   const renderJobItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate("JobDescription", {
//           jobDetails: {
//             title: item.title,
//             salary: item.salary,
//             location: item.location,
//             company: item.company,
//             color: item.logoColor,
//             companyInitial: item.company.charAt(0),
//           },
//         })
//       }
//       style={styles.jobItem}
//     >
//       <View style={styles.jobInfo}>
//         <View style={[styles.companyLogo, { backgroundColor: item.logoColor }]}>
//           <Text style={styles.companyInitial}>{item.company.charAt(0)}</Text>
//         </View>
//         <View style={styles.jobDetails}>
//           <Text style={styles.jobCompany}>{item.company}</Text>
//           <Text style={styles.jobTitle}>{item.title}</Text>
//           <Text style={styles.jobSalary}>
//             {item.salary} · {item.location}
//           </Text>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.favoriteButton}>
//         <Ionicons name="heart-outline" size={20} color="#999" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Job Opportunity</Text>
//       </View>

//       <View style={styles.searchContainer}>
//         <View style={styles.searchBar}>
//           <Ionicons name="search-outline" size={20} color="#999" />
//           <TextInput
//             placeholder="Search Job here..."
//             style={styles.searchInput}
//           />
//         </View>
//         <TouchableOpacity style={styles.filterButton}>
//           <Ionicons name="options-outline" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoriesContainer}
//       >
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category.id}
//             style={[
//               styles.categoryPill,
//               category.isActive && styles.activeCategoryPill,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.categoryText,
//                 category.isActive && styles.activeCategoryText,
//               ]}
//             >
//               {category.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <FlatList
//         data={jobs}
//         renderItem={renderJobItem}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.jobList}
//       />

//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Home")}
//         >
//           <Ionicons name="home-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Map")}
//         >
//           <Ionicons name="map-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItemActive}
//           onPress={() => navigation.navigate("JobOpportunity")}
//         >
//           <Ionicons name="briefcase" size={20} color="#fff" />
//           <Text style={styles.navTextActive}>Job</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Account")}
//         >
//           <Ionicons name="person-outline" size={24} color="#999" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
//   headerTitle: { fontSize: 22, fontWeight: "bold" },
//   searchContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f5f7fa",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   searchInput: { flex: 1, marginLeft: 10 },
//   filterButton: {
//     backgroundColor: "#2563eb",
//     borderRadius: 10,
//     width: 44,
//     height: 44,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   categoriesContainer: { paddingHorizontal: 15, marginBottom: 15 },
//   categoryPill: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f5f7fa",
//     marginHorizontal: 5,
//   },
//   activeCategoryPill: { backgroundColor: "#2563eb" },
//   categoryText: { color: "#666" },
//   activeCategoryText: { color: "#fff", fontWeight: "500" },
//   jobList: { paddingHorizontal: 20, paddingBottom: 100 },
//   jobItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//     paddingBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f2f5",
//   },
//   jobInfo: { flexDirection: "row", alignItems: "center", flex: 1 },
//   companyLogo: {
//     width: 40,
//     height: 40,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   companyInitial: { color: "#fff", fontWeight: "bold", fontSize: 18 },
//   jobDetails: { flex: 1 },
//   jobCompany: { fontSize: 12, color: "#666", marginBottom: 2 },
//   jobTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
//   jobSalary: { fontSize: 12, color: "#666" },
//   favoriteButton: { padding: 8 },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#f0f2f5",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: { alignItems: "center", padding: 8 },
//   navItemActive: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#2563eb",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   navTextActive: { color: "#fff", marginLeft: 5, fontWeight: "500" },
// });

// export default JobOpportunityScreen;
