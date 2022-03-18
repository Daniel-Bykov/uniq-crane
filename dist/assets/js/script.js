document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(mapInit);
  dualSwitcher(document.querySelector(".cranes"));
  dualSwitcher(document.querySelector(".features"));
  swipersInit();
  handleTabletChange();
  addScrollSpy();
  pictureModal();
  sendForm();
  navigationHighLigth();
});

function navigationHighLigth(){
  const navigation = document.querySelector('.pages-selector')

  if(navigation){
    document.addEventListener('wheel', (e)=>{
      navigation.classList.add('pages-selector--highligth')
      setTimeout(() => {
        navigation.classList.remove('pages-selector--highligth')
      }, 500);
  })
  }
}

function isMobile() {
  let device =
    window.matchMedia("(max-width: 1230px)").matches ||
    "ontouchstart" in window;
  return device;
}

function sendForm(){
  let form = document.querySelector('.form')
  let loader = document.querySelector('.spinner-border')
  let success = document.querySelector('.form-success')

  form.addEventListener('submit', (event)=>{
    let promise = new Promise(function(resolve, reject) {
      event.preventDefault();
      form.classList.add('visually-hidden')
      loader.classList.remove('visually-hidden')
      setTimeout(() => resolve(
        loader.classList.add('visually-hidden'),
        success.classList.remove('visually-hidden')
        ), 5000);
    });  
  })
}

function swipersInit() {
  pageSlider();

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

function addScrollSpy() {
  let scrollSpy = document.querySelector(".page-navigation");

  if (scrollSpy) {
    setAttributes(document.body, {
      "data-bs-spy": "scroll",
      "data-bs-target": "#page-navigation",
      "data-bs-offset": "0",
      class: "page-navigation__scrollspy",
      tabindex: "0",
    });
  }
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function pageSlider() {
  let mainContainer = document.querySelector(".page-swiper");
  let pageSelectorActive = document.querySelector(".pages-selector__active");
  let pageSelectorAll = document.querySelector(".pages-selector__all");

  if (isMobile() && mainContainer) {
    mainContainer.classList.add("page-swiper--disabled");
    mainContainer.firstElementChild.style = "flex-direction: column";
  } else if (mainContainer) {
    const swiper = new Swiper(".page-swiper", {
      direction: "vertical",
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
      pageSelectorAll.innerHTML = `/ ${swiper.slides.length}`;
      pageSelectorActive.innerHTML = `${swiper.realIndex + 1}`;
    }

    fractionUpdate();

    swiper.on("slideChange", function () {
      swiper.slides[swiper.realIndex].scrollTo(0, 0);
      fractionUpdate();
    });
  }
}

function pictureModal() {
  document.addEventListener("click", (event) => {
    if (event.target.getAttribute("data-bs-target") === "#pictureModal") {
      let src = event.target.querySelector("img").getAttribute("src");
      let pictureModal = document.querySelector(".pictureModal__picture");
      pictureModal.setAttribute("src", src);
    }
  });
}

function mapInit() {

  let mapElement = document.querySelector('.map');

  if(mapElement){
    let addressList = document.querySelectorAll(".map__button");
    let myGeoObjects = [];
    let longtitude = null;
    let latitude = null;
    let defaultCoord = addressList[0].getAttribute("data-map-uid");
  
    setCoord(defaultCoord);
  
    var clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: false,
      clusterOpenBalloonOnClick: false,
    });
  
    var officeMap = new ymaps.Map("map", {
      center: [longtitude, latitude],
      zoom: 12,
      controls: ["smallMapDefaultSet"],
    },{
      autoFitToViewport: 'always'
    });
  
    officeMap.geoObjects.add(clusterer);
  
    addressList.forEach((item) => {
      let coord = item.getAttribute("data-map-uid");
      longtitude = coord.split(", ")[0];
      latitude = coord.split(", ")[1];
      addMarker(longtitude, latitude);
      clusterer.add(myGeoObjects);
    });
  
    mapElement.addEventListener("click", (event) => {
      let address = event.target
        .closest(".map__button")
        .getAttribute("data-map-uid");
      addressList.forEach((item) => {
        item.classList.remove("map__button--active");
      });
      event.target
        .closest(".map__button")
        .classList.toggle("map__button--active");
      setCoord(address);
      officeMap.setCenter([longtitude, latitude]);
    });

    
  function setCoord(coord) {
    longtitude = coord.split(", ")[0];
    latitude = coord.split(", ")[1];
  }

  function addMarker(longtitude, latitude) {
    myGeoObjects.push(
      new ymaps.Placemark(
        [longtitude, latitude],
        {
          balloonContentBody: "Текст в балуне",
        },
        {
          iconLayout: "default#image",
          iconImageHref: "./assets/img/icons/map.svg",
          iconImageSize: [70, 70],
          iconImageOffset: [-35, -35],
        }
      )
    );
  }
  }


}
