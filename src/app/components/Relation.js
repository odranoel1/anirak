import data from '../../assets/data.json';

export class Relation {

    constructor() {
        this.months = '';
        this.relationStart = new Date('2021-06-12').getTime();
    }

    getRelationDate() {
        const rdate = document.querySelector('#RelationDate');
        rdate.innerHTML = new Date('2021-06-13').toLocaleDateString("es-MX", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    getMonth() {
        const today = new Date().getTime();
        this.months = today - this.relationStart;
        this.months = new Date(this.months).getMonth();
        const relationTime = document.querySelector('#relationTime');
        relationTime.innerHTML = this.months;
    }

    createMonth() {
        const divMonth = document.querySelector('#Months .companies');
        const { months } = data;
        months.forEach((month, i) => {
            const appendElement = `
                <div class="item">
                    <h3>Mes ${i + 1}</h3>
                    <img src="${month.img}" alt="Chocorina" class="img-fluid">
                    <p>${month.text}</p>
                </div>
            `;
            divMonth.innerHTML += appendElement;
        });
    }

    getPictures() {
        const divCarousel = document.querySelector('#Main .swiper-wrapper');
        const { slider } = data;
        const images = slider.map(img => `https://anirak.s3.amazonaws.com/data/slider/${img}`);
        images.forEach(img => {
            const appendElement = `
                <div class="swiper-slide">
                    <img class="img-fluid" src="${img}" alt="Relationship">
                </div>
            `;
            divCarousel.innerHTML += appendElement;
        });
    }
}

// aws s3api list-objects --bucket anirak --prefix slider --query "Contents[?contains(Key, 'slider/')].Key"