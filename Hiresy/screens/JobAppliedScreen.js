import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const JobAppliedScreen = () => {
  const navigation = useNavigation();
  
  const jobApplications = [
    { 
      id: 1, 
      title: 'Software Engineer', 
      company: 'Amazon', 
      location: 'Seattle, Washington',
      salary: '$120,000 - $150,000',
      status: 'Viewed',
      statusColor: '#f59e0b'
    },
    { 
      id: 2, 
      title: 'Frontend Developer', 
      company: 'Google', 
      location: 'Mountain View, CA',
      salary: '$130,000 - $160,000',
      status: 'Interview',
      statusColor: '#10b981'
    },
    { 
      id: 3, 
      title: 'UI/UX Designer', 
      company: 'Spotify', 
      location: 'New York, NY',
      salary: '$110,000 - $140,000',
      status: 'Viewed',
      statusColor: '#f59e0b'
    },
    { 
      id: 4, 
      title: 'Communication Manager', 
      company: 'Facebook', 
      location: 'Menlo Park, CA',
      salary: '$125,000 - $155,000',
      status: 'Rejected',
      statusColor: '#ef4444'
    }
  ];

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <View style={styles.jobHeader}>
        <View style={styles.companyIconContainer}>
          <Text style={styles.companyInitial}>{item.company.charAt(0)}</Text>
        </View>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobCompany}>{item.company}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${item.statusColor}20` }]}>
          <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.salary}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Job Applied</Text>
      </View>

      <FlatList
        data={jobApplications}
        renderItem={renderJobItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.jobsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  jobsList: {
    padding: 20,
  },
  jobItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f2f5',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});

export default JobAppliedScreen;