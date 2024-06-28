export function getImages(searchQuery) {
  const params = new URLSearchParams({
    key: '44502992-491f023f405adfa93e793762c',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

const userUrl = 'https://pixabay.com/api/?' + params;
  return fetch(userUrl).then(response => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  });
}


