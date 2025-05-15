import 'dotenv/config';

export default {
  name: 'OpenAI Demo',
  version: '1.0.0',
  plugins: [],
  extra: {
    openaiApiKey: process.env.OPENAI_API_KEY || null,
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  }
};

// Debug log for build time
console.debug('[ENV] Loading with API key:', process.env.OPENAI_API_KEY ? 'Found' : 'Not found'); 