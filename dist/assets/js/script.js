document.addEventListener("DOMContentLoaded", function () {
  dualSwitcher(document.querySelector(".cranes"));
  dualSwitcher(document.querySelector(".features"));
  swipersInit();
  handleTabletChange();
});

function isMobile(){
  let device = ((window.matchMedia('(max-width: 1230px)')).matches || ('ontouchstart' in window))
  return device
}

function swipersInit() {

  pageSlider ()
  
  const reviews = new Swiper(".review-box", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  const swiperRegular = new Swiper(".mySwiper-Regular", {
    pagination: {
      el: ".swiper-pagination--regular",
      type: "fraction",
    },
    width: 290,

    breakpoints: {
      380: {
        width: 320,
      },

      580: {
        width: 450,
      },

      1480: {
        width: 945,
      },
    },
  });

  function sliderNavigation(nextRevButt, prevRevButt, sw) {
    if ((nextRevButt, prevRevButt)) {
      nextRevButt.addEventListener("click", () => {
        sw.slideNext();
      });
      prevRevButt.addEventListener("click", () => {
        sw.slidePrev();
      });
    }
  }

  sliderNavigation(
    document.querySelector(".review-next--regular"),
    document.querySelector(".review-prev--regular"),
    swiperRegular
  );
  sliderNavigation(
    document.querySelector(".review-next"),
    document.querySelector(".review-prev"),
    reviews
  );
}

function dualSwitcher(switcherCategory) {
  if (switcherCategory) {
    let catalog = switcherCategory.querySelectorAll(".product-selector__item");
    let description = switcherCategory.querySelectorAll(".description-item");

    catalog.forEach((item, index) => {
      item.addEventListener("click", () => {
        catalog.forEach((item, index) => {
          item.classList.remove("product-selector__item--active");
        });

        item.classList.add("product-selector__item--active");

        description.forEach((item) => {
          item.classList.remove("description-item--active");
        });
        description[index].classList.add("description-item--active");
      });
    });
  }
}

function handleTabletChange(e) {
  const mediaQuery = window.matchMedia("(min-width: 1230px)");
  if (mediaQuery.matches) {
    let nav = document.querySelector(".fp-right");

    if (nav) {
      pageUpbutt.className = "page-up";
      pageUpbutt.innerHTML = "НАВЕРХ";

      let paginationPage = document.createElement("div");
      paginationPage.className = "pagination-page";
      paginationPage.innerHTML =
        '<span class="pagination-page--active">1</span><span class=pagination-page--all>/9</span> ';
      nav.append(paginationPage);
      nav.append(pageUpbutt);

      let pageUp = document.querySelector(".page-up");
      pageUp.addEventListener("click", function (e) {
        fullpage_api.moveTo(1);
      });
    }
  }
}


function pageSlider (){
  
  let mainContainer = document.querySelector('.page-swiper')
  let pageSelectorActive = document.querySelector('.pages-selector__active')
  let pageSelectorAll = document.querySelector('.pages-selector__all')
  
  if(isMobile()){
    mainContainer.classList.add('page-swiper--disabled')
    mainContainer.firstElementChild.style = "flex-direction: column"
  }
  
  else if(mainContainer) {
    const swiper = new Swiper(".page-swiper", {
      direction: 'vertical',
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: ".pages-selector__pagination",
        clickable: true,
        type: "bullets",
      },
    });
  
    function fractionUpdate() {
      pageSelectorAll.innerHTML = `/ ${swiper.slides.length }`
      pageSelectorActive.innerHTML = `${swiper.realIndex + 1}`
    };
    
    fractionUpdate()

    swiper.on('slideChange', function () {
      swiper.slides[swiper.realIndex].scrollTo(0, 0)
      fractionUpdate()
    });
  }
}