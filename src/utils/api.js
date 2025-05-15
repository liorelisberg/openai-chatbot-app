import {config, isConfigValid} from '../config/env';

/**
 * API utility functions
 */

/**
 * Fetch with timeout to handle hanging requests
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} - Promise that resolves with the fetch response or rejects on timeout
 */
export const fetchWithTimeout = (url, options, timeout = config.TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout),
    ),
  ]);
};

/**
 * Send a chat message to OpenAI API
 * @param {string} message - The user's message
 * @returns {Promise} - Promise that resolves with the API response
 * @throws {Error} If API key is not configured or API request fails
 */
export const sendChatMessage = async message => {
  if (!isConfigValid()) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetchWithTimeout(
    config.API_ENDPOINT,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: config.MODEL,
        messages: [
          {
            role: 'system',
            content: config.SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: config.MAX_TOKENS,
        temperature: config.TEMPERATURE,
      }),
    },
    config.TIMEOUT,
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
