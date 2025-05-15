import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { messageStyles, loaderStyles } from '../theme/styles';
import { AIAvatar, UserAvatar } from './Avatar';

/**
 * Message bubble component with animation
 * @param {Object} props - Component props
 * @param {Object} props.message - Message object
 * @param {boolean} props.isUser - True if message is from user
 * @param {boolean} props.showAvatar - Whether to show avatar
 * @param {boolean} props.isTyping - Whether message is typing indicator
 */
export const MessageBubble = ({ message, isUser, showAvatar, isTyping = false }) => {
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
    const animationGroup = Animated.parallel([fadeInAnimation, slideUpAnimation]);
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

  return (
    <Animated.View
      style={[
        messageStyles.messageRow,
        isUser ? messageStyles.userMessageRow : messageStyles.aiMessageRow,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      {!isUser && showAvatar && <AIAvatar />}

      <View
        style={[
          messageStyles.messageBubble,
          isUser ? messageStyles.userBubble : messageStyles.aiBubble,
          message.isError && messageStyles.errorBubble,
        ]}
      >
        {isTyping ? (
          <View style={loaderStyles.typingContainer}>
            <View style={loaderStyles.typingDot} />
            <View style={loaderStyles.typingDot} />
            <View style={loaderStyles.typingDot} />
          </View>
        ) : (
          <>
            <Text
              style={[
                messageStyles.messageText,
                isUser ? messageStyles.userText : messageStyles.aiText,
                message.isError && messageStyles.errorText,
              ]}
            >
              {message.content}
            </Text>
            <Text style={messageStyles.timestamp}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            {!isUser && (
              <View style={messageStyles.messageActions}>
                <TouchableOpacity
                  style={messageStyles.actionButton}
                  onPress={handleCopy}
                >
                  <Text style={messageStyles.actionButtonText}>Copy</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>

      {isUser && showAvatar && <UserAvatar />}
    </Animated.View>
  );
};
