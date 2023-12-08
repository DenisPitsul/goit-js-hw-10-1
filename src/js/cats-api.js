import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_EMMweeq2QICAbT5CLfdQdJ9b1FPiTLFZWX33hzHmWvi78QSMHQP7JXGXGTotYqMs";

export async function fetchBreeds() {
    const {data} = await axios.get('https://api.thecatapi.com/v1/breeds');
    return data;
}

export async function fetchCatByBreed(breedId) {
    const params = new URLSearchParams({
        breed_ids: breedId
    });
    const {data} = await axios.get(`https://api.thecatapi.com/v1/images/search?${params}`);
    return data;
}