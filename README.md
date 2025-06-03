# Google Speech Synthesizer

A React.js application that serves as a wrapper for Google Cloud Text-to-Speech API. This application allows users to convert text to speech using Google's powerful neural network models.

https://speech-synth-app.vercel.app/

## Features

- Save Google Cloud API key in browser cookies
- Customize speech synthesis preferences (language, voice, pitch, speaking rate)
- Input text directly or upload markdown (.md) files
- Preview markdown content before synthesis
- Play synthesized speech in the browser
- Download synthesized speech as MP3 files


## Prerequisites

Before you can use this application, you need:

1. A Google Cloud Platform account
2. A Google Cloud API key with access to the Text-to-Speech API
3. Node.js and npm installed on your machine

## Getting Started

### Setting up Google Cloud API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Text-to-Speech API for your project
4. Create an API key with access to the Text-to-Speech API
5. Make sure to restrict the API key to only the Text-to-Speech API for security

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your Google Cloud API key in the API Key Manager section
2. Customize your speech synthesis preferences (language, voice, pitch, speaking rate)
3. Enter text directly or upload a markdown file
4. Click "Synthesize Speech" to generate audio
5. Use the audio player to listen to the synthesized speech
6. Download the MP3 file if desired

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Technologies Used

- React.js
- React Bootstrap for UI components
- Axios for API requests
- js-cookie for cookie management
- react-markdown for rendering markdown files

## Security Note

Your API key is stored in your browser cookies and is only sent to Google Cloud APIs. It is not sent to any other servers. However, it's recommended to use API keys with appropriate restrictions to limit their usage.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Cloud Platform for providing the Text-to-Speech API
- React.js and its community for the excellent framework and tools
