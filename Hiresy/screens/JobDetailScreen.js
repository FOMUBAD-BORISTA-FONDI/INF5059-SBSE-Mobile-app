import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';


const JobDetailScreen = ({ route, navigation }) => {
    // const navigation = useNavigation();

  // Get job details from route params
  const { jobDetails } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
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
        
        {/* Job Header */}
        <View style={styles.header}>
          <View style={[styles.companyLogoContainer, { backgroundColor: jobDetails.color }]}>
            <Text style={styles.companyLogo}>{jobDetails.companyInitial}</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.jobTitle}>{jobDetails.title}</Text>
            <Text style={styles.companyName}>{jobDetails.company}</Text>
            <Text style={styles.jobLocation}>{jobDetails.location}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('apply')}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        {/* Salary Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Salary</Text>
          <View style={styles.salaryContainer}>
            <Ionicons name="cash-outline" size={20} color="#2196F3" />
            <Text style={styles.salaryText}>{jobDetails.salary}</Text>
          </View>
        </View>

        {/* Qualifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qualifications</Text>
          {jobDetails.qualifications.map((qualification, index) => (
            <View key={index} style={styles.qualificationItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.qualificationText}>{qualification}</Text>
            </View>
          ))}
        </View>

        {/* About Company */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Company</Text>
          <Text style={styles.descriptionText}>{jobDetails.aboutCompany}</Text>
        </View>

        {/* Job Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.descriptionText}>{jobDetails.description}</Text>
        </View>

        {/* Apply Button Fixed at Bottom */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      <View style={styles.fixedBottomButton}>
        <TouchableOpacity style={styles.applyButtonFull} onPress={() => navigation.navigate('apply')}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  companyLogo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTextContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 12,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#EEF5FD',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500',
  },
  qualificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
    marginTop: 7,
    marginRight: 10,
  },
  qualificationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  fixedBottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButtonFull: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPadding: {
    height: 80,
  },
});

export default JobDetailScreen;
