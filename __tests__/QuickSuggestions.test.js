/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuickSuggestions } from '../src/components/QuickSuggestions';
import { getRandomSuggestions } from '../src/constants/suggestionPool';

// Mock the random suggestions function
jest.mock('../src/constants/suggestionPool', () => ({
  getRandomSuggestions: jest.fn(() => ['Test suggestion 1', 'Test suggestion 2', 'Test suggestion 3']),
}));

describe('QuickSuggestions', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<QuickSuggestions />);
    
    // Check title is rendered
    expect(getByText('Try asking:')).toBeTruthy();
    
    // Check suggestions are rendered (3 mocked suggestions)
    expect(getRandomSuggestions).toHaveBeenCalledWith(5);
    expect(getByText('Test suggestion 1')).toBeTruthy();
    expect(getByText('Test suggestion 2')).toBeTruthy();
    expect(getByText('Test suggestion 3')).toBeTruthy();
  });
  
  it('calls onPress when suggestion is tapped and no onSend provided', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<QuickSuggestions onPress={mockOnPress} />);
    
    // Press a suggestion
    fireEvent.press(getByText('Test suggestion 1'));
    
    // Check onPress was called with correct argument
    expect(mockOnPress).toHaveBeenCalledWith('Test suggestion 1');
  });
  
  it('calls onSend when suggestion is tapped and onSend is provided', () => {
    const mockOnPress = jest.fn();
    const mockOnSend = jest.fn();
    const { getByText } = render(
      <QuickSuggestions onPress={mockOnPress} onSend={mockOnSend} />
    );
    
    // Press a suggestion
    fireEvent.press(getByText('Test suggestion 1'));
    
    // Check onSend was called instead of onPress
    expect(mockOnSend).toHaveBeenCalledWith('Test suggestion 1');
    expect(mockOnPress).not.toHaveBeenCalled();
  });
  
  it('renders correct number of suggestions based on count prop', () => {
    // Reset mock to return different number of suggestions
    getRandomSuggestions.mockReturnValueOnce(['One', 'Two']);
    
    render(<QuickSuggestions count={2} />);
    
    // Check count param was passed correctly
    expect(getRandomSuggestions).toHaveBeenCalledWith(2);
  });
});
