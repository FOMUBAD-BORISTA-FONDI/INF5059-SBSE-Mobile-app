import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const AccountScreen = () => {
  const navigation = useNavigation();

  // User data
  const userData = {
    name: 'Borista Fondi',
    email: 'borista.fomubad@example.com',
    applied: 23,
    reviewed: 14,
    accepted: 20
  };

  const menuItems = [
    { id: 1, title: 'Personal Profile', icon: 'person-outline', route: 'EditAccount' },
    { id: 2, title: 'Change Password', icon: 'key-outline', route: 'ChangePassword' },
    { id: 3, title: 'Job Applied', icon: 'briefcase-outline', route: 'JobApplied' },
    { id: 4, title: 'Favorite Job', icon: 'heart-outline', route: 'FavoriteJob' },
    { id: 5, title: 'My Wallet', icon: 'wallet-outline', route: 'MyWallet' },
    { id: 6, title: 'Settings', icon: 'settings-outline', route: 'AccountSettings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account & Settings</Text>
      </View>

      {/* User Profile Card */}
      <ScrollView>
      <View style={styles.profileCard}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.applied}</Text>
            <Text style={styles.statLabel}>Applied</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.reviewed}</Text>
            <Text style={styles.statLabel}>Reviewed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.accepted}</Text>
            <Text style={styles.statLabel}>Accepted</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.menuItem}
            onPress={() => item.route ? navigation.navigate(item.route) : null}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={22} color="#555" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
          <View style={styles.menuItemLeft}>
            <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#ccc" />
        </TouchableOpacity>
      </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Map')}
        >
          <Ionicons name="map-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('JobOpportunity')}
        >
          <Ionicons name="briefcase-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive} onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.navTextActive}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f2f5',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
    marginBottom: 60,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#FF3B30',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f2f5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  navTextActive: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default AccountScreen;











// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const AccountScreen = () => {
//   const navigation = useNavigation();

//   // User data
//   const userData = {
//     name: 'Borista Fondi',
//     email: 'borista.fomubad@example.com',
//     applied: 23,
//     reviewed: 14,
//     accepted: 20
//   };

//   const menuItems = [
//     { id: 1, title: 'Personal Profile', icon: 'person-outline', route: 'EditAccount' },
//     { id: 2, title: 'Change Password', icon: 'key-outline', route: '' },
//     { id: 3, title: 'Job Applied', icon: 'briefcase-outline', route: '' },
//     { id: 4, title: 'Favorite Job', icon: 'heart-outline', route: '' },
//     { id: 5, title: 'My Wallet', icon: 'wallet-outline', route: '' },
//     { id: 6, title: 'Settings', icon: 'settings-outline', route: '' },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Account & Settings</Text>
//       </View>

//       {/* User Profile Card */}
//       <View style={styles.profileCard}>
//         <Image 
//           source={{ uri: 'https://i.pravatar.cc/100' }}
//           // https://i.pravatar.cc/150?img=6
//           style={styles.avatar}
//         />
//         <Text style={styles.userName}>{userData.name}</Text>
//         <Text style={styles.userEmail}>{userData.email}</Text>

//         {/* Stats */}
//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>{userData.applied}</Text>
//             <Text style={styles.statLabel}>Applied</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>{userData.reviewed}</Text>
//             <Text style={styles.statLabel}>Reviewed</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Text style={styles.statValue}>{userData.accepted}</Text>
//             <Text style={styles.statLabel}>Accepted</Text>
//           </View>
//         </View>
//       </View>

//       {/* Menu Items */}
//       <View style={styles.menuContainer}>
//         {menuItems.map(item => (
//           <TouchableOpacity 
//             key={item.id} 
//             style={styles.menuItem}
//             onPress={() => item.route ? navigation.navigate(item.route) : null}
//           >
//             <View style={styles.menuItemLeft}>
//               <Ionicons name={item.icon} size={22} color="#555" />
//               <Text style={styles.menuItemText}>{item.title}</Text>
//             </View>
//             <Ionicons name="chevron-forward" size={22} color="#ccc" />
//           </TouchableOpacity>
//         ))}

//         {/* Logout Button */}
//         <TouchableOpacity style={styles.logoutButton}>
//           <View style={styles.menuItemLeft}>
//             <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
//             <Text style={styles.logoutText}>Logout</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={22} color="#ccc" />
//         </TouchableOpacity>
//       </View>

//       {/* Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
//           <Ionicons name="home-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={styles.navItem}
//           onPress={() => navigation.navigate('Map')}
//         >
//           <Ionicons name="map-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity 
//           style={styles.navItem}
//           onPress={() => navigation.navigate('JobOpportunity')}
//         >
//           <Ionicons name="briefcase-outline" size={24} color="#999" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navItemActive} onPress={() => navigation.navigate('Account')}>
//           <Ionicons name="person" size={20} color="#fff" />
//           <Text style={styles.navTextActive}>Account</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     // alignItems: 'center',
//   },
//   profileCard: {
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     marginVertical: 10,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 15,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f2f5',
//   },
//   statItem: {
//     alignItems: 'center',
//     paddingHorizontal: 15,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2563eb',
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 5,
//   },
//   menuContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f2f5',
//   },
//   menuItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   menuItemText: {
//     fontSize: 16,
//     marginLeft: 15,
//     color: '#333',
//   },
//   logoutButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f2f5',
//   },
//   logoutText: {
//     fontSize: 16,
//     marginLeft: 15,
//     color: '#FF3B30',
//   },
//   bottomNav: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f2f5',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   navItem: {
//     alignItems: 'center',
//     padding: 8,
//   },
//   navItemActive: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2563eb',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   navTextActive: {
//     color: '#fff',
//     marginLeft: 5,
//     fontWeight: '500',
//   },
// });

// export default AccountScreen;