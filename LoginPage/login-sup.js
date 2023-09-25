document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("login-form-sup");

    addUserForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch("https://tff-server.vercel.app/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result);
        alert(result.status);


        if (result.status === "Login successful") {
            localStorage.setItem("is-loggedin-sup", true);
            localStorage.setItem("restaurantName", result.orgName);
            // localStorage.setItem("is-loggedin-cus", false);
            window.location.href = "../SellerPage/index.html";
        }
    });
})



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
