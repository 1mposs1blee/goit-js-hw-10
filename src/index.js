import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const refs = {
  selectEl: document.querySelector('.breed-select-js'),
  containerEl: document.querySelector('.cat-info-js'),
  loaderEl: document.querySelector('.loader-js'),
};
const delay = 500;

const showError = () => {
  setTimeout(() => {
    refs.loaderEl.classList.add('is-hidden');

    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`,
      {
        timeout: 1000,
      }
    );
  }, delay);
};

const generateContainerMarkup = data => {
  const containerMarkup = data.map(
    ({
      breeds: [{ name }],
      breeds: [{ description }],
      breeds: [{ temperament }],
      url,
    }) => `
      <img src="${url}" width="400" alt="${name} cat"> 
      <div>
      <h1>${name}</h1>
      <p>${description}</p>
      <p><span class="span-el">Temperament</span>: ${temperament}.</p>
      </div>
      `
  );

  refs.containerEl.innerHTML = containerMarkup;
};

const generateSelectOptions = data => {
  const selectMarkup = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>)`)
    .join('');

  refs.selectEl.innerHTML = selectMarkup;
};

const onSelectChange = e => {
  const value = e.currentTarget.value;

  refs.containerEl.classList.add('is-hidden');
  refs.loaderEl.classList.remove('is-hidden');

  fetchCatByBreed(value)
    .then(data => {
      generateContainerMarkup(data);

      refs.containerEl.classList.remove('is-hidden');
      refs.loaderEl.classList.add('is-hidden');
    })
    .catch(() => {
      showError();
    });
};

fetchBreeds()
  .then(data => {
    setTimeout(() => {
      generateSelectOptions(data);

      new SlimSelect({
        select: refs.selectEl,
      });

      refs.selectEl.classList.remove('is-hidden');
      refs.loaderEl.classList.add('is-hidden');
    }, delay);
  })
  .catch(() => {
    showError();
  });

refs.selectEl.addEventListener('change', onSelectChange);
