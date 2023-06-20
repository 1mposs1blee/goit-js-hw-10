const API_KEY =
  'live_TKUP88scFwgk1eUAnE44dJojgwYIxjpv8FWSJUh9xx7HOko917YJxlbMAABhdYbz';
const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchBreeds = () =>
  fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });

export const fetchCatByBreed = breedId =>
  fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }

    return res.json();
  });
