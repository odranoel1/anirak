import data from '../../assets/data.json';
import { editTask } from '../services/tasks';
import { createUrl, uploadPicture } from '../services/pictures';

export class Picture {

    constructor() {
        this.uriPictures = 'https://anirak.s3.amazonaws.com/data/slider';
        this.file = null;
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

    getFormatData(fields) {
        const formData = new FormData();
        formData.append('acl', 'public-read');
        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value);
        });
        return formData;
    }

    listenAfterFile() {
        const loadPicture = document.querySelector('#load-picture');
        const sendFile = document.querySelector('#send-picture');
        const imgPreview = document.querySelector('#img-preview');
        loadPicture.addEventListener('change', e => {
            sendFile.disabled = false;
            this.file = e.target.files[0];
            imgPreview.src = URL.createObjectURL(this.file);
        });
    }

    listenSendFile() {
        const sendFile = document.querySelector('#send-picture');
        sendFile.disabled = true;
        sendFile.addEventListener('click', async () => {
            sendFile.disabled = true;
            const task = JSON.parse(localStorage.getItem('task'));
            const img = {
                name: this.file.name,
                mimeType: this.file.type
            };
            const newUrl = await createUrl({ img });
            const formatData = this.getFormatData({
                ...newUrl.fields,
                'file': this.file
            });
            await uploadPicture(newUrl.url, formatData);
            await editTask({
                id: task.id,
                desc: task.desc,
                completed: task.completed,
                createdAt: task.createdAt,
                url: `https://anirak.s3.amazonaws.com/data/memories/${this.file.name}`
            });
            sendFile.disabled = false;
        });
    }
}

// aws s3api list-objects --bucket anirak --prefix slider --query "Contents[?contains(Key, 'slider/')].Key"