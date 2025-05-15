import React from 'react';
import { View, Text } from 'react-native';
import { headerStyles } from '../theme/styles';

/**
 * Header component for the chat screen
 * @param {Object} props - Component props
 * @param {boolean} props.isConnected - Whether device is connected to the internet
 */
export const ChatHeader = ({ isConnected }) => (
  <View style={headerStyles.header}>
    <Text style={headerStyles.headerTitle}>AI Chatbot</Text>
    {!isConnected && (
      <View style={headerStyles.connectionBadge}>
        <Text style={headerStyles.connectionBadgeText}>Offline</Text>
      </View>
    )}
  </View>
);
