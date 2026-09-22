const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const resultsContainer = document.getElementById('movie-results');

// Initial default search
fetchMovies('Avengers');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query) {
    fetchMovies(query, categorySelect.value);
  }
});

categorySelect.addEventListener('change', () => {
  fetchMovies(input.value.trim() || 'Avengers', categorySelect.value);
});

async function fetchMovies(query, category = 'all') {
  resultsContainer.innerHTML = '<p>Loading movies...</p>';
  try {
    const params = new URLSearchParams({ query, category });
    const response = await fetch(`/.netlify/functions/getMovies?${params}`);
    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    resultsContainer.innerHTML = '<p>Error fetching movies.</p>';
  }
}

function displayMovies(movies) {
  resultsContainer.innerHTML = '';
  if (!movies || movies.length === 0) {
    resultsContainer.innerHTML = '<p>No movies found. Try another search.</p>';
    return;
  }

  movies.forEach((movie) => {
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Poster';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</p>
    `;
    resultsContainer.appendChild(card);
  });
}