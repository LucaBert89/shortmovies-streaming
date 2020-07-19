let current = 0;
const filmGallery = document.getElementById("film-gallery");
const filmGallery2 = document.getElementById("film-gallery-2");
const slides = document.getElementsByClassName("slide");

const Hamburger = document.getElementById("menu-hamb");
const underMenu = document.getElementsByClassName("under-menu");
const mobileMenu = document.getElementById("mobile-menu");

const galleryInner = document.getElementById("inner-slide");
const galleryInner2 = document.getElementById("inner-slide-2");
var maxSlide = slides.length;
const GalleryNavBtns = document.getElementsByClassName("gallery-nav-btn");


const bp = {
    'xs' : 2,
    'md': 4,
    'lg' : 6,
    'xl' : 8
};

let pages;


let vw;

let resizeTimeout;


/*modal */
const loginBtn = document.getElementById("login-btn");
const SignBtn = document.getElementById("signup-btn");
const closeBtn = document.getElementsByClassName("close-btn");
const ModalLogin = document.getElementById("modal-overlay-log");
const ModalSign = document.getElementById("modal-overlay-signup");
const ModalForm = document.getElementById("modal");
const GoOtherModal = document.getElementsByClassName("go-to-modal");

/*END modal */


(function init(){
    setupSlideshow();


    for(s=0; s < GalleryNavBtns.length; s++) {
        GalleryNavBtns[s].addEventListener("click", handleBtnClick);
    }

    window.onresize = function(){
        clearTimeout(resizeTimeout);
        resizeTimeout= setTimeout (handleResize, 100);
    } 

    Hamburger.addEventListener("click", openMenu);

    for(i=0; i < underMenu.length; i++) {
        underMenu[i].addEventListener("click", closeBackground);
    }
    
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

})();

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

function handleResize () {
    setupSlideshow();
}


function handleBtnClick () {
    var BtnClicked = this;

    if(vw > 0 && vw <= 768) {
        pages = [1,2,3,4,5,6,7,8,9,10,11,12];
    } else if (vw > 768 && vw <= 992) {
        pages = [1,2,3,4,5,6];
    } else if (vw > 992 && vw <= 1200) {
        pages = [1,2,3,4]
    } else {
        pages = [1,2,3]
    }

    parent = BtnClicked.getAttribute("data-parent");
    var action = BtnClicked.getAttribute("data-action");
    var next = 0;
    if(parent === "film-gallery") {
        if(action === "p") {
            next = current > 0 ? current - 1 : pages.length-1 ;
        } else if(action === "n") {
            
            next = current < pages.length-1 ? current + 1 : 0;        
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
        let newOffset = vw * next; 
        if(parent === "film-gallery") {
        galleryInner.style.transform = "translateX(" + ( - newOffset) + "px)";
        } else {
        galleryInner2.style.transform = "translateX(" + ( - newOffset) + "px)";
        }
        current = next;
    }


function OpenModal () {
    ModalLogin.style.display = "flex";
}

function OpenModalSign() {
    ModalSign.style.display = "flex";
}

function ChangeModal () {

    if (this.innerText == "Login Now!") {
        ModalSign.style.display = "none";
        ModalLogin.style.display = "flex";
    } else {
        ModalSign.style.display = "flex";
        ModalLogin.style.display = "none";
    }
}

function CloseModal(event) {
    if(event.target.getAttribute("id") !== "modal-overlay-log" && event.target.getAttribute("id") !== "modal-overlay-signup" && event.target.getAttribute("class") !== "far fa-times-circle") {
        return;
    }
    ModalLogin.style.display = "none";
    ModalSign.style.display = "none";
}

function closeBackground() {
    mobileMenu.classList.remove("background-mobile");
    underMenu[0].classList.remove("mobile-list-menu");
}

function openMenu () {
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