import { tns } from 'tiny-slider/src/tiny-slider';
import data from '../../assets/data.json';

const tinySlider = document.querySelector('.my-slider');
const { phrases } = data;

phrases.forEach(phrase => {
    const appendElement = `
    <p>
        ${phrase.text}
    </p>`;
    tinySlider.innerHTML += appendElement;
});

const slider = tns({
    container: '.my-slider',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    speed: 400,
    mouseDrag: true,
    swipeAngle: false,
    arrowKeys: false,
    nav: false,
    controls: false,
    center: true,
    // fixedWidth: 300,
    // gutter: 300
    responsive: {
        768: {
            fixedWidth: 300,
            gutter: 300
        }
    }
});

export default slider;