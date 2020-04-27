export class AnimationPage {

    getMenu() {
        return document.querySelector('.Header');
    }

    getServices() {
        return document.querySelectorAll('.technologies');
    }

    clickHamburguer() { // Toogle Menu Mobil
        const btnMenu = document.querySelector('#btn-menu');

        btnMenu.addEventListener('click', (event) => {
            event.preventDefault();

            this.toggleMenu();

        });
    }

    toggleMenu() {
        const dropMenu = document.querySelector('#drop-menu');

        if (!dropMenu.classList.contains('show')) {
            dropMenu.classList.add('show');
            dropMenu.style.display = 'block';
        } else {
            dropMenu.classList.remove('show');
            dropMenu.style.display = 'none';
        }
    }

    scrollTop() { //Scroll to Top
        const scrollButton = document.querySelector('.scroll-button');

        scrollButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ 'behavior': 'smooth', 'top': 0 });
        });

        document.addEventListener("scroll", (e) => {
            const scrolled = document.scrollingElement.scrollTop;

            if (scrolled > 0) {
                scrollButton.classList.add('show');
                scrollButton.classList.remove('hide');
            } else {
                scrollButton.classList.add('hide');
                scrollButton.classList.remove('show');
            }
        });
    }

    menuFixed() { // Menu Fixed
        const heightMenu = this.getMenu().offsetHeight;

        document.addEventListener("scroll", (e) => {
            const scrolled = document.scrollingElement.scrollTop;

            if (scrolled > 0) {
                this.getMenu().classList.add('fixed');
                this.getMenu().nextElementSibling.style.marginTop = `${heightMenu}px`;
            } else {
                this.getMenu().classList.remove('fixed');
                this.getMenu().nextElementSibling.style.marginTop = 'auto';
            }
        });
    }

    scrollToSection() { //Scroll To Section
        const itemMenu = document.querySelectorAll('.item-menu');

        itemMenu.forEach(im => {
            im.addEventListener('click', (e) => {

                const strAncla = im.getAttribute('href');
                if (strAncla.length > 0) {
                    e.preventDefault();

                    const tablet_size = window.matchMedia("(max-width: 768px)");
                    if (tablet_size.matches) {
                        this.toggleMenu('movil');
                    }
                    
                    switch (strAncla) {
                        case "#About":
                            return this.moveScrollTo(strAncla);
                        case "#Services":
                            return this.moveScrollTo(strAncla);
                        case "#StudyCases":
                            return this.moveScrollTo(strAncla);
                        case "#Contact":
                            return this.moveScrollTo(strAncla);
                        case "#Plans":
                            return this.moveScrollTo(strAncla);
                    }
                }
            })
        })
    }

    moveScrollTo(strAncla) {
        const menu = this.getMenu().clientHeight;
        const option = document.querySelector(strAncla);

        return window.scrollTo({ 'behavior': 'smooth', 'top': option.offsetTop - menu });
    }

    toggleServices() { // Show services
        const web_site = this.getServices().item(0);
        const mobile_app = this.getServices().item(1);
        mobile_app.classList.add('d-none');

        const clickIt = document.querySelectorAll('.click-it');

        clickIt.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const item = button.getAttribute('data-item');

                if (item == 'web' && web_site.classList.contains('d-none')) {
                    web_site.classList.remove('d-none');
                    web_site.classList.add('animated');
                    web_site.classList.add(`${web_site.getAttribute('data-animation')}`);

                    mobile_app.classList.add('d-none');
                }

                if (item == 'mobil' && mobile_app.classList.contains('d-none')) {
                    mobile_app.classList.remove('d-none');
                    mobile_app.classList.add('animated');
                    mobile_app.classList.add(`${mobile_app.getAttribute('data-animation')}`);

                    web_site.classList.add('d-none');
                }

            });
        });
    }

    hoverServices() {
        const it_item = document.querySelectorAll('.technologies .item');

        it_item.forEach(item => {
            item.addEventListener("mouseover", (event) => {
                item.classList.add(`animated`);
                item.classList.add(`${item.getAttribute('data-animation')}`);
            });
        });

        it_item.forEach(item => {
            item.addEventListener("mouseleave", (event) => {
                item.classList.remove(`animated`);
                item.classList.remove(`${item.getAttribute('data-animation')}`);
            });
        });
    }

}