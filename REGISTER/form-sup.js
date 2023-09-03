document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("signup-form-sup");

    addUserForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch("https://tff-server.vercel.app/users/addAdmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        console.log(result.status);
        alert(result.status);

        
        if (result.status === "Admin Added as a Admin") {
            localStorage.setItem("is-loggedin", true);
            window.location.href = "../SellerPage/index.html";
        }
    });
})