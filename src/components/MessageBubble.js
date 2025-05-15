import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, TouchableOpacity, Alert} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {messageStyles} from '../theme';
import {AIAvatar, UserAvatar} from './Avatar';
import {formatTimestamp} from '../utils/helpers';

// Helper function to parse basic markdown
const parseMarkdown = (text) => {
  if (!text) return text;
  
  // Bold text (convert **text** to proper styling)
  const boldStyled = text.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
    return `<b>${p1}</b>`;
  });
  
  return boldStyled;
};

// Helper to fix emojis
const fixEmojis = (text) => {
  if (!text) return text;
  
  // Replace wave emoji text with actual emoji
  return text.replace('👋', '👋 ');
};

/**
 * Message bubble component with animation
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object
 * @param {boolean} props.isUser - True if message is from user
 * @param {boolean} props.showAvatar - Whether to show avatar
 * @param {boolean} props.isTyping - Whether message is typing indicator
 */
export const MessageBubble = ({
  message,
  isUser,
  showAvatar,
  isTyping = false,
  onCopy,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Create animation sequence
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });

    const slideUpAnimation = Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    });

    // Start animations
    const animationGroup = Animated.parallel([
      fadeInAnimation,
      slideUpAnimation,
    ]);
    animationGroup.start();

    // Cleanup function to stop animations when component unmounts
    return () => {
      animationGroup.stop();
    };
  }, [fadeAnim, translateY]);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(message.content);
    Alert.alert('Copied', 'Message copied to clipboard');
  };

  // Fix: Determine if message is from AI based on the type property, not role
  const isAI = !isUser && message.type === 'ai';
  
  const bubbleStyle = [
    messageStyles.messageBubble,
    isAI ? messageStyles.aiBubble : messageStyles.userBubble,
    message.error && messageStyles.errorBubble,
  ];
  const textStyle = [
    messageStyles.messageText,
    isAI ? messageStyles.aiText : messageStyles.userText,
    message.error && messageStyles.errorText,
  ];

  // Process content for display
  const processedContent = isAI ? parseMarkdown(fixEmojis(message.content)) : message.content;

  return (
    <Animated.View
      style={[
        messageStyles.messageRow,
        isAI ? messageStyles.aiMessageRow : messageStyles.userMessageRow,
        {opacity: fadeAnim, transform: [{translateY}]},
      ]}>
      {isAI && showAvatar && <AIAvatar />}

      <View style={bubbleStyle}>
        {isTyping ? (
          <View style={messageStyles.typingContainer}>
            <View style={messageStyles.typingDot} />
            <View style={messageStyles.typingDot} />
            <View style={messageStyles.typingDot} />
          </View>
        ) : (
          <>
            <Text style={textStyle}>
              {processedContent}
            </Text>
            <Text style={messageStyles.timestamp}>{formatTimestamp(message.timestamp)}</Text>

            {isAI && (
              <View style={messageStyles.messageActions}>
                <TouchableOpacity
                  style={messageStyles.actionButton}
                  onPress={handleCopy}>
                  <Text style={messageStyles.actionButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      {!isAI && showAvatar && <UserAvatar />}
    </Animated.View>
  );
};
