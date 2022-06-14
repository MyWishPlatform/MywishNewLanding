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
            if(!isEmailValid(input.value)){
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
                modalSuccess.classList.add('modal__overlay_active');
                input.value = '';
            } else{
                btn.disabled = true;
            }

        });
        modalSuccess.addEventListener('click', e => {
            if(e.target.matches('.modal__btn') || e.target.matches('.modal__overlay') || e.target.matches('.modal__close'));
            modalSuccess.classList.remove('modal__overlay_active');
        })
    }
    headerManager();
    signManager();
    tabsManager();
    menuMobileManager();
});

const submitForm = async (email) => {
    const params = `p1=${email}`;
    fetch(`https://script.google.com/macros/s/AKfycbzTYWVM_7ZLfGiGhJzxvmcVb545SV2HNt5E8HQUrtRvn2bj72Jq2W4qdpqRchaQPRg/exec?${params}`, {
        method: "GET",
        mode: 'no-cors'
    }).then((res) => {
            console.log('email sent', res);
        }
    );
}

const isEmpty = (value) => {
    return (value == null) || (value.length == 0);
};

const isEmailValid = (value) => {
    let error;
    const re = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
    if (re.test(value)) error = false;
    else error = true;
    if(isEmpty(value)) error = true;
    return !error;
}

const checkAndSendBnB = (e) => {
    let value = document.getElementById('sign__input').value;
    let error = !isEmailValid(value);
    const form = document.getElementById('sign-form');
    const button = document.getElementById('sign__submit');
    const inputContainer = form.querySelector('.sign__wrap');
    const modalSuccess = document.getElementById('modal-success');
    if (!error) {
        document.getElementById('sign__input').value = '';
        modalSuccess.classList.add('modal__overlay_active');
        submitForm(value.trim()).then(() => {});
        button.style.pointerEvents = 'none';
        setTimeout(() => {
            button.style.pointerEvents = '';
            inputContainer.classList.remove('sign__input_error');
            button.disabled = false;
        }, 2000);
    } else {
        inputContainer.classList.add('sign__input_error');
    }
};
