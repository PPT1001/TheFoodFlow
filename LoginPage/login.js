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
        alert(result.status);


        if (result.status === "Login successful") {
            localStorage.setItem("is-loggedin-cus", true);
            localStorage.setItem("is-loggedin-sup", false);
            window.location.href = "../ShopPage/foodie-master/index.html";
        }
    });   
})



// LOGIN PAGE

/*=============== SHOW HIDDEN - PASSWORD ===============*/
// const showHiddenPass = (loginPass, loginEye) =>{
//     const input = document.getElementById(loginPass),
//           iconEye = document.getElementById(loginEye)
  
//     iconEye.addEventListener('click', () =>{
//        // Change password to text
//        if(input.type === 'password'){
//           // Switch to text
//           input.type = 'text'
  
//           // Icon change
//           iconEye.classList.add('ri-eye-line')
//           iconEye.classList.remove('ri-eye-off-line')
//        } else{
//           // Change to password
//           input.type = 'password'
  
//           // Icon change
//           iconEye.classList.remove('ri-eye-line')
//           iconEye.classList.add('ri-eye-off-line')
//        }
//     })
//   }
  
//   showHiddenPass('login-pass','login-eye')
  