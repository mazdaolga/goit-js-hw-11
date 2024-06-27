// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { params, getImages } from './js/pixabay-api.js';
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
  setTimeout(() => {
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
    params.set('q', userText);
    const userUrl = 'https://pixabay.com/api/?' + params;
    getImages(userUrl)
      .then(data => {
        console.log(data);
        if (!data.totalHits) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again!'
          );
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
      });
    e.target.reset();
    refs.loader.classList.add('hidden');
  }, 1000);
});
