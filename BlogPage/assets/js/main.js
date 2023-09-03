/*** header sticky & back to top*/

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
    window.location.href = "../../../../SellerPage/index.html";
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
  document.getElementById("User-icon").addEventListener("click", function () {
      window.location.href = "../ShopPage/foodie-master/index.html";
  })
}

