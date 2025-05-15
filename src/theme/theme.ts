import {StyleSheet} from 'react-native';

export const COLORS = {
  primary: '#0A84FF',
  secondary: '#F2F2F7',
  accent: '#5856D6',
  background: '#FFFFFF',
  text: '#000000',
  textLight: '#8E8E93',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  aiBubble: '#FFFFFF',
  userBubble: '#0A84FF',
};

export const DARK_COLORS = {
  primary: '#0A84FF',
  secondary: '#1C1C1E',
  accent: '#5E5CE6',
  background: '#000000',
  text: '#FFFFFF',
  textLight: '#8E8E93',
  border: '#38383A',
  error: '#FF453A',
  success: '#32D74B',
  aiBubble: '#1C1C1E',
  userBubble: '#0A84FF',
};

export interface Theme {
  colors: typeof COLORS;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: {
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    fontWeight: {
      regular: string;
      medium: string;
      bold: string;
    };
  };
}

const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: COLORS,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: DARK_COLORS,
};

// Global styles
export const globalStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
