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

 });

