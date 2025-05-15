# Contributing Guidelines

Thank you for your interest in contributing to the OpenAI Chatbot Demo! This document outlines the process for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork to your local machine
3. Install dependencies with `npm install`
4. Create a `.env` file with your OpenAI API key (see README.md)

## Development Workflow

1. Create a branch for your feature/fix: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Run tests: `npm test`
4. Ensure your code passes linting: `npm run lint`
5. Commit your changes with a descriptive message
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request to the main repository

## Code Standards

- Follow the existing code style and naming conventions
- Write meaningful commit messages
- Add/update tests for your changes
- Update documentation when necessary

## Project Structure

The app follows a modular structure:

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
```

## Testing

- Write unit tests for new functionality
- Run existing tests to ensure your changes don't break anything

## Security Considerations

- Never commit API keys or sensitive information
- Use environment variables for all secrets
- Review code for potential security issues

## Pull Request Process

1. Ensure all tests pass
2. Update the README.md if necessary
3. Your PR will be reviewed by maintainers
4. Address any requested changes
5. Once approved, your PR will be merged

## Code of Conduct

- Be respectful and inclusive
- Value constructive feedback
- Focus on the best outcome for the project

Thank you for contributing! 