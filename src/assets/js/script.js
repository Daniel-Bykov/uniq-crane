document.addEventListener("DOMContentLoaded", function () {
  dualSwitcher(document.querySelector(".cranes"));
  dualSwitcher(document.querySelector(".services"));
  swipersInit();
  handleTabletChange();
  // popup();
});

// function popup() {
//   const enterToProfile = document.querySelectorAll(".leave-request");
//   const popupBlock = document.querySelectorAll(".popup__block");
//   const popupClose = document.querySelectorAll(".popup__close");
//   const popup = document.querySelectorAll(".popup");
//   let nav = document.querySelector(".fp-right");

//   window.onclick = function (event) {
//     popup.forEach((item, index) => {
//       if (event.target == item) {
//         if (nav) {
//           fullpage_api.setAllowScrolling(true);
//           nav.classList.remove("dsp-n");
//         }

//         popupBlock.forEach((item, index) => {
//           item.classList.remove("popup__block--open");
//           popup[index].classList.remove("popup--open");
//         });

//         const body = document.body;
//         const scrollY = body.style.top;
//         body.style.top = "";
//         body.classList.remove("stop-scroll");
//         window.scrollTo(0, parseInt(scrollY || "0") * -1);
//       }
//     });
//   };

//   enterToProfile.forEach((item, index) => {
//     item.addEventListener("click", () => {
//       if (nav) {
//         fullpage_api.setAllowScrolling(false);
//         nav.classList.add("dsp-n");
//       }

//       popupBlock.forEach((item, index) => {
//         item.classList.add("popup__block--open");
//         popup[index].classList.add("popup--open");
//       });

//       const scrollY =
//         document.documentElement.style.getPropertyValue("--scroll-y");
//       const body = document.body;
//       console.dir(body);
//       body.style.top = `-${scrollY}`;
//       body.classList.add("stop-scroll");
//     });
//   });

//   popupClose.forEach((item, index) => {
//     item.addEventListener("click", () => {
//       if (nav) {
//         fullpage_api.setAllowScrolling(true);
//         nav.classList.remove("dsp-n");
//       }

//       popupBlock.forEach((item, index) => {
//         item.classList.remove("popup__block--open");
//         popup[index].classList.remove("popup--open");
//       });

//       const body = document.body;
//       const scrollY = body.style.top;
//       body.style.top = "";
//       body.classList.remove("stop-scroll");
//       window.scrollTo(0, parseInt(scrollY || "0") * -1);
//     });
//   });

//   window.addEventListener("scroll", () => {
//     document.documentElement.style.setProperty(
//       "--scroll-y",
//       `${window.scrollY}px`
//     );
//   });
// }

function swipersInit() {

  const swiper = new Swiper(".mySwiper", {
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
    swiper
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
