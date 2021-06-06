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



  //---------------------------Order Input Validation

  const form = document.querySelectorAll('.personal-data__input')
  const userName = document.getElementById('user-name')
  const phoneNumber = document.getElementById('phone-number')
  const street = document.getElementById('street')
  const home = document.getElementById('home')
  const apartment = document.getElementById('apartment')


  form.forEach((item, index) => {
    console.log(index)
    item.addEventListener('change', (e) => {
      e.preventDefault();
      console.log(item)
      item.сlassName = "personal-data__input";
      checkInputs(item);
    })
  })


  function checkInputs(item) {

    const inputOne = item.value.trim();

    if (item.id != "phone-number") {
      if (inputOne === "") {
        setErrorFor(item)
      }
      else {
        setSuccsessFor(item)
      }

    }
    else if (!validatePhone(inputOne)) {
      setErrorFor(item)
    }
    else {
      setSuccsessFor(item)
    }

  }

  function validatePhone(phone) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(phone);
  }

  function setErrorFor(input) {
    if (input.classList.contains("personal-data__input-succsess")) {
      input.classList.remove("personal-data__input-succsess")
    }
    input.classList.add('personal-data__input-error')
  }

  function setSuccsessFor(input) {
    if (input.classList.contains("personal-data__input-error")) {
      input.classList.remove("personal-data__input-error")
    }
    input.classList.add('personal-data__input-succsess')
  }

  let nav = document.querySelector('.fp-right')
  let pageUpbutt = document.createElement('button');
  pageUpbutt.className = "page-up";
  pageUpbutt.innerHTML = "НАВЕРХ";

  let paginationPage = document.createElement('div');
  paginationPage.className = "pagination-page";
  paginationPage.innerHTML = "<span class=\"pagination-page--active\">1</span><span class=pagination-page--all>/9</span> ";
  nav.append(paginationPage)

  nav.append(pageUpbutt)

  let activeSlideNumber = 0;

  let pageUp =  document.querySelector('.page-up');
    pageUp.addEventListener('click', function(e) {
    fullpage_api.moveTo(1); });

    let section = document.querySelectorAll('.section');
    let activeSlide = document.querySelector('.pagination-page--active');

    document.body.addEventListener('wheel', function(e) {
      section.forEach((item, index) => {
        if(item.classList.contains("active")){
           activeSlide.innerHTML = fullpage_api.getActiveSection().index+1;
        }
      })
    })

    document.querySelector(".fp-right").addEventListener('click', function(e) {
      section.forEach((item, index) => {
        if(item.classList.contains("active")){
           activeSlide.innerHTML = fullpage_api.getActiveSection().index+1;
        }
      })
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


new fullpage('#fullpage', {
	//options here
  
  navigation: true,
  navigationPosition: 'right',
  // scrollOverflow:true,
  bigSectionsDestination: 'top',
});
