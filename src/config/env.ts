import Constants from 'expo-constants';

interface AppConfig {
  OPENAI_API_KEY: string;
  API_ENDPOINT: string;
  MODEL: string;
  SYSTEM_PROMPT: string;
  TIMEOUT: number;
  MAX_TOKENS: number;
  TEMPERATURE: number;
}

// Get API key with fallback strategies
const getApiKey = (): string => {
  const sources = [
    Constants.expoConfig?.extra?.openaiApiKey,
    Constants.manifest?.extra?.openaiApiKey,
    process.env.OPENAI_API_KEY,
  ];

  for (const source of sources) {
    if (source) return source;
  }

  return '';
};

export const config: AppConfig = {
  OPENAI_API_KEY: getApiKey(),
  API_ENDPOINT: 'https://api.openai.com/v1/chat/completions',
  MODEL: 'gpt-3.5-turbo',
  SYSTEM_PROMPT: 'You are a helpful assistant.',
  TIMEOUT: 5000,
  MAX_TOKENS: 150,
  TEMPERATURE: 0.7,
};

export const isConfigValid = (): boolean => {
  const apiKey = config.OPENAI_API_KEY;

  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
    console.error(
      '[CONFIG] Missing OpenAI API Key. Please check your .env file.',
    );
    return false;
  }

  if (apiKey.startsWith('sk-')) {
    return true;
  }

  console.error(
    '[CONFIG] Invalid OpenAI API Key format. Key should start with "sk-"',
  );
  return false;
};

export const setApiKey = (key: string): void => {
  config.OPENAI_API_KEY = key;
};
