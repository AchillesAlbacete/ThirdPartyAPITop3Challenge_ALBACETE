exports.handler = async function (event) {
  const searchQuery = event.queryStringParameters.query || 'Avengers';
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'TMDB_API_KEY environment variable is missing on Netlify.' }),
    };
  }

  const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`;

  try {
    const response = await fetch(tmdbUrl);
    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: data.status_message || 'TMDB API error' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data.results || []),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};