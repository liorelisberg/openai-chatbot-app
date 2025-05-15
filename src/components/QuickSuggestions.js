import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {suggestionStyles} from '../theme';
import {getRandomSuggestions} from '../constants/suggestionPool';

/**
 * Suggestion chips for quick prompts
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Function to call when a suggestion is pressed (populates input)
 * @param {Function} props.onSend - Function to call to send suggestion directly (optional)
 * @param {number} props.count - Number of suggestions to show (default: 5)
 */
export const QuickSuggestions = ({onPress, onSend, count = 5}) => {
  // State to store the randomized suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Initialize with random suggestions on component mount
  useEffect(() => {
    setSuggestions(getRandomSuggestions(count));
  }, [count]);

  // Handle suggestion selection
  const handleSuggestionPress = (suggestion, index) => {
    setSelectedIndex(index);
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
        contentContainerStyle={suggestionStyles.suggestionsScrollContent}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={suggestion}
            style={[
              suggestionStyles.suggestionChip,
              // Visual indication for selected suggestion
              index === selectedIndex && suggestionStyles.suggestionChipSelected,
            ]}
            onPress={() => handleSuggestionPress(suggestion, index)}
            testID="suggestion-chip">
            <Text 
              style={[
                suggestionStyles.suggestionText,
                index === selectedIndex && suggestionStyles.suggestionTextSelected
              ]}>
              {suggestion}
            </Text>
            {index === selectedIndex && <View style={suggestionStyles.selectedIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
