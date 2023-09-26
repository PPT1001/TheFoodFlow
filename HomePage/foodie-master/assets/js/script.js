'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
    
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});







/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});




if (localStorage.getItem("is-loggedin-sup")) {
  document.getElementById("login-btn").remove();
  document.getElementById("signup-btn").remove();
  // document.createElement("a").innerHTML = "Logout"; 
  const userIcon = document.createElement("ion-icon");
  userIcon.name="person-circle-outline";
  userIcon.style.color ='hsl(120, 100%, 25%)';
  userIcon.style.fontSize ='80px';
  document.getElementById("User-icon").appendChild(userIcon);
  userIcon.classList.add("user-icon");
  document.getElementById("User-icon").addEventListener("click", function() {
    window.location.href = "../../SellerPage/index.html";
  });
}

if (localStorage.getItem("is-loggedin-cus")) {
  document.getElementById("login-btn").remove();
  document.getElementById("signup-btn").remove();
  // document.createElement("a").innerHTML = "Logout"; 
  const userIcon = document.createElement("ion-icon");
  userIcon.name = "person-circle-outline";
  userIcon.style.color = 'hsl(120, 100%, 25%)';
  userIcon.style.fontSize = '40px';
  document.getElementById("User-icon").appendChild(userIcon);
  userIcon.classList.add("user-icon");

  const listItem = document.createElement('li');
  listItem.classList.add('nav-item');
  const link = document.createElement('a');
  // link.setAttribute("data-nav-link");
  link.classList.add('navbar-link');
  link.textContent = 'Logout';
  listItem.appendChild(link);

  document.getElementById('navbar-list').appendChild(listItem);
  link.addEventListener("click", function () {
    localStorage.removeItem("is-loggedin-cus");
    window.location.href = "index.html";
    console.log("User Logged Out");
  });
  document.getElementById("User-icon").addEventListener("click", function () {
      window.location.href = "../../ShopPage/foodie-master/index.html";
  })
}
