import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchResultScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('React Developer');
  const [activeFilter, setActiveFilter] = useState('Technology');
  
  const filters = [
    'Technology', 'Location', 'Salary', 'Experience', 'Job Type', 'Remote'
  ];
  
  const searchResults = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Gojek',
      location: 'Jakarta, Indonesia',
      salary: '$3,000 - $5,000',
      postedTime: '3 days ago',
      logo: 'G',
      color: '#4CAF50'
    },
    {
      id: '2',
      title: 'React Native Developer',
      company: 'Tokopedia',
      location: 'Jakarta, Indonesia',
      salary: '$3,500 - $5,500',
      postedTime: '1 day ago',
      logo: 'T',
      color: '#2196F3'
    },
    {
      id: '3',
      title: 'Senior React Developer',
      company: 'Traveloka',
      location: 'Bali, Indonesia',
      salary: '$4,000 - $6,000',
      postedTime: '2 days ago',
      logo: 'T',
      color: '#FF9800'
    },
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
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={20} color="#666" />
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

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, companies..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Tags */}
      <View style={styles.filterContainer}>
        <Text style={styles.resultText}>Showing 43 Results</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTagsContainer}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterTag,
                activeFilter === filter && styles.activeFilterTag
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text 
                style={[
                  styles.filterTagText,
                  activeFilter === filter && styles.activeFilterTagText
                ]}
              >
                {filter}
              </Text>
              {activeFilter === filter && (
                <View style={styles.filterIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Search Results */}
      <FlatList
        data={searchResults}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  filterContainer: {
    padding: 15,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  filterTagsContainer: {
    paddingRight: 15,
  },
  filterTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilterTag: {
    backgroundColor: '#EEF5FD',
  },
  filterTagText: {
    fontSize: 12,
    color: '#666',
  },
  activeFilterTagText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  filterIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
    marginLeft: 5,
  },
  resultsContainer: {
    padding: 15,
    paddingTop: 5,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
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
  },
  bookmarkButton: {
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
});

export default SearchResultScreen;