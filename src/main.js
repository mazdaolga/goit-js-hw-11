
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api.js';
import renderGallery from './js/render-function.js';

const refs = {
  form: document.querySelector('#form-request'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  refs.loader.classList.remove('hidden');
  const userText = e.target.query.value.trim();

  if (!userText) {
    refs.loader.classList.add('hidden');
    iziToast.warning({
      title: 'Attention!',
      message: 'Search field must be filled',
      messageSize: '16',
      position: 'topRight',
      close: false,
      displayMode: 1,
    });
    return;
  }

  getImages(userText)
    .then(data => {
      if (!data.totalHits) {
      refs.gallery.innerHTML = ''; // Clear the gallery
        throw new Error('Sorry, there are no images matching your search query. Please try again!');
      }
      renderGallery(data, refs.gallery);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error!',
        message: error.message,
        messageSize: '16',
        position: 'topRight',
        close: false,
        displayMode: 1,
      });
    })
    .finally(() => {
      refs.loader.classList.add('hidden');
    });

  e.target.reset();
});

