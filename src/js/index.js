import axios from "axios";
import Notiflix from "notiflix";

import { fetchBreeds, fetchCatByBreed } from './cats-api.js'

axios.defaults.headers.common["x-api-key"] = "live_EMMweeq2QICAbT5CLfdQdJ9b1FPiTLFZWX33hzHmWvi78QSMHQP7JXGXGTotYqMs";

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
            const breedsSelectMarkup = data.map(({id, name}) => {
                return `<option value="${id}">${name}</option>`
            }).join('');
            refs.breedsSelect.insertAdjacentHTML('beforeend', breedsSelectMarkup);
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
            
            const catMarkup = `
                <img class="cat-image" src="${img}" alt="${name}">
                <div class="cat-info-container">
                    <h2 class="cat-name">${name}</h2>
                    <p class="cat-temperament"><span>Temperament: </span>${temperament}</p>
                    <p class="cat-description">${description}</p>
                </div>
            `
            refs.catInfo.innerHTML = catMarkup;
            refs.loaderBackdrop.classList.add('visually-hidden')
        })
        .catch(erorr => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
}