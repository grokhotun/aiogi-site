"use strict";

/*
    Общие функции
*/
var imgToBackground = function imgToBackground() {
  document.querySelectorAll(".ibg").forEach(function (el) {
    if (el.querySelector('img')) {
      el.style.backgroundImage = 'url(' + el.querySelector('img').getAttribute('src') + ')';
      el.querySelector('img').style.display = 'none';
    }
  });
};

var burgerMenu = function burgerMenu(className) {
  var burger = document.querySelector('.burger');
  var burgerMenu = document.querySelector(".".concat(className));

  if (burgerMenu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      burgerMenu.classList.toggle('is-shown');
      document.querySelector('body').classList.toggle('lock');
    });
  }
};

var sliders = function sliders() {
  var sliderInstructors = new Swiper('.slider-instructors__container', {
    loop: true,
    navigation: {
      prevEl: '.slider-instructors__arrow--prev',
      nextEl: '.slider-instructors__arrow--next'
    },
    spaceBetween: 48,
    slidesPerView: 1,
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1343: {
        slidesPerView: 4
      }
    }
  });
  var sliderMain = new Swiper('.programs-slider__container', {
    loop: true,
    pagination: {
      el: '.programs-slider__pagination',
      type: 'bullets'
    },
    spaceBetween: 0,
    slidesPerView: 1
  });
  var sliderTestimonials = new Swiper('.slider-testimonials__container', {
    loop: true,
    pagination: {
      el: '.slider-testimonials__pagination',
      type: 'bullets'
    },
    spaceBetween: 60,
    slidesPerView: 1,
    breakpoints: {
      1470: {
        slidesPerView: 4
      },
      800: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
  var sliderSimilars = new Swiper('.slider-similars__container', {
    loop: true,
    navigation: {
      nextEl: '.slider-similars__arrow--next',
      prevEl: '.slider-similars__arrow--prev'
    },
    spaceBetween: 45,
    slidesPerView: 1,
    breakpoints: {
      767: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      },
      1343: {
        slidesPerView: 4
      }
    }
  });
};

var popups = function popups() {
  var popups = document.querySelectorAll('.popup');
  var popupOpenLinks = document.querySelectorAll('.js-popup-open');
  var popupCloseLinks = document.querySelectorAll('.js-popup-close');
  var lockPadding = document.querySelectorAll('.lock-padding');
  var body = document.querySelector('body');
  var lockPaddingOffset = null;
  var burger = null;
  var isTransitioning = false;
  var shouldUnlock = false;

  function _bodyLock() {
    lockPaddingOffset = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach(function (element) {
        element.style.paddingRight = lockPaddingOffset;
      });
    }

    body.style.paddingRight = lockPaddingOffset;
    body.classList.add('lock');
  }

  function _popupOpen(openingPopup) {
    if (!isTransitioning) {
      var popupActive = document.querySelector('.popup.is-opened');

      if (popupActive) {
        _popupClose(popupActive, false);
      }

      openingPopup.scroll(0, 0);
      openingPopup.classList.add('is-opened');
      isTransitioning = true;

      _bodyLock();
    }
  }

  function _popupClose(closingPopup) {
    var unlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
      popupOpenLinks.forEach(function (popupLink) {
        popupLink.addEventListener('click', function (e) {
          e.preventDefault();
          var openingPopup = document.querySelector(popupLink.getAttribute('href'));

          if (openingPopup) {
            _popupOpen(openingPopup);
          }
        });
      });
    }

    if (popupCloseLinks.length > 0) {
      popupCloseLinks.forEach(function (popupLink) {
        popupLink.addEventListener('click', function (e) {
          e.preventDefault();

          _popupClose(popupLink.closest('.popup'));
        });
      });
    }

    if (popups.length > 0) {
      popups.forEach(function (element) {
        element.addEventListener('transitionend', function () {
          isTransitioning = false;

          if (shouldUnlock) {
            body.style.paddingRight = '0px';
            body.classList.remove('lock');

            if (lockPadding.length > 0) {
              lockPadding.forEach(function (element) {
                element.style.paddingRight = '0px';
              });
            }

            shouldUnlock = false;
          }
        });
        element.addEventListener('click', function (e) {
          if (!e.target.closest('.popup__body')) {
            _popupClose(e.target.closest('.popup.is-opened'));
          }
        });
      });
      document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
          var openedPopup = document.querySelector('.popup.is-opened');

          if (openedPopup) {
            _popupClose(openedPopup);
          }
        }
      });
    }
  }

  init();
};

var formValidation = function formValidation() {
  var forms = document.querySelectorAll('.form');
  forms.forEach(function (formItem) {
    var pristine = new Pristine(formItem);
    formItem.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = pristine.validate();

      if (valid) {
        formItem.submit();
      } else {
        setTimeout(function () {
          pristine.reset();
        }, 5000);
      }
    });
  });
};

