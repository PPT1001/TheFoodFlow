document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("signup-form");

    addUserForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch("https://tff-server.vercel.app/customers/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result.status);
        alert(result.status);

        if (result.status === "Customer Added as a Customer") {
            // localStorage.setItem("is-loggedin", true);
            window.location.href = "../ShopPage/foodie-master/index.html";
        }
    });
})