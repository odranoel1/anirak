import { createMonth } from '../services/months';
import { createUrl, uploadPicture } from '../services/pictures';
import { Month } from './Month';
import { Picture } from './Picture';

export class Relation {

    constructor() {
        this.newMonth = new Month();
        this.newMonth.getMonths();

        this.newPicture = new Picture();
        this.newPicture.getPictures();

        this.inputSendPicture = document.querySelector('#send-picture-month');
    }

    getSpanishDate(date) {
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    getRelationDate() {
        const rdate = document.querySelector('#RelationDate');
        rdate.innerHTML = this.getSpanishDate('06-12-21');
    }

    listenPicture() {
        const loadPicture = document.querySelector('#load-picture-month');
        loadPicture.addEventListener('change', (e) => {
            this.inputSendPicture.disabled = false;
            this.newMonth.setMonth(e.target.files[0]);
            this.newMonth.addMonthView(this.newMonth);
        });
    }

    listenSendPicture() {
        this.inputSendPicture.disabled = true;
        this.inputSendPicture.addEventListener('click', async (e) => {
            e.preventDefault();
            this.inputSendPicture.disabled = true;
            const img = {
                name: this.newMonth.name,
                mimeType: this.newMonth.mimeType
            };
            const newUrl = await createUrl({ img });
            const formatData = this.newPicture.getFormatData({
                ...newUrl.fields,
                'file': this.newMonth.file
            });
            await uploadPicture(newUrl.url, formatData);
            await createMonth(this.newMonth);
            this.inputSendPicture.disabled = false;
        });
    }
}

// aws s3api list-objects --bucket anirak --prefix slider --query "Contents[?contains(Key, 'slider/')].Key"