!!include('./partials/common.js');

const addToFavourite = () => {
    const likeBtn = document.querySelector('.js-add-to-favourite');
    if (likeBtn) {
        likeBtn.addEventListener('click', e => {
            const heart = likeBtn.querySelector('.icon-heart');
            heart.classList.toggle('is-favourite');
        });
    }
};

const dropdownMenu = () => {
    const dropdownMenu = document.querySelector('.js-dropdown-menu');
    if (dropdownMenu) {
        dropdownMenu.addEventListener('click', e => {
            if (e.target.closest('.js-dropdown-btn')) {
                e.preventDefault();
                e.target.closest('.js-dropdown-menu').querySelector('.dropdown-menu').classList.add('is-opened');
            }
            document.body.addEventListener('click', e => {
                if (e.target.classList.contains('dropdown-menu')) {
                    document.querySelector('.dropdown-menu').classList.remove('is-opened');
                }
            });
        });
    }
};

const tabs = () => {
    document.querySelectorAll('.js-tabs-trigger').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.getAttribute('href');
            document.querySelectorAll('.js-tabs-trigger').forEach(item => {
                item.classList.remove('is-active');
            });
            document.querySelectorAll('.js-tabs-content').forEach(item => {
                item.classList.remove('is-active');
            });
            item.classList.add('is-active');
            document.querySelector(id).classList.add('is-active');
        });
    });
};

const selectors = () => {
    document.querySelectorAll('.selector').forEach(select => { 

        let selectCurrent = select.querySelector('.selector__current'),
            selectList = select.querySelector('.selector__options'),
            selectInput = select.querySelector('.selector__input'),
            selectItem = select.querySelectorAll('.selector__option');

        selectCurrent.addEventListener('click', () => {
            selectList.closest('.selector').classList.toggle('is-shown');
        });

        selectItem.forEach(item => {
            item.addEventListener('click', () => {
                let itemValue = item.getAttribute('data-value')
                let itemText = item.textContent
                selectInput.value = itemValue
                selectCurrent.textContent = itemText
                selectListHide();
            });
        });

        let selectListHide = () => {
                selectList.closest('.selector').classList.remove('is-shown')
        }

        document.addEventListener('mouseup', (e) => {
            if (!select.contains(e.target)) selectListHide();
        });

    });
};

const profileShowBio = () => {
    const unfoldBtn = document.querySelector('.js-button-unfold');
    const unfoldedText = document.querySelector('.instructor-profile__text');
    if (unfoldBtn) {
        unfoldBtn.addEventListener('click', e => {
            unfoldedText.classList.toggle('is-shown');
            unfoldedText.classList.contains('is-shown') ? unfoldBtn.textContent = 'Свернуть' : unfoldBtn.textContent = 'Развернуть';
        });
    }
};

const filterSlider = () => {
    var stepsSlider = document.querySelector('.filter-slider__line');
    var input0 = document.querySelector('.filter-slider__input--from');
    var input1 = document.querySelector('.filter-slider__input--to');
    var inputs = [input0, input1];

    if (stepsSlider) {
        noUiSlider.create(stepsSlider, {
            start: [5, 15],
            connect: true,
            tooltips: [true, wNumb({ decimals: 0 })],
            range: {
                'min': 0,
                'max': 40
            },
            format: wNumb({
                decimals: 0,
                thousand: ''
            })
        });

        stepsSlider.noUiSlider.on('update', function(values, handle) {
            inputs[handle].value = values[handle];
        });


        inputs.forEach(function(input, handle) {
            input.addEventListener('change', function() {
                stepsSlider.noUiSlider.setHandle(handle, this.value);
            });
        });
    }

};

const filterItem = () => {
    const filterBody = document.querySelector('.js-filter-body');
    if (filterBody) {
        filterBody.addEventListener('click', e => {
            if (e.target.closest('.filter-item')) {
                e.target.closest('.filter-item').classList.toggle('is-opened');
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    preloader();
    imgToBackground();
    burgerMenu('menu-header');
    popups();
    formValidation();
    inputMasking();
    inputsFilter();
    
    sliders();
    filterItem();
    filterSlider();
    profileShowBio();
    selectors();
    tabs();
    dropdownMenu();
    addToFavourite();
    svg4everybody();
});