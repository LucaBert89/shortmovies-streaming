// questa non ti serve a niente
// peraltro se ne usi una sola con il tuo metodo, gli slider entrano in competizione per la variabile
// che dice a che pagina dello slider sei
// var current = 0;

// queste non ti servono più
// questa soluzione scala malissimo ti costringe a fare n variabili per n slider
// var filmGallery = document.getElementById("film-gallery");
// var filmGallery2 = document.getElementById("film-gallery-2");

var slides = document.getElementsByClassName("slide");

var Hamburger = document.getElementById("menu-hamb");

// queste non ti servono più
// questa soluzione scala malissimo ti costringe a fare n variabili per n slider
// var galleryInner = document.getElementById("inner-slide");
// var galleryInner2 = document.getElementById("inner-slide-2");

var sliders = document.getElementsByClassName('inner-slider');
// oppure (questo è meno retrocompatibile)
// var sliders = document.querySelectorAll('.inner-slider');

/* Questo perchè?
var maxSlide = slides.length;
*/

// questa non ti serve più
// var parent1;

var bp = {
    'xs' : 2,
    'md' : 4,
    'lg' : 6,
    'xl' : 8
};

// in una variabile ti tieni il valore del breakpoint corrente
var currentBreakpoint;

// questa non ti serve più
// var pages;
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


    for( s = 0; s < GalleryNavBtns.length; s++ ) {
        GalleryNavBtns[s].addEventListener("click", handleBtnClick);
    }

    window.onresize = function(){
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout (handleResize, 350);
    };
}


init();

function handleResize () {
    setupSlideshow();
}

function setupSlideshow() {
    vw = window.innerWidth;

    // questa non serve ce l'hai gia globale
    // var pages;

    // ti fai una copia del breakpoint corrente prima che venga cambiato
    var initialBp = currentBreakpoint;

    if(vw > 0 && vw <= 768) {
        currentBreakpoint = "xs";
    } else if (vw > 768 && vw <= 992) {
        currentBreakpoint = "md";
    } else if (vw > 992 && vw <= 1200) {
        currentBreakpoint = "lg";
    } else {
        currentBreakpoint = "xl";
    }


    // prendi il numero di pagine al breakpoint precedente
    // l'if serve per gestire il caso della prima volta
    var oldBpPages = initialBp ? bp[initialBp] : bp[currentBreakpoint];

    // prendi il numero di pagine al nuovo breakpoint
    var newBpPages = bp[currentBreakpoint];

    var newview = vw / newBpPages;
    // cicli sugli sliders
    for( var j = 0; j < sliders.length; j++ ) {

        // prendi le slide dello slider corrente
        var sliderSlides = sliders[j].getElementsByClassName('slide');

        var parentElementId = sliders[j].getAttribute("data-parent");

        var parentElement = document.getElementById(parentElementId);

        // prendi la pagina corrente dello slider (importante il cast ad intero perche nel data è a stringa)
        var currentSliderCurrentPage = parseInt( parentElement.getAttribute('data-current-page'), 10 );

        // e ricalcoli in che pagina saresti al nuovo breakpoint
        // il calcolo è una semplice proporzione ( pagina corrente : n° pagine al vecchio bp = n* pagine al nuovo bp : x )
        // arrotondi e normalizzi prendendo il max tra il numero che ti viene (che potrebbe essere 0) e 1 (il minimo numero di pagina)
        var newCurrentPage = Math.max( Math.floor( ( oldBpPages / newBpPages  ) * currentSliderCurrentPage ), 1);

        // cicli sulle slides del singolo slider
        for(i = 0; i < sliderSlides.length; i++ ) {
            sliderSlides[i].style.width = newview + "px";
        }

        // metti sempre la precedenza agli operatori usando le parentesi
        sliders[j].style.width = (newview * sliderSlides.length) + "px";

        sliders[j].setAttribute('data-current-page', newCurrentPage );

        // riposizioni la galleria
        goToSlide( parentElement, newCurrentPage );
    }
}


function handleBtnClick(event) {
    var btnClicked = this;

    var parentElementId = btnClicked.getAttribute("data-parent");
    var parentElement = document.getElementById(parentElementId);
    // il numero di pagine dello slider corrente te lo puoi recuperare senza quel blocco if
    // troppo imperativo
    // basta fare la divisione arrotondata per eccesso del numero di pagine diviso il numero di elementi visualizzabili 
    // al breakpoint corrente
    // ricordati che data-max-slides è una string per poterla dividere senza preoccupazioni devi fare il cast a intero
    var currentSliderPages = Math.ceil( parseInt( parentElement.getAttribute('data-max-slides'), 10 ) / bp[currentBreakpoint] );
    var sliderCurrentPage = parseInt( parentElement.getAttribute('data-current-page'), 10 );
    var action = btnClicked.getAttribute("data-action");

    // la dichiari ma non la inizializzi
    var next;
    
    // cambi la condizione: può andare indietro solo se la galleria su cui clicchi è a pagina > 1
    if(action === "p" && sliderCurrentPage > 1 ) {
        next =  sliderCurrentPage - 1 ;
    } else if(action === "n" && sliderCurrentPage < currentSliderPages) { // e può andare avanti solo se la pagina corrente è < delle massime pagine consentite
        next = sliderCurrentPage + 1;        
    }

    // se è entrato nell'if o nell'else vuol dire che deve muovere altrimenti non deve fare niente
    // perche vuol dire che stai cliccando indietro su una galleria che gia è a pagina 1
    // o stai cliccando avanti su una galleria che è gia in ultima pagina
    if( next ) {
        goToSlide(parentElement, next);
    }
} 

// ho modificato la firma del metodo
// ora prende quale slider come primo parametro
// quale pagina come secondo
// cosi è piu generico se ti aumentano gli slider non devi modificare codice
function goToSlide(slider, next) {
    // le pagine partono da 1
    // dato che devi calcolare un offset che parte da 0 
    // devi diminuire di uno il valore di next nella moltiplicazione
    // e mi raccomando le parentesi per dare priorità agli oepratori
    var newOffset = vw * ( next - 1 );
    
    // elimina l'if che è troppo imperativo, se aumentano le gallerie che fai metti altri if?
    // ho passato al metodo lo slider corrente dallo slider recupero gli elementi di classe 'inner-slider' 
    // al suo interno: in realtà è uno solo ma getElementsByClassName restituisce in ogni caso un array pertanto devo accedere all'elemento 0
    // perche li c'è l'unico inner-slider
    slider.getElementsByClassName('inner-slider')[0].style.transform = "translateX(" + ( - newOffset) + "px)";

    // dopo aver mosso lo slider setto data-current-page sullo slider = a next
    slider.setAttribute('data-current-page', next);
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