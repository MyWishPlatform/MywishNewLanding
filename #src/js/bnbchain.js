document.addEventListener('DOMContentLoaded', () => {
    function addStr(str, index, stringToAdd){
        return str.slice(0, index) + stringToAdd + str.slice(index, str. length);
    }

    const swiperWatch = new Swiper('.watch-bnbchain-swiper', {
        // autoHeight: true,
        slidesPerView: 1,
        loop: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.watch__right',
            prevEl: '.watch__left',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    const swiperWatcher = new Swiper('.watch-bnbchain-swiper', {
        // autoHeight: true,
        slidesPerView: 1,
        loop: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.watch-bnbchain-swiper__right',
            prevEl: '.watch-bnbchain-swiper__left',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    const headerManager = () => {
        const headerLinks = document.querySelector('.header__links');
        headerLinks.addEventListener('click', e => {
            let target = e.target;
            if(target.closest('.header-dropdown')){
                return;
            }
            target = target.closest('.header__drop');
            if(!target.classList.contains('header__drop_active')){
                const curActive = headerLinks.querySelector('.header__drop_active');
                if(curActive)
                    curActive.classList.remove('header__drop_active');
            }
            target.classList.toggle('header__drop_active');
        });
    }

    const menuMobileManager = () => {
        const burger = document.querySelector('.header__burger'),
            menu = document.querySelector('.header__menu');
        burger.addEventListener('click', () => {
            burger.classList.toggle('header__burger_active');
            menu.classList.toggle('header__menu_active');
        });
    }

    const tabsManager = () => {
        const switchers = document.querySelector('.solution__swithers');
        const tabs = document.querySelector('.solution__tabs');
        switchers.addEventListener('click', (e) => {
            const elem = e.target.closest('.solution-switcher');
            if(elem){
                switchers.querySelector('.solution-switcher_active').classList.remove('solution-switcher_active');
                const id = elem.id.split('-')[1];
                elem.classList.add('solution-switcher_active');
                tabs.querySelector('.solution-tab_active').classList.remove('solution-tab_active');
                tabs.querySelector(`#solution-tab_${id}`).classList.add('solution-tab_active');
            }
        });
    }

    const signManager = () => {
        const form = document.getElementById('sign-form');
        const input = form.querySelector('.sign__input');
        const inputContainer = form.querySelector('.sign__wrap');
        const btn = form.querySelector('.sign__submit');
        const modalSuccess = document.getElementById('modal-success');
        input.addEventListener('blur', (e) => {
            if(!e.target.checkValidity()){
                inputContainer.classList.add('sign__input_error');
                btn.disabled = true;
            } else {
                inputContainer.classList.remove('sign__input_error');
                btn.disabled = false;
            }
        });
        form.addEventListener('submit', e => {
            e.preventDefault();
            if(input.value){
                modalSuccess.classList.remove('modal__overlay_inactive');
                input.value = '';
            } else{
                inputContainer.classList.add('sign__input_error');
                btn.disabled = true;
            }

        });
        modalSuccess.addEventListener('click', e => {
            if(e.target.matches('.modal__btn') || e.target.matches('.modal__overlay') || e.target.matches('.modal__close'));
            modalSuccess.classList.add('modal__overlay_inactive');
        })
    }
    headerManager();
    signManager();
    tabsManager();
    menuMobileManager();
});