var inputMasking = function inputMasking() {
  document.querySelectorAll('.js-mask-phone').forEach(function (item) {
    item.addEventListener('input', function (e) {
      VMasker(e.target).maskPattern("(999) 999-99-99");
    });
  });
};

var inputsFilter = function inputsFilter() {
  document.querySelectorAll('.js-only-digits').forEach(function (item) {
    item.addEventListener('input', function (e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  });
};

var preloader = function preloader() {
  var preloader = document.querySelector('.preloader');
  var preloaderBody = document.querySelector('.preloader__body');
  var body = document.querySelector('body');

  if (preloader) {
    body.classList.add('lock');
    new Promise(function (resolve) {
      setTimeout(resolve, 800);
    }).then(function () {
      preloaderBody.style.display = 'none';
      preloader.classList.add('is-loaded');
      body.classList.remove('lock');
    });
  }
};

;

var addToFavourite = function addToFavourite() {
  var likeBtn = document.querySelector('.js-add-to-favourite');

  if (likeBtn) {
    likeBtn.addEventListener('click', function (e) {
      var heart = likeBtn.querySelector('.icon-heart');
      heart.classList.toggle('is-favourite');
    });
  }
};

var dropdownMenu = function dropdownMenu() {
  var dropdownMenu = document.querySelector('.js-dropdown-menu');

  if (dropdownMenu) {
    dropdownMenu.addEventListener('click', function (e) {
      if (e.target.closest('.js-dropdown-btn')) {
        e.preventDefault();
        e.target.closest('.js-dropdown-menu').querySelector('.dropdown-menu').classList.add('is-opened');
      }

      document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('dropdown-menu')) {
          document.querySelector('.dropdown-menu').classList.remove('is-opened');
        }
      });
    });
  }
};

var tabs = function tabs() {
  document.querySelectorAll('.js-tabs-trigger').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var id = e.target.getAttribute('href');
      document.querySelectorAll('.js-tabs-trigger').forEach(function (item) {
        item.classList.remove('is-active');
      });
      document.querySelectorAll('.js-tabs-content').forEach(function (item) {
        item.classList.remove('is-active');
      });
      item.classList.add('is-active');
      document.querySelector(id).classList.add('is-active');
    });
  });
};

var selectors = function selectors() {
  document.querySelectorAll('.selector').forEach(function (select) {
    var selectCurrent = select.querySelector('.selector__current'),
        selectList = select.querySelector('.selector__options'),
        selectInput = select.querySelector('.selector__input'),
        selectItem = select.querySelectorAll('.selector__option');
    selectCurrent.addEventListener('click', function () {
      selectList.closest('.selector').classList.toggle('is-shown');
    });
    selectItem.forEach(function (item) {
      item.addEventListener('click', function () {
        var itemValue = item.getAttribute('data-value');
        var itemText = item.textContent;
        selectInput.value = itemValue;
        selectCurrent.textContent = itemText;
        selectListHide();
      });
    });

    var selectListHide = function selectListHide() {
      selectList.closest('.selector').classList.remove('is-shown');
    };

    document.addEventListener('mouseup', function (e) {
      if (!select.contains(e.target)) selectListHide();
    });
  });
};

var profileShowBio = function profileShowBio() {
  var unfoldBtn = document.querySelector('.js-button-unfold');
  var unfoldedText = document.querySelector('.instructor-profile__text');

  if (unfoldBtn) {
    unfoldBtn.addEventListener('click', function (e) {
      unfoldedText.classList.toggle('is-shown');
      unfoldedText.classList.contains('is-shown') ? unfoldBtn.textContent = 'Свернуть' : unfoldBtn.textContent = 'Развернуть';
    });
  }
};

var filterSlider = function filterSlider() {
  var stepsSlider = document.querySelector('.filter-slider__line');
  var input0 = document.querySelector('.filter-slider__input--from');
  var input1 = document.querySelector('.filter-slider__input--to');
  var inputs = [input0, input1];

  if (stepsSlider) {
    noUiSlider.create(stepsSlider, {
      start: [5, 15],
      connect: true,
      tooltips: [true, wNumb({
        decimals: 0
      })],
      range: {
        'min': 0,
        'max': 40
      },
      format: wNumb({
        decimals: 0,
        thousand: ''
      })
    });
    stepsSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = values[handle];
    });
    inputs.forEach(function (input, handle) {
      input.addEventListener('change', function () {
        stepsSlider.noUiSlider.setHandle(handle, this.value);
      });
    });
  }
};

var filterItem = function filterItem() {
  var filterBody = document.querySelector('.js-filter-body');

  if (filterBody) {
    filterBody.addEventListener('click', function (e) {
      if (e.target.closest('.filter-item')) {
        e.target.closest('.filter-item').classList.toggle('is-opened');
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
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