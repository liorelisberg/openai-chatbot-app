// Simple test script to check .env file
const fs = require('fs');
const path = require('path');

try {
  // Check if .env file exists
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file found');

    // Read the file content
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('\nContents:');

    // Extract variables without showing full values (for security)
    const lines = envContent.split('\n').filter(line => line.trim() !== '');
    lines.forEach(line => {
      if (line.includes('=')) {
        const [key, value] = line.split('=');
        const maskedValue = value.length > 10
          ? value.substring(0, 7) + '...' + value.substring(value.length - 3)
          : '[empty]';
        console.log(`${key}=${maskedValue}`);
      } else {
        console.log(`Invalid line: ${line}`);
      }
    });

    // Check specifically for OPENAI_API_KEY
    const apiKeyLine = lines.find(line => line.startsWith('OPENAI_API_KEY'));
    if (apiKeyLine) {
      const value = apiKeyLine.split('=')[1];
      if (value.startsWith('"') || value.endsWith('"') || value.startsWith("'") || value.endsWith("'")) {
        console.log('\n⚠️ Warning: API key contains quotes which may cause issues with react-native-dotenv');
        console.log('Fix: Remove quotes around the value in .env file');
      } else {
        console.log('\n✅ API key format looks correct');
      }
    } else {
      console.log('\n❌ OPENAI_API_KEY not found in .env file');
    }
  } else {
    console.log('❌ .env file not found!');
    console.log('Create a .env file in the root directory with your OpenAI API key:');
    console.log('OPENAI_API_KEY=your_api_key_here');
  }
} catch (error) {
  console.error('Error reading .env file:', error);
}
