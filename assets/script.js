var current = 0;
var filmGallery = document.getElementById("film-gallery");
var filmGallery2 = document.getElementById("film-gallery-2");
var slides = document.getElementsByClassName("slide");

var Hamburger = document.getElementById("menu-hamb");

var galleryInner = document.getElementById("inner-slide");
var galleryInner2 = document.getElementById("inner-slide-2");
var maxSlide = slides.length;

var parent1;

var bp = {
    'xs' : 2,
    'md': 4,
    'lg' : 6,
    'xl' : 8
};


var GalleryNavBtns = document.getElementsByClassName("gallery-nav-btn");

var vw;

var resizeTimeout;


Hamburger.addEventListener("click", openMenu);

function openMenu () {
    var mobileMenu = document.getElementById("mobile-menu");
    var underMenu = document.getElementsByClassName("under-menu");
    var backgroundMobile = document.getElementById("background-mobile");
    console.log(backgroundMobile);
    if (mobileMenu.className !== "background-mobile") {
        mobileMenu.setAttribute("class", "background-mobile");
        underMenu[0].classList.add("mobile-list-menu");
        console.log(mobileMenu);
    } else {
        mobileMenu.classList.remove("background-mobile");
        underMenu[0].classList.remove("mobile-list-menu");
    }
}

/*modal */
var loginBtn = document.getElementById("login-btn");
var SignBtn = document.getElementById("signup-btn");
var closeBtn = document.getElementsByClassName("close-btn");
var ModalLogin = document.getElementById("modal-overlay-log");
var ModalSign = document.getElementById("modal-overlay-signup");
var ModalForm = document.getElementById("modal");
var GoOtherModal = document.getElementsByClassName("go-to-modal");

loginBtn.addEventListener("click", OpenModal);
SignBtn.addEventListener("click", OpenModalSign);
for(i=0; i < GoOtherModal.length; i++) {
GoOtherModal[i].addEventListener("click", ChangeModal);
}

for(i=0; i < closeBtn.length; i++) {
closeBtn[i].addEventListener("click", CloseModal);
}

ModalLogin.addEventListener("click", CloseModal);
ModalSign.addEventListener("click", CloseModal);

/*END modal */

function init(){
    setupSlideshow();


    for(s=0; s < GalleryNavBtns.length; s++) {
        GalleryNavBtns[s].addEventListener("click", handleBtnClick);
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
    vw = window.innerWidth;
    var breakpoint;

    if(vw > 0 && vw <= 768) {
        breakpoint = "xs";
    } else if (vw > 768 && vw <= 992) {
        breakpoint = "md";
    } else if (vw > 992 && vw <= 1200) {
        breakpoint = "lg";
    } else {
        breakpoint = "xl";
    }

    var newview = vw / bp[breakpoint];
    for(i=0;i<maxSlide-1; i++) {
    slides[i].style.width = newview + "px";
    }
    galleryInner.style.width = newview * maxSlide + "px";
    galleryInner2.style.width = newview * maxSlide + "px";
 
}


function handleBtnClick (event) {
    var BtnClicked = this;
    parent = BtnClicked.getAttribute("data-parent");
    var action = BtnClicked.getAttribute("data-action");
    var next = 0;
    var pages = [1,2,3];
    if(parent === "film-gallery") {
        if(action === "p") {
            console.log(parent1);
            next = current > 0 ? current - 1 : pages.length-1 ;
            console.log(next);
        } else if(action === "n") {
            
            next = current < pages.length-1 ? current + 1 : 0;        
            console.log(current);
        }} else if (parent === "film-gallery-2") {
            if(action === "p2") {
                next = current > 0 ? current - 1 : pages.length-1;
            } else if (action ==="n2") {
                next = current < pages.length-1 ? current + 1 : 0;
            }
        }
        gotoSlide(next);
    } 
    
    function gotoSlide(next) {
        
        if(current == next) {
            return;
        }
        var newOffset = vw * next; 
        if(parent === "film-gallery") {
        galleryInner.style.transform = "translateX(" + ( - newOffset) + "px)";
        } else {
        galleryInner2.style.transform = "translateX(" + ( - newOffset) + "px)";
        }
        current = next;
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

function CloseModal(event) {
    console.log(event.target);
    if(event.target.getAttribute("id") !== "modal-overlay-log" && event.target.getAttribute("id") !== "modal-overlay-signup" && event.target.getAttribute("class") !== "far fa-times-circle") {
        return;
    }
    ModalLogin.style.display = "none";
    ModalSign.style.display = "none";
}