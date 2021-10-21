export class AnimationObserver {
    constructor() {
      this.section3 = document.querySelectorAll('.technologies .item > img'),
      this.section4 = document.querySelectorAll('.globe-img > img'),
      this.section5 = document.querySelectorAll('.companies .item > img'),
      this.section7 = document.querySelectorAll('#About img'),
      this.footer = document.querySelectorAll('footer img'),
  
      this.observeElement = (entries, observer) => {
        entries
        .filter(entry => entry.isIntersecting)
        .forEach((entry) => {
          const img = entry.target;
          const src = img.getAttribute('data-lazy');
  
          img.setAttribute('src', src);
          img.classList.add('show');
          observer.disconnect();
        })
      }
  
      this.services = this.section3.forEach((element) => {
        const observer = new IntersectionObserver(this.observeElement, {
          threshold: 0.5
        });
        observer.observe(element);
      });
  
      this.phrase2 = this.section4.forEach((element) => {
        const observer = new IntersectionObserver(this.observeElement, {
          threshold: 0.5
        });
        observer.observe(element);
      });
  
      this.companies = this.section5.forEach((element) => {
        const observer = new IntersectionObserver(this.observeElement, {
          threshold: 0.5
        });
        observer.observe(element);
      });
  
      this.about = this.section7.forEach((element) => {
        const observer = new IntersectionObserver(this.observeElement, {
          threshold: 0.5
        });
        observer.observe(element);
      });
  
      this.footerimg = this.footer.forEach((element) => {
        const observer = new IntersectionObserver(this.observeElement, {
          threshold: 0.5
        });
        observer.observe(element);
      });
  
    }
  }
  