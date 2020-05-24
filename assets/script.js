var current = 0;
var filmGallery = document.getElementById("film-gallery");
var filmGallery2 = document.getElementById("film-gallery-2");
var slideshow = document.getElementById("slideshow");
var slideshow2 = document.getElementById("slideshow-2");
var slides = filmGallery.getElementsByClassName("slide");
var slides2 = filmGallery2.getElementsByClassName("slide");
var slidesCounter = slides.length;
var slidesCounter2 = slides2.length;

var GalleryNavBtns = document.getElementsByClassName("gallery-nav-btn");

var slideshowInterval;
var viewPortWidth;

var resizeTimeout;

var loginBtn = document.getElementById("login-btn");
var SignBtn = document.getElementById("signup-btn");
var closeBtn = document.getElementsByClassName("close-btn");
var ModalLogin = document.getElementById("modal-overlay-log");
var ModalSign = document.getElementById("modal-overlay-signup");

var GoOtherModal = document.getElementsByClassName("go-to-modal");

loginBtn.addEventListener("click", OpenModal);
SignBtn.addEventListener("click", OpenModalSign);
for(i=0; i < GoOtherModal.length; i++) {
GoOtherModal[i].addEventListener("click", ChangeModal);
}

for(i=0; i < closeBtn.length; i++) {
closeBtn[i].addEventListener("click", CloseModal);
}


function init(){
    setupSlideshow();


    for(s=0; s < GalleryNavBtns.length; s++) {
        GalleryNavBtns[s].addEventListener("click", handleBtnClick);
        GalleryNavBtns[s].addEventListener("click", handleBtnClick2);
    }

    window.onresize = function(){
        clearTimeout(resizeTimeout);
        resizeTimeout= setTimeout (handleResize, 100);
    } 
}


init();

function handleResize () {
    setupSlideshow();
}

function setupSlideshow() {
    viewPortWidth = window.innerWidth;
    var listSize = viewPortWidth * slidesCounter;
    console.log(viewPortWidth);

    slideshow.style.width = listSize + "px";
    slideshow2.style.width = listSize + "px";
    for(var i=0; i < slidesCounter; i++){
        slides[i].style.width = viewPortWidth + "px";
    } 

    for(var i=0; i < slidesCounter; i++){
        slides2[i].style.width = viewPortWidth + "px";
    } 

}


function handleBtnClick (event) {
    var BtnClicked = this;
    var action = BtnClicked.getAttribute("data-action");

    if(action === "p") {
        
        next = current > 0 ? current - 1 : slidesCounter -1;
        
    } else if(action === "n") {
        
        next = current < slidesCounter - 1 ? current + 1 : 0;        
    }

    goToSlide(next);
}

function handleBtnClick2 (event) {
    /*StopSlideshow();*/
    var BtnClicked = this;
    var action = BtnClicked.getAttribute("data-action");

    if(action === "p2") {
        
        next2 = current > 0 ? current - 1 : slidesCounter2 -1;
        
    } else if(action === "n2") {
        
        next2 = current < slidesCounter2 - 1 ? current + 1 : 0;        
    }

    goToSlide2(next2);
}


function goToSlide(next) {
    if(current == next) {
        return;
    }

    var newOffset = viewPortWidth * next; 
    slideshow.style.transform = "translateX(" + ( - newOffset) + "px)";
    setTimeout(function(){
        current = next;
    }, 500);
    
}

function goToSlide2(next2) {
    if(current == next2) {
        return;
    }

    var newOffset2 = viewPortWidth * next2; 
    slideshow2.style.transform = "translateX(" + ( - newOffset2) + "px)";
    setTimeout(function(){
        current = next2;
    }, 500);
    
}

function OpenModal (event) {
    ModalLogin.style.display = "flex";
}

function OpenModalSign() {
    ModalSign.style.display = "flex";
}

function ChangeModal (event) {

    if (this.innerText == "Login Now!") {
        ModalSign.style.display = "none";
        ModalLogin.style.display = "flex";
    } else {
        ModalSign.style.display = "flex";
        ModalLogin.style.display = "none";
    }
}

function CloseModal() {
    ModalLogin.style.display = "none";
    ModalSign.style.display = "none";
}