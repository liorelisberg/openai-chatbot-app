# Security Guide

## API Keys and Sensitive Data

This project uses the OpenAI API which requires an API key. Follow these guidelines to keep your API key secure:

### Environment Variables

1. **Never commit API keys to version control**
   - Create a `.env` file in the root directory of the project
   - Add your API key to the file: `OPENAI_API_KEY=your_api_key_here`
   - The `.env` file is listed in `.gitignore` and should never be committed

2. **How Environment Variables Are Used**
   - The app loads your API key through Expo's configuration system
   - Environment variables are securely managed and not exposed to client-side code

### API Key Security

1. **Protect Your API Key**
   - Treat your API key like a password
   - Never share it publicly or include it in client-side code
   - Regenerate your key if you suspect it has been compromised

2. **Key Usage**
   - The API key is loaded securely at runtime via the Expo Constants and environment variables
   - The configuration is managed in `src/config/env.ts`

## Best Practices

1. **Local Development**
   - Use different API keys for development and production
   - Consider using API key restrictions (IP, usage limits) via your provider

2. **Version Control**
   - Double-check your commits to ensure no secrets are included
   - Use tools like `git-secrets` to prevent accidental commits of sensitive data

3. **Production Deployment**
   - For production, use proper secrets management
   - Consider using a secrets manager or environment variables in your deployment platform

## Reporting Security Issues

If you discover a security vulnerability in this project, please report it responsibly by emailing the project maintainers. 