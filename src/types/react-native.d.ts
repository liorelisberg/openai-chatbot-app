/**
 * React Native type definitions
 * This file exists to fix TypeScript errors related to missing react-native type definitions
 */

// Re-export react-native types
declare module 'react-native' {
  // Basic UI components
  export const View: any;
  export const Text: any;
  export const TouchableOpacity: any;
  export const StyleSheet: any;
  export const ScrollView: any;
  export const Animated: any;
  export const Platform: any;
  export const KeyboardAvoidingView: any;
  export const StatusBar: any;
  export const Linking: any;
  export const TextInput: any;
  
  // Alert API
  export const Alert: {
    alert: (title: string, message?: string, buttons?: Array<any>, options?: any) => void;
  };
  
  // Keyboard API
  export const Keyboard: {
    addListener: (event: string, callback: () => void) => any;
    removeListener: (event: string, callback: () => void) => void;
    dismiss: () => void;
  };
  
  // FlatList component
  export class FlatList<ItemT = any> extends React.Component<any> {
    scrollToEnd: (params?: { animated?: boolean }) => void;
  }
} 