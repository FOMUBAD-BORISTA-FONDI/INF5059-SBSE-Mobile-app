import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample nearby jobs data
  const nearbyJobs = [
    {
      id: 1,
      title: 'Software Engineer',
      salary: '$3000',
      location: 'Yaounde, Cameroon',
      company: 'Gojek',
      logoColor: '#50B83C',
    },
    {
      id: 2,
      title: 'Data Analyst',
      salary: '$2500',
      location: 'Douala, Cameroon',
      company: 'Grab',
      logoColor: '#00B14F',
    },
    {
      id: 3,
      title: 'IT Project Manager',
      salary: '$4000',
      location: 'Bamenda, Cameroon',
      company: 'Twitter',
      logoColor: '#1DA1F2',
    },
    {
      id: 4,
      title: 'Cybersecurity Analyst',
      salary: '$4500',
      location: 'Limbe, Cameroon',
      company: 'Mozilla',
      logoColor: '#FF9400',
    }
  ];

  // Sample map markers data
  const markers = [
    { id: 1, coordinate: { latitude: 3.848, longitude: 11.502 }, type: 'job' }, // Yaoundé Center
    { id: 2, coordinate: { latitude: 3.866, longitude: 11.516 }, type: 'job' }, // Melen
    { id: 3, coordinate: { latitude: 3.870, longitude: 11.510 }, type: 'job' }, // Biyem-Assi
    { id: 4, coordinate: { latitude: 3.840, longitude: 11.490 }, type: 'job' }, // Bastos
    { id: 5, coordinate: { latitude: 3.830, longitude: 11.510 }, type: 'job' }, // Nsam
    { id: 6, coordinate: { latitude: 3.810, longitude: 11.520 }, type: 'job' }, // Ekounou
    { id: 7, coordinate: { latitude: 3.800, longitude: 11.500 }, type: 'user' }, // User Location
  ];  
  

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <View style={styles.jobInfo}>
        <View style={[styles.companyLogo, { backgroundColor: item.logoColor }]}>
          <Text style={styles.companyInitial}>{item.company.charAt(0)}</Text>
        </View>
        <View style={styles.jobDetails}>
          <Text style={styles.jobCompany}>{item.company}</Text>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobSalary}>{item.salary} · {item.location}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart-outline" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Map View */}
      <MapView
  provider={PROVIDER_GOOGLE}
  style={styles.map}
  initialRegion={{
    latitude: 3.848,  // Yaoundé Latitude
    longitude: 11.502, // Yaoundé Longitude
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
>

        {markers.map((marker) => (
          <Marker 
            key={marker.id} 
            coordinate={marker.coordinate}
          >
            <View style={[
              styles.markerContainer,
              marker.type === 'user' ? styles.userMarker : styles.jobMarker
            ]}>
              {marker.type === 'user' ? (
                <Ionicons name="location" size={16} color="#fff" />
              ) : (
                <View style={styles.jobMarkerInner} />
              )}
            </View>
            {marker.type === 'user' && (
              <View style={styles.userLocationRing} />
            )}
          </Marker>
        ))}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput 
            placeholder="Search job or location here..." 
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Your Location Tag */}
      {!isExpanded && (
        <View style={styles.locationTag}>
          <View style={styles.locationDot}>
            <Ionicons name="location" size={16} color="#fff" />
          </View>
          <Text style={styles.locationText}>Your Location</Text>
        </View>
      )}

      {/* Job List Panel */}
      <View style={[styles.jobPanel, isExpanded ? styles.expandedPanel : {}]}>
        <TouchableOpacity style={styles.panelHandle} onPress={toggleExpanded}>
          <View style={styles.handleBar} />
        </TouchableOpacity>

        <Text style={styles.panelTitle}>Nearest Job</Text>

        {isExpanded ? (
          <FlatList
            data={nearbyJobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.jobList}
          />
        ) : (
          <View style={styles.jobPreview}>
            {renderJobItem({ item: nearbyJobs[0] })}
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItemActive} onPress={() => navigation.navigate('Map')}>
          <Ionicons name="map" size={20} color="#fff" />
          <Text style={styles.navTextActive}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('JobOpportunity')}>
          <Ionicons name="briefcase-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Account')}>
          <Ionicons name="person-outline" size={24} color="#999" />
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationTag: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
    backgroundColor: '#2563eb',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  locationText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  jobPanel: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  expandedPanel: {
    height: 450,
  },
  panelHandle: {
    alignItems: 'center',
    marginBottom: 15,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  jobPreview: {
    flex: 1,
  },
  jobList: {
    flex: 1,
  },
  jobItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f5',
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyInitial: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  jobDetails: {
    flex: 1,
  },
  jobCompany: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 12,
    color: '#666',
  },
  favoriteButton: {
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
  markerContainer: {
    borderRadius: 50,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobMarker: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2563eb',
    width: 28,
    height: 28,
  },
  jobMarkerInner: {
    backgroundColor: '#2563eb',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  userMarker: {
    backgroundColor: '#2563eb',
    width: 32,
    height: 32,
  },
  userLocationRing: {
    position: 'absolute',
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.3)',
  }
});

export default MapScreen;