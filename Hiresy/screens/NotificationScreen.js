import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationScreen = () => {
  const notifications = [
    {
      id: '1',
      type: 'application',
      title: 'Application Received',
      message: 'Your application for the Software Engineer position at Gojek has been received. We will review it shortly.',
      time: '2 hours ago',
      read: false,
      sender: {
        name: 'Gojek Careers',
        avatar: 'G',
      }
    },
    {
      id: '2',
      type: 'message',
      title: 'Jonathan Breeze',
      message: 'Hi there! I noticed you have applied for the Software Developer position. I wanted to let you know that we have reviewed your application and would like to invite you for an interview.',
      time: '5 hours ago',
      read: true,
      sender: {
        name: 'Jonathan Breeze',
        avatar: 'JB',
      }
    },
    {
      id: '3',
      type: 'message',
      title: 'Sarah Cooper',
      message: 'Thanks for your interest in the UX Designer role. Your portfolio looks great! Would you be available for a video call next week to discuss your experience?',
      time: '1 day ago',
      read: true,
      sender: {
        name: 'Sarah Cooper',
        avatar: 'SC',
      }
    }
  ];

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadItem]}>
      <View style={styles.senderAvatar}>
        <Text style={styles.avatarText}>{item.sender.avatar}</Text>
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadItem: {
    backgroundColor: '#F0F7FF',
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  senderAvatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationScreen;