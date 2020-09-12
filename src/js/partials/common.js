/*
    Общие функции
*/

const imgToBackground = () => {
    document.querySelectorAll(".ibg").forEach(el => {
        if (el.querySelector('img')) {
            el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
            el.querySelector('img').style.display = 'none';
        }
    });
};

const burgerMenu = (className) => {
    const burger = document.querySelector('.burger');
    const burgerMenu = document.querySelector(`.${className}`);
    if (burgerMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            burgerMenu.classList.toggle('is-shown');
            document.querySelector('body').classList.toggle('lock');
        });
    }
};

const sliders = () => {

    const sliderInstructors = new Swiper('.slider-instructors__container', {
        loop: true,
        navigation: {
            prevEl: '.slider-instructors__arrow--prev',
            nextEl: '.slider-instructors__arrow--next'
        },
        spaceBetween: 48,
        slidesPerView: 1,
        breakpoints: {
            767: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1343: {
                slidesPerView: 4,
            },
        }
    });

    const sliderMain = new Swiper('.programs-slider__container', {
        loop: true,
        pagination: {
            el: '.programs-slider__pagination',
            type: 'bullets',
        },
        spaceBetween: 0,
        slidesPerView: 1
    });

    const sliderTestimonials = new Swiper('.slider-testimonials__container', {
        loop: true,
        pagination: {
            el: '.slider-testimonials__pagination',
            type: 'bullets',
        },
        spaceBetween: 60,
        slidesPerView: 1,
        breakpoints: {
            1470: {
                slidesPerView: 4,
            },
            800: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            },
        }
    });

    const sliderSimilars = new Swiper('.slider-similars__container', {
        loop: true,
        navigation: {
            nextEl: '.slider-similars__arrow--next',
            prevEl: '.slider-similars__arrow--prev'
        },
        spaceBetween: 45,
        slidesPerView: 1,
        breakpoints: {
            767: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1343: {
                slidesPerView: 4,
            },
        }
    });
    
};

const popups = () => {

    const popups = document.querySelectorAll('.popup');
    const popupOpenLinks = document.querySelectorAll('.js-popup-open');
    const popupCloseLinks = document.querySelectorAll('.js-popup-close');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const body = document.querySelector('body');
    let lockPaddingOffset = null;
    let burger = null;
    let isTransitioning = false;
    let shouldUnlock = false;

    function _bodyLock() {
        lockPaddingOffset = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if (lockPadding.length > 0) {
            lockPadding.forEach(element => {
                element.style.paddingRight = lockPaddingOffset;
            });
        }
        body.style.paddingRight = lockPaddingOffset;
        body.classList.add('lock');
    }

    function _popupOpen(openingPopup) {
        if (!isTransitioning) {
            const popupActive = document.querySelector('.popup.is-opened');
            if (popupActive) {
                _popupClose(popupActive, false);
            }
            openingPopup.scroll(0, 0);
            openingPopup.classList.add('is-opened');
            isTransitioning = true;
            _bodyLock();
        }
    }

    function _popupClose(closingPopup, unlock = true) {
        if (!isTransitioning) {
            burger = document.querySelector('.burger.is-active');
            closingPopup.classList.remove('is-opened');
            isTransitioning = true;
            if (unlock && !burger) {
                shouldUnlock = true;
            }
        }
    }

    function init() {

        if (popupOpenLinks.length > 0) {
            popupOpenLinks.forEach(popupLink => {
                popupLink.addEventListener('click', e => {
                    e.preventDefault();
                    const openingPopup = document.querySelector(popupLink.getAttribute('href'));
                    if (openingPopup) {
                        _popupOpen(openingPopup);
                    }
                });
            });
        }

        if (popupCloseLinks.length > 0) {
            popupCloseLinks.forEach(popupLink => {
                popupLink.addEventListener('click', e => {
                    e.preventDefault();
                    _popupClose(popupLink.closest('.popup'));
                });
            });
        }

        if (popups.length > 0) {
            popups.forEach(element => {
                element.addEventListener('transitionend', () => {
                    isTransitioning = false;
                    if (shouldUnlock) {
                        body.style.paddingRight = '0px';
                        body.classList.remove('lock');
                        if (lockPadding.length > 0) {
                            lockPadding.forEach(element => {
                                element.style.paddingRight = '0px';
                            });
                        }
                        shouldUnlock = false;
                    }
                });

                element.addEventListener('click', (e) => {
                    if (!e.target.closest('.popup__body')) {
                        _popupClose(e.target.closest('.popup.is-opened'));
                    }
                });
            });

            document.addEventListener('keydown', e => {
                if (e.which === 27) {
                    const openedPopup = document.querySelector('.popup.is-opened');
                    if (openedPopup) {
                        _popupClose(openedPopup);
                    }
                }
            });
        }
    }

    init();

};

const formValidation = () => {
    const forms = document.querySelectorAll('.form')
    forms.forEach((formItem) => {
        const pristine = new Pristine(formItem);
        formItem.addEventListener('submit', function (e) {
            e.preventDefault();
            const valid = pristine.validate();
            if (valid) {
                formItem.submit();
            } else {
                setTimeout(() => {
                    pristine.reset();
                }, 5000)
            }
        });
    })
};

const inputMasking = () => {
    document.querySelectorAll('.js-mask-phone').forEach(item => {
        item.addEventListener('input', e => {
            VMasker(e.target).maskPattern("(999) 999-99-99");
        });
    });
};

const inputsFilter = () => {
	document.querySelectorAll('.js-only-digits').forEach(item => {
		item.addEventListener('input', e => {
			e.target.value = e.target.value.replace(/\D/g, '');
		})
	})
};

const preloader = () => {
    const preloader = document.querySelector('.preloader');
    const preloaderBody = document.querySelector('.preloader__body');
    const body = document.querySelector('body'); 
    if (preloader) {
        body.classList.add('lock');
        new Promise((resolve) => {
            setTimeout(resolve, 800)
        })
        .then(() => {
            preloaderBody.style.display = 'none';
            preloader.classList.add('is-loaded');
            body.classList.remove('lock');
        });
    }
};