import Component from '../../views/component';

import AboutTemplate from '../../../templates/pages/about';

import Slider from '../../helpers/slider';

import Tabs from '../../helpers/tabs';

class About extends Component {
    render() {
        return new Promise((resolve) => resolve(AboutTemplate()));
    }

    afterRender() {
        this.setActions();
        this.myMapYandex();
    }

    setActions() {
        const images = document.querySelectorAll('.slider__li'),
            buttons = document.querySelectorAll('.slider__button'),
            pages = document.querySelectorAll('.slider__pages-li'),
            sliderBlock = document.querySelector('.slider'),
            tabPanel = document.querySelectorAll('.tab-panel'),
            tabsHeader = document.getElementsByClassName('tabs-header')[0],
            modal = document.getElementById('my_modal'),
            closeModal = document.getElementsByClassName('close_modal_window')[0],
            modalImg = document.getElementsByClassName('modal_img')[0],
            tab = document.querySelectorAll('.tab'),
            slider = new Slider(images, buttons, pages, modal, closeModal, modalImg),
            tabs = new Tabs(tabPanel, tabsHeader, tab);

        slider.startSlideShow();

        sliderBlock.addEventListener('click', slider.controllerClick.bind(slider), true);
        sliderBlock.addEventListener('mouseenter', slider.controllerHover.bind(slider));
        sliderBlock.addEventListener('mouseleave', slider.controllerHover.bind(slider));
        closeModal.addEventListener('click', slider.getCloseMod.bind(slider));
        tabsHeader.addEventListener('click', tabs.selectPanel.bind(tabs));
        
    }

    myMapYandex() {
        /* eslint-disable */
        ymaps.ready(init);

        function init() {
            let myMap = new ymaps.Map('map', {
                center: [53.2182583, 26.68138007],

                zoom: 18,
            });
        }
        /* eslint-enable */
    }
}

export default About;
