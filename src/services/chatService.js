import { fetchWithTimeout } from '../utils/api';
import {
  API_KEY,
  API_ENDPOINT,
  MODEL,
  SYSTEM_PROMPT,
  TIMEOUT,
  MAX_TOKENS,
  TEMPERATURE,
  isConfigValid,
} from '../constants/secureConfig';

// Simple rate limiting protection
const RATE_LIMIT = {
  requestCount: 0,
  lastResetTime: Date.now(),
  maxRequests: 10, // Maximum 10 requests
  timeWindow: 60000, // Per minute (60000ms)
  resetTimer: null,
};

// Reset request count after timeWindow
const resetRateLimit = () => {
  RATE_LIMIT.requestCount = 0;
  RATE_LIMIT.lastResetTime = Date.now();

  // Schedule next reset
  clearTimeout(RATE_LIMIT.resetTimer);
  RATE_LIMIT.resetTimer = setTimeout(resetRateLimit, RATE_LIMIT.timeWindow);
};

/**
 * Clean up timers when app is shutting down
 * Important to prevent memory leaks
 */
export const cleanupChatService = () => {
  if (RATE_LIMIT.resetTimer) {
    clearTimeout(RATE_LIMIT.resetTimer);
    RATE_LIMIT.resetTimer = null;
  }
};

// Check if rate limit has been exceeded
const checkRateLimit = () => {
  const now = Date.now();

  // If time window has passed, reset
  if (now - RATE_LIMIT.lastResetTime > RATE_LIMIT.timeWindow) {
    resetRateLimit();
    return true;
  }

  // Check if we've hit the limit
  if (RATE_LIMIT.requestCount >= RATE_LIMIT.maxRequests) {
    return false;
  }

  // Increment request count
  RATE_LIMIT.requestCount++;

  // Start reset timer if first request
  if (RATE_LIMIT.requestCount === 1) {
    RATE_LIMIT.resetTimer = setTimeout(resetRateLimit, RATE_LIMIT.timeWindow);
  }

  return true;
};

/**
 * Send a message to the OpenAI API
 * @param {string} userMessage - The user's message
 * @param {Array} messageHistory - Previous messages for context
 * @returns {Promise} - Promise resolving to the AI response
 */
export const sendMessage = async (userMessage, messageHistory = []) => {
  try {
    // Check if configuration is valid before making API call
    if (!isConfigValid()) {
      throw new Error('API key not configured. Please set up your OpenAI API key in .env file.');
    }

    // Validate inputs
    if (!userMessage || typeof userMessage !== 'string') {
      throw new Error('Invalid message format');
    }

    // Check rate limiting
    if (!checkRateLimit()) {
      throw new Error('Rate limit exceeded. Please wait before sending more messages.');
    }

    const response = await fetchWithTimeout(
      API_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            ...messageHistory.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content,
            })),
            {
              role: 'user',
              content: userMessage,
            },
          ],
          temperature: TEMPERATURE,
          max_tokens: MAX_TOKENS,
        }),
      },
      TIMEOUT
    );

    // Check for HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
        `API returned error status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Unknown API error');
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Chat service error:', error);
    // Classify error types for better handling by the UI
    if (error.message.includes('timeout')) {
      throw new Error('Request timeout: The server took too long to respond. Please try again.');
    } else if (error.message.includes('API key')) {
      throw new Error('API key error: ' + error.message);
    } else if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded: Too many requests. Please try again later.');
    }
    throw error;
  }
};

/**
 * Check internet connection
 * @returns {Promise<boolean>} - True if connected, false otherwise
 */
export const checkConnection = async () => {
  try {
    await fetch('https://www.google.com/', { method: 'HEAD' });
    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
