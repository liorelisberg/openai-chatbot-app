import React from 'react';
import { View, Text } from 'react-native';
import { dateStyles } from '../theme/styles';

/**
 * Date separator component for chat messages
 * @param {Object} props - Component props
 * @param {Date} props.date - Date to display
 */
export const DateSeparator = ({ date }) => (
  <View style={dateStyles.dateSeparator}>
    <View style={dateStyles.dateLine} />
    <Text style={dateStyles.dateText}>
      {date.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })}
    </Text>
    <View style={dateStyles.dateLine} />
  </View>
);
