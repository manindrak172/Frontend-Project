/* =========================================
   MOVIEBOOK HOME PAGE JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const locationBtn = document.getElementById("locationBtn");
const locationModal = document.getElementById("locationModal");
const closeLocation = document.getElementById("closeLocation");

const offerBtn = document.getElementById("offerBtn");
const offerModal = document.getElementById("offerModal");
const closeOffer = document.getElementById("closeOffer");

const movieSearch = document.getElementById("movieSearch");
const searchBtn = document.getElementById("searchBtn");

const movieCards = document.querySelectorAll(".movie-card");
const noResults = document.getElementById("noResults");

const copyCodeBtn = document.getElementById("copyCodeBtn");

const newsletterForm = document.getElementById("newsletterForm");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const locationText = document.getElementById("locationText");


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener("click", function () {

    if (mobileMenu.style.display === "block") {

        mobileMenu.style.display = "none";

    } else {

        mobileMenu.style.display = "block";

    }

});


/* Close mobile menu after clicking a link */

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.style.display = "none";

    });

});


/* =========================================
   LOCATION MODAL
========================================= */

locationBtn.addEventListener("click", function () {

    locationModal.classList.add("active");

});


closeLocation.addEventListener("click", function () {

    locationModal.classList.remove("active");

});


/* Select city */

const cityButtons = document.querySelectorAll(".city-list button");

cityButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const city = button.getAttribute("data-city");

        locationText.textContent = city;

        localStorage.setItem("selectedCity", city);

        locationModal.classList.remove("active");

        showToast("City changed to " + city);

    });

});


/* Load previously selected city */

const savedCity = localStorage.getItem("selectedCity");

if (savedCity) {

    locationText.textContent = savedCity;

}


/* =========================================
   OFFER MODAL
========================================= */

offerBtn.addEventListener("click", function () {

    offerModal.classList.add("active");

});


closeOffer.addEventListener("click", function () {

    offerModal.classList.remove("active");

});


/* =========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener("click", function (event) {

    if (event.target === locationModal) {

        locationModal.classList.remove("active");

    }

    if (event.target === offerModal) {

        offerModal.classList.remove("active");

    }

});


/* =========================================
   MOVIE SEARCH
========================================= */

function searchMovies() {

    const searchValue = movieSearch.value
        .trim()
        .toLowerCase();

    let foundMovies = 0;


    movieCards.forEach(function (card) {

        const title = card
            .getAttribute("data-title")
            .toLowerCase();


        if (title.includes(searchValue)) {

            card.style.display = "block";

            foundMovies++;

        } else {

            card.style.display = "none";

        }

    });


    if (foundMovies === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* Search button */

searchBtn.addEventListener("click", function () {

    searchMovies();

});


/* Search while typing */

movieSearch.addEventListener("input", function () {

    searchMovies();

});


/* Press Enter */

movieSearch.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchMovies();

    }

});


/* =========================================
   COPY MOVIE50 COUPON
========================================= */

copyCodeBtn.addEventListener("click", function () {

    copyCoupon("MOVIE50");

});


function copyCoupon(code) {

    navigator.clipboard.writeText(code)
        .then(function () {

            showToast(
                "Coupon " + code + " copied!"
            );

        })
        .catch(function () {

            showToast(
                "Coupon: " + code
            );

        });

}


/* =========================================
   NEWSLETTER
========================================= */

newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const emailInput =
        document.getElementById("emailInput");

    const email = emailInput.value.trim();


    if (email === "") {

        showToast("Please enter your email.");

        return;

    }


    showToast(
        "Successfully subscribed!"
    );

    emailInput.value = "";

});


/* =========================================
   TOAST MESSAGE
========================================= */

let toastTimer;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        locationModal.classList.remove("active");

        offerModal.classList.remove("active");

    }

});


/* =========================================
   INITIAL MESSAGE
========================================= */

console.log(
    "MovieBook Home Page Loaded Successfully!"
);