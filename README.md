
# Namluv.to - Voice Marketplace

This is a web application for a digital voice marketplace platform that connects customers with human voice actors and provides AI-powered voice services. It's built with React, TypeScript, and Tailwind CSS, and uses the Google Gemini API for AI voice generation.

## Features

- **Browse Voice Actors**: Users can browse a catalog of professional voice actors, view their profiles, and listen to samples.
- **AI Voice Generation**: A text-to-speech feature powered by the Gemini API to generate high-quality AI voices.
- **Job Postings**: Customers can post job requests for voice-over work.
- **User Dashboard**: A centralized panel for users to manage their job postings (as a customer) and their active jobs (as an interpreter).
- **Responsive Design**: The application is fully responsive and works on all screen sizes.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Services**: [Google Gemini API](https://ai.google.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project is designed to run in a modern web browser. No local installation is required to view the live version. For local development, you would typically need Node.js and npm.

### Running the Application

Since this is a static project using ES modules and CDN links, you can run it by simply opening the `index.html` file in your web browser. For a better development experience, you can use a simple local server:

1.  **Install a local server (if you don't have one):**
    ```bash
    npm install -g serve
    ```

2.  **Run the server from the project root:**
    ```bash
    serve .
    ```

3. **Set up environment variables:**
   For the AI Voice Generation feature to work, you need a Google Gemini API key. The application expects this key to be available as `process.env.API_KEY`. In a real build environment, this would be handled by a bundler. For this setup, you'll need to ensure the key is accessible in the browser's context.

## Project Structure

```
/
├── components/       # Reusable React components (Header, Footer, AudioPlayer, etc.)
├── pages/            # Page components corresponding to routes (HomePage, BrowsePage, etc.)
├── services/         # Services for interacting with external APIs (e.g., Gemini API)
├── types.ts          # Shared TypeScript type definitions
├── constants.ts      # Mock data and application constants
├── App.tsx           # Main application component with routing setup
├── index.tsx         # Entry point of the React application
└── index.html        # Main HTML file
```
