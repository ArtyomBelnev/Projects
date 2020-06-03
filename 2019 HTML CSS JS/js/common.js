
     var swiper = new Swiper('.swiper-container1', {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2800,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });


    var swiper = new Swiper('.swiper-container2', {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    var swiper = new Swiper('.swiper-container3', {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    var swiper = new Swiper('.swiper-container4', {
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    

    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      // loop: true,
      freeMode: true,
      loopedSlides: 5, //looped slides should be the same
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      loop:true,
      loopedSlides: 5, //looped slides should be the same
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    });

function fun1() {
     var rng=document.getElementById('r1');
   var i1=document.getElementById('i1');
    i1.value=rng.value;
}


function viewDiv(){
  document.getElementById("popup").style.display = "block";
};

function viewDiv2(){
  document.getElementById("form__reg-bottom").style.display = "none";
  document.getElementById("form__reg-bottom2").style.display = "block";
  document.getElementById("pr2").style.color = "#000";
  document.getElementById("pr1").style.color = "#cccccc";
};
function viewDiv3(){
  document.getElementById("form__reg-bottom").style.display = "block";
  document.getElementById("form__reg-bottom2").style.display = "none";
  document.getElementById("pr2").style.color = "#cccccc";
  document.getElementById("pr1").style.color = "#000";
};

function viewDiv4(){
  document.getElementById("popup").style.display = "none";
};


// ____
window.onscroll = function() {scrollFunction()};
        
        function scrollFunction() {
          if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollToTop").style.opacity = "1";
          } else {
            document.getElementById("scrollToTop").style.opacity = "0";
          }
        }
        
        var timeOut;
function goUp() {
   var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
   if(top > 0) {
      window.scrollBy(0,-100);
      timeOut = setTimeout('goUp()',20);
   } else clearTimeout(timeOut);
}
// ___


  
  

  
  

    
    