import data from '../../assets/data.json';
import axios from 'axios';

export class Picture {

    constructor() {
        this.uriFile = 'http://localhost:3000/dev/api/v1/file';
        this.uriPictures = 'https://anirak.s3.amazonaws.com/data/slider';
    }

    getPictures() {
        const divCarousel = document.querySelector('#Main .swiper-wrapper');
        const { slider } = data;
        const images = slider.map(img => `${this.uriPictures}/${img}`);
        images.forEach(img => {
            const appendElement = `
                <div class="swiper-slide">
                    <img class="img-fluid" src="${img}" alt="Relationship">
                </div>
            `;
            divCarousel.innerHTML += appendElement;
        });
    }

    getFormatUrl(fields) {
        const formData = new FormData();
        formData.append('acl', 'public-read');
        Object.entries(fields).forEach(([key, value]) => {
            console.log(key, value);
            formData.append(key, value);
        });
        return formData;
    }

    async getUploadUrl(data) {
        const res = await axios.post(this.uriFile, data);
        return res.data.data;
    }

    async uploadPicture(formData, url) {
        const res = await axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.status === 204;
    }
}

// aws s3api list-objects --bucket anirak --prefix slider --query "Contents[?contains(Key, 'slider/')].Key"