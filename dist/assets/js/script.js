document.addEventListener('DOMContentLoaded', function () {

let categoryCrane = document.querySelectorAll('.list-item');
let descriptionCrane = document.querySelectorAll('.description-item');


categoryCrane.forEach((item,index)=>{
  item.addEventListener('click', ()=>{
    descriptionCrane.forEach((item,index)=>{
      item.classList.remove('dsp-f')
    })
    descriptionCrane[index].classList.add('dsp-f')
  })
})

let nextRevButt = document.querySelector('.review-next')
let prevRevButt = document.querySelector('.review-prev')

nextRevButt.addEventListener('click', ()=>{
  swiper.slideNext();
  })

  prevRevButt.addEventListener('click', ()=>{
    swiper.slidePrev();
    })
 });




 const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  width: 580,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
