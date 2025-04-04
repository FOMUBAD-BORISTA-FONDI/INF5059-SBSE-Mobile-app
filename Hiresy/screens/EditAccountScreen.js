import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EditAccountScreen = () => {
  const navigation = useNavigation();

  // User profile data
  const [userData, setUserData] = useState({
    name: 'Borista fondi',
    phone: '+62',
    email: 'Borista.fondi@example.com',
    address: 'Jalan Sultan Iskandar M. Sultan Sulaiman No. 123 city Jakarta Indonesia, 12345'
  });

  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    });
  };

  const handleSave = () => {
    // Save logic here
    navigation.navigate('Account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity style={styles.profileIcon}>
            <Ionicons name="camera-outline" size={30} color="#2563eb" />
          </TouchableOpacity>
          <View style={styles.profileImage}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.avatar}
            />
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.fieldInput}
              value={userData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+62</Text>
                <Ionicons name="chevron-down" size={16} color="#333" />
              </TouchableOpacity>
              <TextInput
                style={styles.phoneInput}
                value={userData.email}
                onChangeText={(text) => handleChange('phone', text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.fieldInput}
              value={userData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              style={[styles.fieldInput, styles.addressInput]}
              value={userData.address}
              onChangeText={(text) => handleChange('address', text)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 35,
    left: 155,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  profileImage: {
    borderRadius: 80,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    marginTop: 20,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#e4e7eb',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e7eb',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e4e7eb',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  saveButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;