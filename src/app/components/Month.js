import axios from 'axios';

export class Month {

    constructor() {
        this.divMonth = document.querySelector('#Months .companies');
        this.uriMonths = 'http://localhost:3000/dev/api/v1/month';

        this.file = '';
        this.title = '';
        this.name = '';
        this.mimeType = '';
        this.date = null;
        this.url = '';
        this.desc = 'bailando solo';
        this.monthQty = 0;
        this.months = [];
    }

    setMonth(file) {
        this.file = file;
        this.title = this.monthQty + 1;
        this.name = `${this.title}mes.${this.file.type.replace('image/', '')}`;
        this.url = `https://anirak.s3.amazonaws.com/data/months/${this.title}mes.${this.file.type.replace('image/', '')}`;
        this.mimeType = this.file.type;

        // Calculate date for new month
        this.date = this.months[this.monthQty - 1].date;
        this.date = new Date(this.date);
        this.date = this.date.setMonth(this.date.getMonth() + 1);
        this.date = new Date(this.date).getTime();
    }

    getSpanishDate(date) {
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    getMonthQty() {
        const relationTime = document.querySelector('#relationTime');
        relationTime.innerHTML = this.monthQty;
    }

    getMonths() {
        axios.get(this.uriMonths)
            .then(res => {
                this.months = res.data.data;
                this.months.forEach((month, i) => {
                    this.addMonthView({
                        title: i + 1,
                        img: month.url,
                        date: month.date
                    })
                });
                this.monthQty = this.months.length;
                this.getMonthQty();
            })
            .catch(e => { });
    }

    addMonthView(month) {
        const appendElement = `
            <div class="item">
                <h3>Mes ${month.title}</h3>
                <img src="${month.img != null ? month.img : URL.createObjectURL(month.file)}" alt="Chocorina" class="img-fluid">
                <p>${this.getSpanishDate(month.date)}</p>
            </div>
        `;
        this.divMonth.innerHTML += appendElement;
    }

    async addMonth(data) {
        const res = await axios.post(this.uriMonths, data);
        return res;
    }
}

// aws s3api list-objects --bucket anirak --prefix slider --query "Contents[?contains(Key, 'slider/')].Key"