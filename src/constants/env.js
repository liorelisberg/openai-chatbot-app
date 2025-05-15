/**
 * Direct environment variable loader
 * This is a fallback method for loading environment variables when dotenv plugins fail
 */

// Export the API key from the system environment 
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

// For debug purposes only
if (OPENAI_API_KEY) {
  console.log(`[ENV DIRECT] API key found with length: ${OPENAI_API_KEY.length}`);
} 