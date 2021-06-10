document.addEventListener('DOMContentLoaded', function () {
  
  let header = document.querySelectorAll('.header');

  let pageUpbutt = document.createElement('button');

  //-----------------------Media Query 1

  const mediaQuery = window.matchMedia('(min-width: 1230px)')
  function handleTabletChange(e) {

    if (e.matches) {
      console.log('Media Query Matched!')

       //___________________________Header Hidden
      header.forEach((item, index) => {
        if (index!=0){
          item.style.display = 'flex';
          console.log('hello');
        }
      })
        //__________________________Initial FullPage
      new fullpage('#fullpage', {  
        navigation: true,
        navigationPosition: 'right',
        autoScrolling: true,
        scrollOverflow:true,
        fitToSection: true,
        touchSensitivity: 100,
        bigSectionsDestination: 'top',

        onLeave: function( section, origin, destination, direction){
          var loadedSlide = this;
          
          let scroller = document.querySelectorAll('.fp-scroller');
         
          scroller.forEach((item, index) => {
            item.style.transform = "translate(0px, 0px) translateZ(0px)";
            })
        }
      
      });

      //__________________________Navigation
      let nav = document.querySelector('.fp-right')
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
      
        let dot = document.querySelectorAll(".fp-sr-only")
    
        let active = fullpage_api.getActiveSection().index;
        console.log(active)
    
        document.querySelector(".fp-right").addEventListener('click', function(e) {
               activeSlide.innerHTML = fullpage_api.getActiveSection().index+1;
        })
    }
  }
  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);

  //-----------------------Media Query 2

  const mediaQuery1 = window.matchMedia('(max-width: 1230px)')
  function handleTabletChange1(e) {

    if (e.matches) {
      console.log('Media Query Matched!')
     
      let header = document.querySelectorAll('.header');
      header.forEach((item, index) => {
        if (index!=0){
          item.style.display = 'none';
          console.log('hello');
        }
      })

        fullpage_api.destroy('all');
    }
  }
  mediaQuery1.addListener(handleTabletChange1);
  handleTabletChange1(mediaQuery1);

  //-----------------------Media Query 1

  const enterToProfile = document.getElementById('leave-request')
  const popupBlock = document.querySelector('.popup__block')
  const popupClose = document.querySelector('.popup__close')
  const popup = document.querySelector('.popup')
  const body = document.body;
  let nav = document.querySelector('.fp-right')
  window.onclick = function (event) {

    if (event.target == popup) {
      fullpage_api.setAllowScrolling(true);
      nav.classList.remove('dsp-n')
      console.log(popup)
      popupBlock.classList.remove("popup__block--open");
      popup.classList.remove("popup--open");
      const body = document.body;
      const scrollY = body.style.top;
      body.style.top = '';
      body.classList.remove('stop-scroll');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  enterToProfile.addEventListener('click', () => {
    fullpage_api.setAllowScrolling(false);
    nav.classList.add('dsp-n')
    popupBlock.classList.add("popup__block--open")
    popup.classList.add("popup--open");
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.top = `-${scrollY}`;
    body.classList.add('stop-scroll');

    popupClose.addEventListener('click', () => {
      fullpage_api.setAllowScrolling(true);
      popupBlock.classList.remove("popup__block--open")
      nav.classList.remove('dsp-n')
      popup.classList.remove("popup--open");
      const body = document.body;
      const scrollY = body.style.top;
      body.style.top = '';
      body.classList.remove('stop-scroll');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    })

  })

  window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  });


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
      
 });




 const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },

  width: 290,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    // when window width is >= 320px

    380:{
      width: 320,
    },

    580: { 
      width:450,
    },

    1480: { 
      width: 580,
    }

  }
});

 





