import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { suggestionStyles } from '../theme/styles';
import { getRandomSuggestions } from '../constants/suggestionPool';

/**
 * Suggestion chips for quick prompts
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Function to call when a suggestion is pressed (populates input)
 * @param {Function} props.onSend - Function to call to send suggestion directly (optional)
 * @param {number} props.count - Number of suggestions to show (default: 5)
 */
export const QuickSuggestions = ({ onPress, onSend, count = 5 }) => {
  // State to store the randomized suggestions
  const [suggestions, setSuggestions] = useState([]);

  // Initialize with random suggestions on component mount
  useEffect(() => {
    setSuggestions(getRandomSuggestions(count));
  }, [count]);

  // Handle suggestion selection
  const handleSuggestionPress = (suggestion) => {
    if (onSend) {
      // If onSend is provided, send the suggestion directly
      onSend(suggestion);
    } else if (onPress) {
      // Otherwise, just populate the input field
      onPress(suggestion);
    }
  };

  return (
    <View style={suggestionStyles.suggestionsContainer}>
      <Text style={suggestionStyles.suggestionsTitle}>Try asking:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={suggestionStyles.suggestionsScrollContent}
      >
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion}
            style={[
              suggestionStyles.suggestionChip,
              // Visual indication for auto-send if enabled
              onSend && suggestionStyles.suggestionChipAutoSend,
            ]}
            onPress={() => handleSuggestionPress(suggestion)}
            testID="suggestion-chip"
          >
            <Text style={suggestionStyles.suggestionText}>{suggestion}</Text>
            {onSend && (
              <View style={suggestionStyles.sendIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
