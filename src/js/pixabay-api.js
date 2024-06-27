export const params = new URLSearchParams({
  key: '44502992-491f023f405adfa93e793762c',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

export function getImages(url) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(response.status);
    return response.json();
  });
}


