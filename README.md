# TMDB Movie Search App

A full-stack web application built for the Third Party API Top 3 Challenge (Team Movies and TV Shows).

## Features
- Dynamic movie search utilizing TMDB API GET requests.
- Interactive search box updating UI real-time.
- Responsive grid display with poster imagery and ratings.

## Security & API Key Management
The API key is kept completely private and is **not committed to GitHub**. 
All request calls pass through a **Netlify Serverless Function** (`netlify/functions/getMovies.js`), which accesses `process.env.TMDB_API_KEY` set securely in Netlify's environment variables.

## Local Setup
1. Clone this repository.
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Create a `.env` file in the root folder: `TMDB_API_KEY=your_tmdb_api_key`
4. Run `netlify dev` to start the local environment with function server support.