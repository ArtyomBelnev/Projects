class Slider {
    constructor(images, buttons, pages, modal, closeModal, modalImg, duration = 3000) {
        this.images = images;
        this.buttons = buttons;
        this.pages = pages;
        this.modal = modal;
        this.closeModal = closeModal;
        this.modalImg = modalImg;
        this.index = 0;
        this.duration = duration;
        this.animate = true;
    }

    addActiveClass(index) {
        this.images[index].classList.add('slider__li_active');
        this.pages[index].classList.add('slider__pages-li_active');
    }

    removeActiveClass(index) {
        this.images[index].classList.remove('slider__li_active');
        this.pages[index].classList.remove('slider__pages-li_active');
    }

    setIndex(number) {
        if (number >= this.images.length) {
            this.index = 0;
        } else if (number < 0) {
            this.index = this.images.length - 1;
        } else {
            this.index = number;
        }
    }

    changePage(number) {
        this.removeActiveClass(this.index);

        if (number >= 0 && number < this.images.length) {
            this.setIndex(number);
        }

        this.addActiveClass(this.index);
    }

    startSlideShow() {
        this.interval = setInterval(this.nextSlide.bind(this), this.duration);
    }

    stopSlideShow() {
        clearInterval(this.interval);
    }

    nextSlide() {
        this.removeActiveClass(this.index);
        this.setIndex(this.index + 1);
        this.addActiveClass(this.index);
    }

    prevSlide() {
        this.removeActiveClass(this.index);
        this.setIndex(this.index - 1);
        this.addActiveClass(this.index);
    }

    controllerClick(event) {
        let target = event.target.dataset.target;

        if (target) {
            event.preventDefault();
            if (target.toLowerCase() === 'next') {
                this.nextSlide();
            } else if (target.toLowerCase() === 'prev') {
                this.prevSlide();
            } else if (target >= '0' && target <= '9') {
                this.changePage(Number.parseInt(target));
            }
        }

        this.getWindows(event);
    }

    getWindows(e) {
        let target = e.target.getAttribute('src');

        if (target) {
            this.modal.classList.add('modal-active');
            this.modalImg.setAttribute('src', target);
        }
    }

    getCloseMod() {
        this.modal.classList.remove('modal-active');
    }

    controllerHover() {
        this.animate = !this.animate;

        if (this.animate) {
            this.startSlideShow();
        } else {
            this.stopSlideShow();
        }
    }
}

export default Slider;
