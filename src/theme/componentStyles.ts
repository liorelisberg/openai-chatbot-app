import {StyleSheet} from 'react-native';
import {COLORS} from './theme';

// Suggestion styles
export const suggestionStyles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: COLORS.background,
    borderTopColor: COLORS.border,
    borderTopWidth: 0.5,
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  suggestionsTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  suggestionsScrollContent: {
    paddingBottom: 8,
  },
  suggestionChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    borderRadius: 24,
    flexDirection: 'row',
    marginRight: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionChipSelected: {
    backgroundColor: COLORS.primary,
  },
  suggestionText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '500',
  },
  suggestionTextSelected: {
    color: COLORS.background,
  },
  selectedIndicator: {
    backgroundColor: COLORS.background,
    borderRadius: 4,
    height: 8,
    marginLeft: 8,
    width: 8,
  },
});

// Loader styles
export const loaderStyles = StyleSheet.create({
  endOfHistoryContainer: {
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  endOfHistoryText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontStyle: 'italic',
  },
  loadMoreButton: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadMoreButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
});

// Header styles
export const headerStyles = StyleSheet.create({
  connectionBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 14,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  connectionBadgeText: {
    color: COLORS.background,
    fontSize: 13,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

// Message bubble styles
export const messageStyles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    borderRadius: 12,
  },
  actionButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  aiBubble: {
    backgroundColor: '#F2F2F7', // Light gray for AI messages
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  aiMessageRow: {
    justifyContent: 'flex-start',
    marginRight: '20%',
  },
  aiText: {
    color: '#202020', // Darker text for better contrast
  },
  errorBubble: {
    backgroundColor: '#FFEFEF',
  },
  errorText: {
    color: COLORS.error,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  messageBubble: {
    borderRadius: 22,
    elevation: 1,
    marginHorizontal: 4,
    maxWidth: '100%',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  messageList: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  messageRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginVertical: 6,
    paddingHorizontal: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    alignSelf: 'flex-end',
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 6,
    opacity: 0.7,
  },
  userBubble: {
    backgroundColor: '#0A84FF', // Consistent blue for user bubbles
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userMessageRow: {
    justifyContent: 'flex-end',
    marginLeft: '20%',
  },
  userText: {
    color: COLORS.background,
  },
  typingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textLight,
    marginHorizontal: 3,
    opacity: 0.6,
  },
});

// Avatar styles
export const avatarStyles = StyleSheet.create({
  aiAvatarInner: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  aiAvatarText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatar: {
    borderRadius: 20,
    height: 36,
    marginHorizontal: 8,
    overflow: 'hidden',
    width: 36,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  userAvatarInner: {
    alignItems: 'center',
    backgroundColor: '#7E57C2', // Softer purple shade
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
  },
  userAvatarText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// Date separator styles
export const dateStyles = StyleSheet.create({
  dateLine: {
    backgroundColor: 'rgba(0,0,0,0.08)',
    flex: 1,
    height: 0.5,
  },
  dateSeparator: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  dateText: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
});

// Input area styles
export const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.secondary,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 24,
    borderWidth: 0.5,
    color: COLORS.text,
    flex: 1,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputContainer: {
    backgroundColor: COLORS.background,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 40,
    alignItems: 'flex-end',
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    marginBottom: 2,
    height: 40,
    width: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(10, 132, 255, 0.5)',
  },
  sendButtonText: {
    color: COLORS.background,
    fontSize: 22,
    lineHeight: 26,
  },
}); 