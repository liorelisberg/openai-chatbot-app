import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Message bubble styles
export const messageStyles = StyleSheet.create({
  messageList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  aiMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 18,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: COLORS.userBubble,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: COLORS.aiBubble,
    borderBottomLeftRadius: 4,
  },
  errorBubble: {
    backgroundColor: '#ffecec',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.background,
  },
  aiText: {
    color: COLORS.text,
  },
  errorText: {
    color: COLORS.error,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
    color: COLORS.textLight,
    opacity: 0.8,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});

// Avatar styles
export const avatarStyles = StyleSheet.create({
  avatar: {
    width: 28,
    height: 28,
    marginHorizontal: 8,
    borderRadius: 14,
    overflow: 'hidden',
  },
  aiAvatarInner: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarInner: {
    backgroundColor: COLORS.accent,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAvatarText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
  userAvatarText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

// Date separator styles
export const dateStyles = StyleSheet.create({
  dateSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dateText: {
    color: COLORS.textLight,
    fontSize: 12,
    marginHorizontal: 8,
    fontWeight: '500',
  },
});

// Loading indicator styles
export const loaderStyles = StyleSheet.create({
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textLight,
    marginHorizontal: 2,
    opacity: 0.6,
  },
  loadMoreButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  loadMoreButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  endOfHistoryContainer: {
    alignItems: 'center',
    padding: 16,
  },
  endOfHistoryText: {
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});

// Input area styles
export const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  sendButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
});

// Header styles
export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  connectionBadge: {
    backgroundColor: COLORS.warning,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  connectionBadgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
});

// Suggestion chips styles
export const suggestionStyles = StyleSheet.create({
  suggestionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  suggestionsTitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  suggestionsScrollContent: {
    paddingBottom: 8,
  },
  suggestionChip: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  // Auto-send styles
  suggestionChipAutoSend: {
    backgroundColor: COLORS.primary + '15', // Primary color with 15% opacity
    borderColor: COLORS.primary,
  },
  sendIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginLeft: 6,
  },
});
