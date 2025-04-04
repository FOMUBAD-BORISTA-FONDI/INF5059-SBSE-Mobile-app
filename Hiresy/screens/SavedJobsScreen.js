import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedJobsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('saved');
  
  const savedJobs = [
    {
      id: '1',
      title: 'UI/UX Designer',
      company: 'Google',
      location: 'Jakarta, Indonesia',
      salary: '$4,000 - $6,000',
      postedTime: '2 days ago',
      logo: 'G',
      color: '#4285F4',
      applied: false
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Shopee',
      location: 'Singapore',
      salary: '$5,000 - $7,500',
      postedTime: '3 days ago',
      logo: 'S',
      color: '#EE4D2D',
      applied: false
    },
    {
      id: '3',
      title: 'Frontend Developer',
      company: 'Tokopedia',
      location: 'Jakarta, Indonesia',
      salary: '$3,500 - $5,000',
      postedTime: '1 week ago',
      logo: 'T',
      color: '#42B549',
      applied: false
    }
  ];
  
  const appliedJobs = [
    {
      id: '4',
      title: 'Mobile Developer',
      company: 'Gojek',
      location: 'Jakarta, Indonesia',
      salary: '$3,800 - $6,200',
      postedTime: '5 days ago',
      logo: 'G',
      color: '#00AA13',
      status: 'In Review',
      applied: true
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'Traveloka',
      location: 'Jakarta, Indonesia',
      salary: '$4,500 - $7,000',
      postedTime: '1 week ago',
      logo: 'T',
      color: '#0770E3',
      status: 'Interview',
      applied: true
    }
  ];

  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard}
      onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}
    >
      <View style={styles.jobHeader}>
        <View style={[styles.companyLogo, { backgroundColor: item.color }]}>
          <Text style={styles.companyLogoText}>{item.logo}</Text>
        </View>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
          {item.applied && (
            <View style={styles.statusContainer}>
              <View style={[
                styles.statusIndicator, 
                {backgroundColor: item.status === 'Interview' ? '#FF9800' : '#2196F3'}
              ]} />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.jobDetails}>
        <View style={styles.jobDetail}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.jobDetailText}>{item.location}</Text>
        </View>
        <View style={styles.jobDetail}>
          <Ionicons name="cash-outline" size={16} color="#666" />
          <Text style={styles.jobDetailText}>{item.salary}</Text>
        </View>
        <View style={styles.jobDetail}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.jobDetailText}>{item.postedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = ({ text }) => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bookmark" size={60} color="#DDD" />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Jobs</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'saved' && styles.activeTab]} 
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'applied' && styles.activeTab]} 
          onPress={() => setActiveTab('applied')}
        >
          <Text style={[styles.tabText, activeTab === 'applied' && styles.activeTabText]}>Applied</Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      <FlatList
        data={activeTab === 'saved' ? savedJobs : appliedJobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.jobsContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyListComponent 
            text={activeTab === 'saved' 
              ? "You haven't saved any jobs yet" 
              : "You haven't applied to any jobs yet"
            } 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 15,
    marginRight: 30,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  jobsContainer: {
    padding: 15,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  companyLogoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  menuButton: {
    padding: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 15,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  jobDetailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    color: '#999',
  },
});

export default SavedJobsScreen;