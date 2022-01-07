import { Month } from './Month';
import { Picture } from './Picture';

export class Relation {

    constructor() {
        this.img = {};

        this.newMonth = new Month();
        this.newMonth.getMonths();

        this.newPicture = new Picture();
        this.newPicture.getPictures();
    }

    getSpanishDate(date) {
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    getRelationDate() {
        const rdate = document.querySelector('#RelationDate');
        rdate.innerHTML = this.getSpanishDate('06-12-21');
    }

    listenPicture() {
        const pictureUploader = document.querySelector('#monthPicture');
        pictureUploader.addEventListener('change', async (e) => {
            this.newMonth.setMonth(e.target.files[0]);
            this.newMonth.addMonthView(this.newMonth);
        });
    }

    listenSendPicture() {
        const inputUpload = document.querySelector('#uploadPicture');
        inputUpload.addEventListener('click', async (e) => {
            e.preventDefault();
            const newUrl = await this.newPicture.getUploadUrl({ img: this.newMonth });
            const formatData = this.newPicture.getFormatUrl({
                ...newUrl.fields,
                'file': this.newMonth.file
            });
            await this.newPicture.uploadPicture(formatData, newUrl.url);
            await this.newMonth.addMonth(this.newMonth);
        });
    }
}

// aws s3api list-objects --bucket anirak --prefix slider --query "Contents[?contains(Key, 'slider/')].Key"