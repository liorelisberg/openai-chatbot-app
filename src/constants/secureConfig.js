import { Platform } from 'react-native';
import { OPENAI_API_KEY as ENV_API_KEY } from './env';

// Debug mode for environment logging - set to false in production
const DEBUG_MODE = false;

/**
 * Get environment variable with fallback
 * Attempts multiple methods to access environment variables
 */
const getEnvVariable = (key, fallback = '') => {
  if (DEBUG_MODE) console.log(`[ENV] Loading: ${key}`);

  try {
    // First try our direct environment loader
    if (key === 'OPENAI_API_KEY' && ENV_API_KEY) {
      if (DEBUG_MODE) console.log(`[ENV] Found ${key} in direct loader`);
      return ENV_API_KEY;
    }
    
    // Then try process.env as backup
    const value = process.env[key];
    if (value) {
      if (DEBUG_MODE) console.log(`[ENV] Found ${key} in process.env`);
      return value;
    }
    
    // If still no value, use fallback
    if (DEBUG_MODE) console.log(`[ENV] Using fallback for ${key}`);
    return fallback;
  } catch (error) {
    if (DEBUG_MODE) console.warn(`[ENV] Error loading ${key}: ${error.message}`);
    return fallback;
  }
};

// API Configuration
export const API_KEY = getEnvVariable('OPENAI_API_KEY', '');
export const API_ENDPOINT = getEnvVariable('API_ENDPOINT', 'https://api.openai.com/v1/chat/completions');
export const MODEL = getEnvVariable('MODEL', 'gpt-3.5-turbo');
export const SYSTEM_PROMPT = getEnvVariable('SYSTEM_PROMPT', 'You are a helpful assistant.');
export const TIMEOUT = parseInt(getEnvVariable('TIMEOUT', '15000'), 10);
export const MAX_TOKENS = parseInt(getEnvVariable('MAX_TOKENS', '150'), 10);
export const TEMPERATURE = parseFloat(getEnvVariable('TEMPERATURE', '0.7'));

// App Configuration
export const APP_VERSION = '1.0.0';
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

/**
 * Check if API key is valid and configured
 */
export const isConfigValid = () => {
  if (!API_KEY || API_KEY === '') {
    console.error('[CONFIG] Missing OpenAI API Key. Please add your key to the .env file.');
    return false;
  }

  if (DEBUG_MODE) {
    console.log(`[CONFIG] API key found and valid (starts with: ${API_KEY.substring(0, 7)}...)`);
    console.log(`[CONFIG] API key length: ${API_KEY.length} characters`);
  }

  return true;
};
