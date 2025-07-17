# GrokAni - AI Voice Assistant

GrokAni is a powerful AI voice assistant built on the open-source [Airi project](https://github.com/moeru-ai/airi), supporting multiple AI models including GPT, Claude, and Gemini. Experience natural conversations with advanced voice synthesis technology.

![GrokAni](https://ciwjjfcuhubjydajazkk.supabase.co/storage/v1/object/public/webstie-icon//GrokAni.jpg)

## Features

- **Natural Voice Interaction**: Experience seamless voice conversations with advanced speech recognition and synthesis technology
- **Multiple AI Models**: Choose from GPT, Claude, Gemini, and other leading AI models for diverse conversation styles
- **Privacy First**: Your conversations stay private with local processing and secure API connections
- **Lightning Fast**: Optimized for speed with minimal latency for real-time voice interactions

## Quick Start

```bash
# Install dependencies
pnpm i

# Start the development server
pnpm dev
```

Visit `http://localhost:3000` to see the landing page, and click "Start Chat" to access the voice assistant.

## Setup Guide

1. **Choose Your AI Model**: Select from OpenAI GPT, Anthropic Claude, or Google Gemini based on your preference
2. **Get API Key**: Visit the provider's website and generate your API key
3. **Configure Settings**: Enter your API key in the settings panel and customize your voice preferences
4. **Start Chatting**: Click the "Start Chat" button and begin your AI voice conversation experience!

## Development

For detailed instructions to develop this project, follow the [CONTRIBUTING.md](CONTRIBUTING.md)

### Note
By default, `pnpm dev` will start the development server for the Stage Web (browser version). If you would like to try developing the desktop version, please make sure you read CONTRIBUTING.md to setup the environment correctly.

```bash
# Stage Web (Browser version)
pnpm dev

# Stage Tamagotchi (Desktop version)
pnpm dev:tamagotchi

# Documentation site
pnpm dev:docs
```

## License

This project is licensed under the same terms as the original [Airi project](https://github.com/moeru-ai/airi).

## Acknowledgements

GrokAni is built upon the excellent [Airi project](https://github.com/moeru-ai/airi), extending its capabilities to create a comprehensive AI voice assistant platform.