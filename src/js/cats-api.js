import axios from "axios";

export async function fetchBreeds() {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
}

export async function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        breed_ids: breedId
    });
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?${params}`);
    return response.data;
}