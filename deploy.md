# GrokAni Deployment Guide

This document outlines how to deploy the GrokAni voice assistant website, which consists of a custom landing page and the Airi chat functionality.

## Project Structure

- `index.html`, `styles.css`, `script.js`: Custom landing page files
- `apps/stage-web`: The Airi chat application (from the original project)

## Deployment Steps

### 1. Development Setup

```bash
# Install dependencies
pnpm i

# Start the development server for the Stage Web (browser version)
pnpm dev
```

### 2. Deployment Options

#### Option A: Deploy as a Single Application

1. Place the landing page files (`index.html`, `styles.css`, `script.js`) in the project root
2. Configure your web server to serve these files as the entry point
3. Ensure the "Start Chat" button correctly links to the `/stage` path

#### Option B: Deploy Landing Page Separately

1. Deploy the landing page files to your web server or hosting service
2. Deploy the Airi application separately
3. Update the "Start Chat" button link to point to the deployed Airi application URL

### 3. Production Build

```bash
# Build the application for production
pnpm build
```

## Integration Notes

- The landing page is designed to seamlessly integrate with the Airi chat functionality
- The "Start Chat" button links to the `/stage` path, which is where the chat interface is located
- Make sure to update the API key links if you're using different AI model providers

## Customization

- Update the meta tags in `index.html` to reflect your specific SEO requirements
- Modify the color scheme in `styles.css` if needed
- Add additional sections to the landing page as your product evolves