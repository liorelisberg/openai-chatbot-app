import {useState, useRef, useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import {sendMessage} from '../services/chatService';
import {generateId} from '../utils/helpers';
import {AI, USER} from '../constants/messageTypes';
import type {ChatMessage, ChatHook} from '../types/chat';

/**
 * Hook to manage chat functionality
 * @returns {ChatHook} - Chat state and handlers
 */
export const useChat = (): ChatHook => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: generateId(),
        type: AI,
        content: "👋 Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current && !isLoadingEarlier && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 300);
    }
  }, [messages.length, isLoadingEarlier]);

  // Send a message to the AI
  const sendChatMessage = async (
    userContent: string,
    isConnected: boolean,
  ): Promise<void> => {
    if (!userContent.trim()) {
      Alert.alert('Error', 'Please enter a message first');
      return;
    }

    if (!isConnected) {
      Alert.alert(
        'No Connection',
        'Please check your internet connection and try again.',
      );
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      type: USER,
      content: userContent.trim(),
      timestamp: new Date(),
    };

    // Add typing indicator
    const typingIndicatorId = generateId();

    setMessages(prev => [
      ...prev,
      userMessage,
      {
        id: typingIndicatorId,
        type: AI,
        isTyping: true,
        content: '',
        timestamp: new Date(),
      },
    ]);

    setIsLoading(true);

    try {
      // Get non-typing messages for context
      const messageHistory = messages.filter(msg => !msg.isTyping);

      // Send to API
      const response = await sendMessage(userContent, messageHistory);

      // Remove typing indicator and add AI response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== typingIndicatorId);
        return [
          ...filtered,
          {
            id: generateId(),
            type: AI,
            content: response,
            timestamp: new Date(),
          },
        ];
      });
    } catch (error) {
      console.error('Error:', error);

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      // Remove typing indicator and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== typingIndicatorId);
        return [
          ...filtered,
          {
            id: generateId(),
            type: AI,
            content:
              errorMessage === 'Request timeout'
                ? 'Request timed out. Please try again.'
                : `Error: ${errorMessage || 'Failed to connect to AI service.'}`,
            timestamp: new Date(),
            isError: true,
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load earlier messages
  const loadEarlierMessages = async (): Promise<void> => {
    if (!hasMoreMessages || isLoadingEarlier) return;

    setIsLoadingEarlier(true);

    try {
      // Get oldest message date
      const oldestDate =
        messages.length > 0 ? new Date(messages[0].timestamp) : new Date();

      // Simulate API call delay
      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1000);
      });

      // Generate older messages (in a real app, fetch from API)
      const olderMessages = Array.from({length: 10}, (_, i) => {
        const date = new Date(oldestDate);
        date.setMinutes(date.getMinutes() - (i + 1) * 30); // 30 min intervals

        return {
          id: generateId(),
          type: i % 2 === 0 ? USER : AI,
          content:
            i % 2 === 0
              ? `This is an older message from you (#${messages.length + i})`
              : `This is an older response from me (#${messages.length + i})`,
          timestamp: date,
        } as ChatMessage;
      }).reverse();

      // Update state
      setMessages(prev => [...olderMessages, ...prev]);

      // Simulate no more messages after 30 messages
      if (messages.length + olderMessages.length > 30) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.error('Error loading earlier messages:', error);
      Alert.alert('Error', 'Could not load earlier messages');
    } finally {
      setIsLoadingEarlier(false);
    }
  };

  return {
    messages,
    isLoading,
    hasMoreMessages,
    isLoadingEarlier,
    flatListRef,
    sendChatMessage,
    loadEarlierMessages,
  };
};
