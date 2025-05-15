import React from 'react';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { messageStyles, loaderStyles } from '../theme/styles';
import { MessageBubble } from './MessageBubble';
import { DateSeparator } from './DateSeparator';
import { isSameDay } from '../utils/helpers';
import { COLORS } from '../theme/colors';

/**
 * List header component for the message list
 * @param {Object} props - Component props
 * @param {boolean} props.hasMoreMessages - Whether there are more messages to load
 * @param {boolean} props.isLoadingEarlier - Whether earlier messages are being loaded
 * @param {Function} props.onLoadEarlier - Function to call when load earlier is pressed
 */
const ListHeader = ({ hasMoreMessages, isLoadingEarlier, onLoadEarlier }) => {
  if (!hasMoreMessages) {
    return (
      <View style={loaderStyles.endOfHistoryContainer}>
        <Text style={loaderStyles.endOfHistoryText}>Beginning of conversation</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={loaderStyles.loadMoreButton}
      onPress={onLoadEarlier}
      disabled={isLoadingEarlier}
    >
      {isLoadingEarlier ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <Text style={loaderStyles.loadMoreButtonText}>Load earlier messages</Text>
      )}
    </TouchableOpacity>
  );
};

/**
 * Message list component
 * @param {Object} props - Component props
 * @param {Array} props.messages - Array of message objects
 * @param {Function} props.onLoadEarlier - Function to call when load earlier is pressed
 * @param {boolean} props.hasMoreMessages - Whether there are more messages to load
 * @param {boolean} props.isLoadingEarlier - Whether earlier messages are being loaded
 * @param {Object} props.flatListRef - Ref object for the FlatList
 */
export const MessageList = ({
  messages,
  onLoadEarlier,
  hasMoreMessages,
  isLoadingEarlier,
  flatListRef,
}) => {
  const renderItem = ({ item, index }) => {
    // For typing indicator
    if (item.isTyping) {
      return <MessageBubble message={item} isUser={false} showAvatar={true} isTyping={true} />;
    }

    const isUser = item.type === 'user';
    const showAvatar = index === 0 ||
      messages[index - 1].type !== item.type ||
      (new Date(item.timestamp) - new Date(messages[index - 1].timestamp)) > 5 * 60 * 1000; // 5 minutes

    // Check if we need a date separator
    const showDateHeader = index === 0 ||
      !isSameDay(new Date(messages[index - 1].timestamp), new Date(item.timestamp));

    return (
      <>
        {showDateHeader && <DateSeparator date={new Date(item.timestamp)} />}
        <MessageBubble
          message={item}
          isUser={isUser}
          showAvatar={showAvatar}
        />
      </>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={messageStyles.messageList}
      ListHeaderComponent={
        <ListHeader
          hasMoreMessages={hasMoreMessages}
          isLoadingEarlier={isLoadingEarlier}
          onLoadEarlier={onLoadEarlier}
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};
