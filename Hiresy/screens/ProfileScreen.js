import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userProfile = {
    name: 'Fomubad Borista',
    jobTitle: 'Software Engineer',
    location: 'Cameroon, Yaounde',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    completionPercentage: 85,
    email: 'borista.fomubad@example.com',
    phone: '+237 812 3456 7890',
  };

  const profileOptions = [
    { id: '1', title: 'Edit Profile', icon: 'person-outline', color: '#2196F3' },
    { id: '2', title: 'Application History', icon: 'briefcase-outline', color: '#4CAF50' },
    { id: '3', title: 'Resume', icon: 'document-text-outline', color: '#FF9800' },
    { id: '4', title: 'Settings', icon: 'settings-outline', color: '#9C27B0' },
    { id: '5', title: 'Help Center', icon: 'help-circle-outline', color: '#E91E63' },
    { id: '6', title: 'Logout', icon: 'log-out-outline', color: '#F44336' },
  ];

  const renderProfileOption = (option) => (
    <TouchableOpacity key={option.id} style={styles.optionCard}>
      <View style={[styles.optionIconContainer, { backgroundColor: `${option.color}10` }]}>
        <Ionicons name={option.icon} size={24} color={option.color} />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{option.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>{userProfile.name}</Text>
              <Text style={styles.profileJobTitle}>{userProfile.jobTitle}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.locationText}>{userProfile.location}</Text>
              </View>
            </View>
          </View>

          {/* Profile Completion */}
          <View style={styles.completionContainer}>
            <View style={styles.completionHeader}>
              <Text style={styles.completionTitle}>Profile Completion</Text>
              <Text style={styles.completionPercentage}>{userProfile.completionPercentage}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${userProfile.completionPercentage}%` }
                ]} 
              />
            </View>
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.completeButtonText}>Complete Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Contact Info */}
          <View style={styles.contactContainer}>
            <View style={styles.contactItem}>
              <Ionicons name="mail-outline" size={18} color="#2196F3" />
              <Text style={styles.contactText}>{userProfile.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call-outline" size={18} color="#2196F3" />
              <Text style={styles.contactText}>{userProfile.phone}</Text>
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {profileOptions.map(renderProfileOption)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileJobTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  completionContainer: {
    marginBottom: 20,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  completionTitle: {
    fontSize: 14,
    color: '#333',
  },
  completionPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2196F3',
    borderRadius: 3,
  },
  completeButton: {
    backgroundColor: '#EEF5FD',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  contactContainer: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  optionsContainer: {
    padding: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;