import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        // Get token from AsyncStorage
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        // Get user ID from AsyncStorage or another source
        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
          setError("No user ID found");
          setLoading(false);
          return;
        }

        // Make API call to get user data
        const response = await fetch(
          `http://192.168.1.101:5000/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Sample trending job data
  const trendingJobs = [
    {
      id: 1,
      title: "Creative",
      subtitle: "Video Editor",
      available: "30+ Job Available",
      icon: "videocam-outline",
      color: "#2563eb",
    },
    {
      id: 2,
      title: "UI/UX",
      subtitle: "Designer",
      available: "24+ Job Available",
      icon: "color-palette-outline",
      color: "#9333ea",
    },
    {
      id: 3,
      title: "Front-End",
      subtitle: "Developer",
      available: "40+ Job Available",
      icon: "code-slash-outline",
      color: "#16a34a",
    },
    {
      id: 4,
      title: "Product",
      subtitle: "Manager",
      available: "15+ Job Available",
      icon: "briefcase-outline",
      color: "#ea580c",
    },
    {
      id: 5,
      title: "Data",
      subtitle: "Scientist",
      available: "20+ Job Available",
      icon: "analytics-outline",
      color: "#0891b2",
    },
  ];

  // Sample latest jobs data - enhanced with description and qualifications
  const latestJobs = [
    {
      id: 1,
      title: "UX Designer",
      salary: "$250-$450",
      location: "Fulltime, Remote/Onsite",
      company: "Visionary",
      companyInitial: "V",
      color: "#192252",
      description:
        "A UX Designer creates user-friendly interfaces and experiences. They conduct user research, create wireframes and prototypes, and work closely with developers to implement designs.",
      qualifications: [
        "Bachelor's degree in Design or related field",
        "Minimum 2 years of UX design experience",
        "Proficiency in Figma, Sketch, or Adobe XD",
        "Strong portfolio showcasing UI/UX projects",
      ],
      aboutCompany:
        "Visionary is a design-focused tech company that creates innovative digital products for global clients. Founded in 2015, they specialize in creating intuitive and beautiful user experiences.",
    },
    {
      id: 2,
      title: "Data Analyst",
      salary: "$350-$550",
      location: "Fulltime, Remote/Onsite",
      company: "Automate AI",
      companyInitial: "A",
      color: "#527570",
      description:
        "A Data Analyst collects, processes, and performs statistical analyses on large datasets. They identify trends, create visualizations, and provide data-driven insights to inform business decisions.",
      qualifications: [
        "Bachelor's degree in Statistics, Mathematics, or related field",
        "Experience with SQL, Python, or R",
        "Knowledge of data visualization tools like Tableau or Power BI",
        "Strong analytical and problem-solving skills",
      ],
      aboutCompany:
        "Automate AI is a cutting-edge technology company specializing in artificial intelligence and machine learning solutions. They help businesses automate processes and extract valuable insights from data.",
    },
    {
      id: 3,
      title: "React Developer",
      salary: "$400-$600",
      location: "Fulltime, Remote",
      company: "TechVibe",
      companyInitial: "T",
      color: "#2563eb",
      description:
        "A React Developer builds user interfaces using React.js. They create reusable components, manage application state, and ensure high performance on both web and mobile platforms.",
      qualifications: [
        "Bachelor's degree in Computer Science or related field",
        "Strong knowledge of JavaScript, HTML, and CSS",
        "Experience with React.js and React Native",
        "Familiarity with Redux, Context API, and React Hooks",
      ],
      aboutCompany:
        "TechVibe is a dynamic tech startup focused on creating innovative web and mobile applications. Their team of passionate developers works on cutting-edge projects for clients across various industries.",
    },
    {
      id: 4,
      title: "Marketing Lead",
      salary: "$300-$500",
      location: "Fulltime, Onsite",
      company: "GrowthGuru",
      companyInitial: "G",
      color: "#16a34a",
      description:
        "A Marketing Lead develops and implements marketing strategies to promote products or services. They conduct market research, manage campaigns, and analyze performance metrics to optimize marketing efforts.",
      qualifications: [
        "Bachelor's degree in Marketing or related field",
        "Minimum 3 years of marketing experience",
        "Experience with digital marketing tools and analytics",
        "Strong communication and leadership skills",
      ],
      aboutCompany:
        "GrowthGuru is a marketing agency that helps businesses achieve sustainable growth through innovative marketing strategies. They specialize in digital marketing, content creation, and brand development.",
    },
    {
      id: 5,
      title: "Project Manager",
      salary: "$450-$650",
      location: "Contract, Remote",
      company: "Projectify",
      companyInitial: "P",
      color: "#9333ea",
      description:
        "A Project Manager plans, executes, and closes projects successfully. They define project scope, create timelines, manage resources, and ensure deliverables meet quality standards.",
      qualifications: [
        "Bachelor's degree in Business Administration or related field",
        "PMP certification preferred",
        "Experience with project management software",
        "Strong leadership and communication skills",
      ],
      aboutCompany:
        "Projectify is a project management consulting firm that helps organizations improve their project delivery processes. They offer tools and methodologies to enhance efficiency and project success rates.",
    },
  ];

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth - 20 * 2; // Accounting for horizontal margins

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / cardWidth);
    setActiveCardIndex(currentIndex);
  };

  // Helper function to truncate username if too long
  const formatUsername = (username) => {
    if (!username) return "";
    return username.length > 10 ? `${username.substring(0, 10)}...` : username;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            {loading ? (
              <ActivityIndicator size="small" color="#2563eb" />
            ) : error ? (
              <Text style={styles.userName}>Guest User</Text>
            ) : (
              <Text style={styles.userName}>
                {formatUsername(userData?.username)}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
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

      <ScrollView style={styles.content}>
        {/* Trending Job Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Job</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>Show More</Text>
          </TouchableOpacity>
        </View>

        {/* Trending Job Cards - Horizontal Scrollable */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.trendingCardsContainer}
        >
          {trendingJobs.map((job) => (
            <View
              key={job.id}
              style={[
                styles.trendingCard,
                { backgroundColor: job.color, width: cardWidth },
              ]}
            >
              <View style={styles.trendingCardContent}>
                <View>
                  <Text style={styles.trendingJobTitle}>{job.title}</Text>
                  <Text style={styles.trendingJobTitle}>{job.subtitle}</Text>
                  <View style={styles.jobStats}>
                    <Text style={styles.jobStat}>{job.available}</Text>
                  </View>
                </View>
                <View style={styles.cameraIconContainer}>
                  <Ionicons name={job.icon} size={32} color="#fff" />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.paginationDotsContainer}>
          {trendingJobs.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                activeCardIndex === index ? styles.activeDot : {},
              ]}
            />
          ))}
        </View>

        {/* Latest Jobs Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Jobs</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>Show More</Text>
          </TouchableOpacity>
        </View>

        {/* Job Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <TouchableOpacity
            style={[styles.categoryPill, styles.activeCategoryPill]}
          >
            <Text style={styles.activeCategoryText}>All Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Design</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Product Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Marketing digital</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Software Development</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Artificial intelligence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Datascience</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* job cards with linked */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.jobCardsScrollView}
          contentContainerStyle={styles.jobCardsContentContainer}
        >
          {latestJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              style={[styles.jobCard, { backgroundColor: job.color }]}
              onPress={() =>
                navigation.navigate("JobDetail", { jobDetails: job })
              }
            >
              <Text style={styles.jobTitle}>{job.title}</Text>
              <View style={styles.jobDetail}>
                <Ionicons name="cash-outline" size={14} color="#fff" />
                <Text style={styles.jobDetailText}>Salary {job.salary}</Text>
              </View>
              <View style={styles.jobDetail}>
                <Ionicons name="location-outline" size={14} color="#fff" />
                <Text style={styles.jobDetailText}>{job.location}</Text>
              </View>
              <View style={styles.companyInfo}>
                <View style={styles.companyLogo}>
                  <Text style={styles.companyLogoText}>
                    {job.companyInitial}
                  </Text>
                </View>
                <Text style={styles.companyName}>{job.company}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItemActive}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home" size={24} color="#fff" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons name="map-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("JobOpportunity")}
        >
          <Ionicons name="briefcase-outline" size={24} color="#999" />
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
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeMoreText: {
    fontSize: 14,
    color: "#2563eb",
  },
  trendingCardsContainer: {
    marginBottom: 10,
  },
  trendingCard: {
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
  },
  trendingCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  trendingJobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  jobStats: {
    marginTop: 10,
  },
  jobStat: {
    color: "#fff",
    opacity: 0.8,
    fontSize: 14,
  },
  cameraIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#2563eb",
    width: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  categoryPill: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  activeCategoryPill: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryText: {
    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
    fontWeight: "500",
  },
  jobCardsScrollView: {
    paddingHorizontal: 15,
  },
  jobCardsContentContainer: {
    paddingRight: 15,
  },
  jobCard: {
    width: 180,
    backgroundColor: "#192252",
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  jobDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  jobDetailText: {
    color: "#fff",
    opacity: 0.9,
    fontSize: 12,
    marginLeft: 5,
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  companyLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  companyLogoText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#192252",
  },
  companyName: {
    color: "#fff",
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
    padding: 8,
  },
  navItemActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  navTextActive: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default HomeScreen;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [activeCardIndex, setActiveCardIndex] = useState(0);

//   // Sample trending job data
//   const trendingJobs = [
//     {
//       id: 1,
//       title: "Creative",
//       subtitle: "Video Editor",
//       available: "30+ Job Available",
//       icon: "videocam-outline",
//       color: "#2563eb",
//     },
//     {
//       id: 2,
//       title: "UI/UX",
//       subtitle: "Designer",
//       available: "24+ Job Available",
//       icon: "color-palette-outline",
//       color: "#9333ea",
//     },
//     {
//       id: 3,
//       title: "Front-End",
//       subtitle: "Developer",
//       available: "40+ Job Available",
//       icon: "code-slash-outline",
//       color: "#16a34a",
//     },
//     {
//       id: 4,
//       title: "Product",
//       subtitle: "Manager",
//       available: "15+ Job Available",
//       icon: "briefcase-outline",
//       color: "#ea580c",
//     },
//     {
//       id: 5,
//       title: "Data",
//       subtitle: "Scientist",
//       available: "20+ Job Available",
//       icon: "analytics-outline",
//       color: "#0891b2",
//     },
//   ];

//   // Sample latest jobs data - enhanced with description and qualifications
//   const latestJobs = [
//     {
//       id: 1,
//       title: "UX Designer",
//       salary: "$250-$450",
//       location: "Fulltime, Remote/Onsite",
//       company: "Visionary",
//       companyInitial: "V",
//       color: "#192252",
//       description:
//         "A UX Designer creates user-friendly interfaces and experiences. They conduct user research, create wireframes and prototypes, and work closely with developers to implement designs.",
//       qualifications: [
//         "Bachelor's degree in Design or related field",
//         "Minimum 2 years of UX design experience",
//         "Proficiency in Figma, Sketch, or Adobe XD",
//         "Strong portfolio showcasing UI/UX projects",
//       ],
//       aboutCompany:
//         "Visionary is a design-focused tech company that creates innovative digital products for global clients. Founded in 2015, they specialize in creating intuitive and beautiful user experiences.",
//     },
//     {
//       id: 2,
//       title: "Data Analyst",
//       salary: "$350-$550",
//       location: "Fulltime, Remote/Onsite",
//       company: "Automate AI",
//       companyInitial: "A",
//       color: "#527570",
//       description:
//         "A Data Analyst collects, processes, and performs statistical analyses on large datasets. They identify trends, create visualizations, and provide data-driven insights to inform business decisions.",
//       qualifications: [
//         "Bachelor's degree in Statistics, Mathematics, or related field",
//         "Experience with SQL, Python, or R",
//         "Knowledge of data visualization tools like Tableau or Power BI",
//         "Strong analytical and problem-solving skills",
//       ],
//       aboutCompany:
//         "Automate AI is a cutting-edge technology company specializing in artificial intelligence and machine learning solutions. They help businesses automate processes and extract valuable insights from data.",
//     },
//     {
//       id: 3,
//       title: "React Developer",
//       salary: "$400-$600",
//       location: "Fulltime, Remote",
//       company: "TechVibe",
//       companyInitial: "T",
//       color: "#2563eb",
//       description:
//         "A React Developer builds user interfaces using React.js. They create reusable components, manage application state, and ensure high performance on both web and mobile platforms.",
//       qualifications: [
//         "Bachelor's degree in Computer Science or related field",
//         "Strong knowledge of JavaScript, HTML, and CSS",
//         "Experience with React.js and React Native",
//         "Familiarity with Redux, Context API, and React Hooks",
//       ],
//       aboutCompany:
//         "TechVibe is a dynamic tech startup focused on creating innovative web and mobile applications. Their team of passionate developers works on cutting-edge projects for clients across various industries.",
//     },
//     {
//       id: 4,
//       title: "Marketing Lead",
//       salary: "$300-$500",
//       location: "Fulltime, Onsite",
//       company: "GrowthGuru",
//       companyInitial: "G",
//       color: "#16a34a",
//       description:
//         "A Marketing Lead develops and implements marketing strategies to promote products or services. They conduct market research, manage campaigns, and analyze performance metrics to optimize marketing efforts.",
//       qualifications: [
//         "Bachelor's degree in Marketing or related field",
//         "Minimum 3 years of marketing experience",
//         "Experience with digital marketing tools and analytics",
//         "Strong communication and leadership skills",
//       ],
//       aboutCompany:
//         "GrowthGuru is a marketing agency that helps businesses achieve sustainable growth through innovative marketing strategies. They specialize in digital marketing, content creation, and brand development.",
//     },
//     {
//       id: 5,
//       title: "Project Manager",
//       salary: "$450-$650",
//       location: "Contract, Remote",
//       company: "Projectify",
//       companyInitial: "P",
//       color: "#9333ea",
//       description:
//         "A Project Manager plans, executes, and closes projects successfully. They define project scope, create timelines, manage resources, and ensure deliverables meet quality standards.",
//       qualifications: [
//         "Bachelor's degree in Business Administration or related field",
//         "PMP certification preferred",
//         "Experience with project management software",
//         "Strong leadership and communication skills",
//       ],
//       aboutCompany:
//         "Projectify is a project management consulting firm that helps organizations improve their project delivery processes. They offer tools and methodologies to enhance efficiency and project success rates.",
//     },
//   ];

//   const screenWidth = Dimensions.get("window").width;
//   const cardWidth = screenWidth - 20 * 2; // Accounting for horizontal margins

//   const handleScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(scrollPosition / cardWidth);
//     setActiveCardIndex(currentIndex);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.userInfo}>
//           <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//             <Image
//               source={{ uri: "https://i.pravatar.cc/100" }}
//               style={styles.avatar}
//             />
//           </TouchableOpacity>
//           <View>
//             <Text style={styles.greeting}>Good Morning,</Text>
//             <Text style={styles.userName}>Furel Teg...</Text>
//           </View>
//         </View>
//         <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
//           <Ionicons name="notifications-outline" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
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

//       <ScrollView style={styles.content}>
//         {/* Trending Job Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Trending Job</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeMoreText}>Show More</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Trending Job Cards - Horizontal Scrollable */}
//         <ScrollView
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//           style={styles.trendingCardsContainer}
//         >
//           {trendingJobs.map((job) => (
//             <View
//               key={job.id}
//               style={[
//                 styles.trendingCard,
//                 { backgroundColor: job.color, width: cardWidth },
//               ]}
//             >
//               <View style={styles.trendingCardContent}>
//                 <View>
//                   <Text style={styles.trendingJobTitle}>{job.title}</Text>
//                   <Text style={styles.trendingJobTitle}>{job.subtitle}</Text>
//                   <View style={styles.jobStats}>
//                     <Text style={styles.jobStat}>{job.available}</Text>
//                   </View>
//                 </View>
//                 <View style={styles.cameraIconContainer}>
//                   <Ionicons name={job.icon} size={32} color="#fff" />
//                 </View>
//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Pagination Dots */}
//         <View style={styles.paginationDotsContainer}>
//           {trendingJobs.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.paginationDot,
//                 activeCardIndex === index ? styles.activeDot : {},
//               ]}
//             />
//           ))}
//         </View>

//         {/* Latest Jobs Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Latest Jobs</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeMoreText}>Show More</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Job Categories */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.categoriesContainer}
//         >
//           <TouchableOpacity
//             style={[styles.categoryPill, styles.activeCategoryPill]}
//           >
//             <Text style={styles.activeCategoryText}>All Jobs</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryPill}>
//             <Text style={styles.categoryText}>Design</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryPill}>
//             <Text style={styles.categoryText}>Product Management</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryPill}>
//             <Text style={styles.categoryText}>Marketing digital</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryPill}>
//             <Text style={styles.categoryText}>Software Development</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryPill}>
//             <Text style={styles.categoryText}>Artificial intelligence</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.categoryPill}>
//             <Text style={styles.categoryText}>Datascience</Text>
//           </TouchableOpacity>
//         </ScrollView>

//         {/* job cards with linked */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.jobCardsScrollView}
//           contentContainerStyle={styles.jobCardsContentContainer}
//         >
//           {latestJobs.map((job) => (
//             <TouchableOpacity
//               key={job.id}
//               style={[styles.jobCard, { backgroundColor: job.color }]}
//               onPress={() =>
//                 navigation.navigate("JobDetail", { jobDetails: job })
//               }
//             >
//               <Text style={styles.jobTitle}>{job.title}</Text>
//               <View style={styles.jobDetail}>
//                 <Ionicons name="cash-outline" size={14} color="#fff" />
//                 <Text style={styles.jobDetailText}>Salary {job.salary}</Text>
//               </View>
//               <View style={styles.jobDetail}>
//                 <Ionicons name="location-outline" size={14} color="#fff" />
//                 <Text style={styles.jobDetailText}>{job.location}</Text>
//               </View>
//               <View style={styles.companyInfo}>
//                 <View style={styles.companyLogo}>
//                   <Text style={styles.companyLogoText}>
//                     {job.companyInitial}
//                   </Text>
//                 </View>
//                 <Text style={styles.companyName}>{job.company}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </ScrollView>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           style={styles.navItemActive}
//           onPress={() => navigation.navigate("Home")}
//         >
//           <Ionicons name="home" size={24} color="#fff" />
//           <Text style={styles.navTextActive}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("Map")}
//         >
//           <Ionicons name="map-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navItem}
//           onPress={() => navigation.navigate("JobOpportunity")}
//         >
//           <Ionicons name="briefcase-outline" size={24} color="#999" />
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
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f2f5",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 15,
//   },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   greeting: {
//     fontSize: 14,
//     color: "#666",
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   filterButton: {
//     backgroundColor: "#2563eb",
//     borderRadius: 10,
//     width: 48,
//     height: 48,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     flex: 1,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   seeMoreText: {
//     fontSize: 14,
//     color: "#2563eb",
//   },
//   trendingCardsContainer: {
//     marginBottom: 10,
//   },
//   trendingCard: {
//     borderRadius: 15,
//     padding: 15,
//     marginHorizontal: 20,
//   },
//   trendingCardContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   trendingJobTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   jobStats: {
//     marginTop: 10,
//   },
//   jobStat: {
//     color: "#fff",
//     opacity: 0.8,
//     fontSize: 14,
//   },
//   cameraIconContainer: {
//     backgroundColor: "rgba(255, 255, 255, 0.2)",
//     borderRadius: 15,
//     width: 60,
//     height: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   paginationDotsContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 20,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(0, 0, 0, 0.2)",
//     marginHorizontal: 3,
//   },
//   activeDot: {
//     backgroundColor: "#2563eb",
//     width: 20,
//   },
//   categoriesContainer: {
//     paddingHorizontal: 15,
//     marginVertical: 15,
//   },
//   categoryPill: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     marginHorizontal: 5,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   activeCategoryPill: {
//     backgroundColor: "#2563eb",
//     borderColor: "#2563eb",
//   },
//   categoryText: {
//     color: "#666",
//   },
//   activeCategoryText: {
//     color: "#fff",
//     fontWeight: "500",
//   },
//   jobCardsScrollView: {
//     paddingHorizontal: 15,
//   },
//   jobCardsContentContainer: {
//     paddingRight: 15,
//   },
//   jobCard: {
//     width: 180,
//     backgroundColor: "#192252",
//     borderRadius: 15,
//     padding: 15,
//     marginRight: 10,
//   },
//   jobTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//     marginBottom: 10,
//   },
//   jobDetail: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   jobDetailText: {
//     color: "#fff",
//     opacity: 0.9,
//     fontSize: 12,
//     marginLeft: 5,
//   },
//   companyInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   companyLogo: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 8,
//   },
//   companyLogoText: {
//     fontWeight: "bold",
//     fontSize: 12,
//     color: "#192252",
//   },
//   companyName: {
//     color: "#fff",
//     fontSize: 12,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingVertical: 10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   navItem: {
//     alignItems: "center",
//     padding: 8,
//   },
//   navItemActive: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#2563eb",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   navTextActive: {
//     color: "#fff",
//     marginLeft: 5,
//     fontWeight: "500",
//   },
// });

// export default HomeScreen;
