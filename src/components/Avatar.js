import React from 'react';
import { View, Text } from 'react-native';
import { avatarStyles } from '../theme/styles';

/**
 * AI Avatar component
 */
export const AIAvatar = () => (
  <View style={avatarStyles.avatar}>
    <View style={avatarStyles.aiAvatarInner}>
      <Text style={avatarStyles.aiAvatarText}>AI</Text>
    </View>
  </View>
);

/**
 * User Avatar component
 */
export const UserAvatar = () => (
  <View style={avatarStyles.avatar}>
    <View style={avatarStyles.userAvatarInner}>
      <Text style={avatarStyles.userAvatarText}>U</Text>
    </View>
  </View>
);
