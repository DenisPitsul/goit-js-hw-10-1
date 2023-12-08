
export const getBreadsSelectMarckup = (breads) => {
    return breads.map(({id, name}) => {
        return `<option value="${id}">${name}</option>`
    }).join('');
}

export const getCatMarckup = (img, name, description, temperament) => {
    return `
        <img class="cat-image" src="${img}" alt="${name}">
        <div class="cat-info-container">
            <h2 class="cat-name">${name}</h2>
            <p class="cat-temperament"><span>Temperament: </span>${temperament}</p>
            <p class="cat-description">${description}</p>
        </div>
    `
}