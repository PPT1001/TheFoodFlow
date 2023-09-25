document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("login-form");

    addUserForm.addEventListener("submit", async (event) => {
        
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch("https://tff-server.vercel.app/customers/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result);
        showAlert(result.status);


        if (result.status === "Login successful") {
            localStorage.setItem("is-loggedin-cus", true);
            // localStorage.setItem("is-loggedin-sup", false);
            window.location.href = "../ShopPage/foodie-master/index.html";
        }
    });   
})


function showAlert(message) {
    var customAlert = document.getElementById("customAlert");
    var alertText = document.getElementById("alertText");

    alertText.textContent = message;
    customAlert.style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

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

  