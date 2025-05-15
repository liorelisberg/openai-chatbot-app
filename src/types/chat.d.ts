/**
 * Type definitions for chat related structures
 */
import { FlatList } from 'react-native';

/**
 * Message types
 */
export type MessageType = 'user' | 'ai';

/**
 * Chat message structure
 */
export interface ChatMessage {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isError?: boolean;
}

/**
 * Chat state
 */
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  hasMoreMessages: boolean;
  isLoadingEarlier: boolean;
}

/**
 * Chat hook return type
 */
export interface ChatHook extends ChatState {
  flatListRef: React.RefObject<FlatList<ChatMessage>>;
  sendChatMessage: (message: string, isConnected: boolean) => Promise<void>;
  loadEarlierMessages: () => Promise<void>;
}
