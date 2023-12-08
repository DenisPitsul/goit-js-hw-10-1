import Notiflix from "notiflix";

import { fetchBreeds, fetchCatByBreed } from './cats-api.js'
import { getBreadsSelectMarckup, getCatMarckup } from './createMarckup.js'

const refs = {
    breedsSelect: document.querySelector('.breed-select'),
    loaderBackdrop: document.querySelector('.loader-backdrop'),
    catInfo: document.querySelector('.cat-info')
}

renderBreeds();

refs.breedsSelect.addEventListener('change', event => {
    renderCatByBreed(event.target.value);
});

function renderBreeds() {
    refs.loaderBackdrop.classList.remove('visually-hidden')
    fetchBreeds()
        .then(data => {
            refs.breedsSelect.insertAdjacentHTML('beforeend', getBreadsSelectMarckup(data));
            refs.loaderBackdrop.classList.add('visually-hidden')
        })
        .catch(erorr => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
}

function renderCatByBreed(breedId) {
    refs.loaderBackdrop.classList.remove('visually-hidden');
    fetchCatByBreed(breedId)
        .then(data => {
            const img = data[0].url;
            const name = data[0].breeds[0].name;
            const description = data[0].breeds[0].description;
            const temperament = data[0].breeds[0].temperament;

            refs.catInfo.innerHTML = getCatMarckup(img, name, description, temperament);
            refs.loaderBackdrop.classList.add('visually-hidden')
        })
        .catch(erorr => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
}