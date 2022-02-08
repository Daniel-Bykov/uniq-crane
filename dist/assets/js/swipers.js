export default {
  
  sliderNavigation(nextRevButt, prevRevButt, sw) {

    if (nextRevButt, prevRevButt) {

      nextRevButt.addEventListener('click', () => {
        sw.slideNext();
      })

      prevRevButt.addEventListener('click', () => {
        sw.slidePrev();
      })
    }
  },

 init (){
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
        }
      });
 }

}



  