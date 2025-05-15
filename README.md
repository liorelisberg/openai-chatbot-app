This is a [**React Native**](https://reactnative.dev) AI Chatbot application that uses the OpenAI API.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Set up Environment Variables (Important!)

This app requires an OpenAI API key to function properly. For security reasons, API keys are not committed to version control.

1. Create a `.env` file in the root directory:

```sh
touch .env
```

2. Add your OpenAI API key to the file:

```
# .env file
OPENAI_API_KEY=your_openai_api_key_here
```

> **Security Warning**: Never commit your `.env` file to version control. It's already added to `.gitignore`.

## Step 2: Install Dependencies

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

> **Note**: A complete list of dependencies can be found in `requirements.txt`. This file is for documentation purposes only.

## Step 3: Start Metro

To start the Metro dev server, run the following command:

```sh
# Using Expo (recommended)
npm run dev

# OR using standard React Native
npm start
```

## Step 4: Build and run your app

With Metro running, open a new terminal window/pane and use one of the following commands:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, first install CocoaPods dependencies:

```sh
bundle install
bundle exec pod install
```

Then run:

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Running Tests

This project includes comprehensive test coverage with unit tests and integration tests.

```sh
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode during development
npm test -- --watch
```

## Project Structure

The app has been refactored into a modular structure:

```
src/
├── components/      # UI components
├── constants/       # App constants and configuration
├── hooks/           # Custom React hooks
├── screens/         # Main app screens
├── services/        # API and other services
├── theme/           # Theme and styling
├── types/           # TypeScript type definitions
└── utils/           # Utility functions

# Project Root
__tests__/               # Test files
__mocks__/               # Test mocks
requirements.txt         # JavaScript/React Native dependencies documentation
```

## Debug Mode

This app has a built-in debug mode to help troubleshoot issues with environment variables and API connectivity.

### Enabling Debug Mode

1. Open `src/constants/secureConfig.js`
2. Change `DEBUG_MODE` from `false` to `true`:
   ```javascript
   const DEBUG_MODE = true; // Set to true only when debugging env issues
   ```
3. Restart your application

Debug mode will show detailed logs about:
- Environment variable loading attempts
- API key validation status
- Configuration issues 

For normal usage, keep debug mode disabled to minimize console logs.

## Security

This project uses the OpenAI API which requires an API key. To keep your API key secure:

1. **Never commit API keys to version control**
2. **Use environment variables** via the `.env` file
3. **Check your code before pushing** to ensure no secrets are included

For more details, see [SECURITY.md](./SECURITY.md).

## Features

- 💬 Chat with OpenAI's GPT model
- 🎨 Beautiful and responsive UI
- 📱 Mobile-optimized experience
- 🔄 Loading states and error handling
- 📅 Message history with date grouping
- 🔌 Offline detection
- 💡 "Try Asking" suggestions with auto-send functionality
- 🎯 Randomized suggestion pool with 50+ prompt ideas

## Troubleshooting

If you're having issues, check these common problems:

1. **API Key Not Working**: Verify your OpenAI API key is correct and has sufficient quota
2. **Environment Variables Not Loading**: Ensure your `.env` file is in the root directory and restart the Metro server
3. **Build Errors**: Make sure all dependencies are installed with `npm install` or `yarn`
4. **Console Logs**: Enable debug mode (see above) to get detailed information about what's happening

For more help, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
