document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("signup-form-sup");

    addUserForm.addEventListener("submit", async (event) => {
        var is_not_validated = validaterec();

        if (is_not_validated) {

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
            showAlert(result.status);


            if (result.status === "Admin Added as a Admin") {
                localStorage.setItem("is-loggedin-sup", true);
                localStorage.setItem("restaurantName", document.recForm.orgName.value);
                window.location.href = "../SellerPage/index.html";
            }

        }
        else {
            event.preventDefault();

        }
        function showAlert(message) {
            var customAlert = document.getElementById("customAlert");
            var alertText = document.getElementById("alertText");

            alertText.textContent = message;
            customAlert.style.display = "block";
            document.getElementById("overlay").style.display = "block";

        }


        function validaterec() {
            var Fname = document.recForm.name.value;
            var OrName = document.recForm.orgName.value;
            var Email = document.recForm.email.value;
            var Mnum = document.recForm.mobileNumber.value;
            var password = document.recForm.passwordHash.value;
            var cpassword = document.recForm.Cpassword.value;
            var filter1 = /[a-zA-Z]/g;
            var filter2 = /[@$,<>#:?_*&;!~%^]/g;
            var filter3 = /[0-9]/g;
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


            if (Fname == null || Fname == "") {
                showAlert("Full Name is required");
                return false;
            }
            else if (!isNaN(Fname)) {
                showAlert("Enter only character in Full Name");
                return false;
            }
            else if (OrName == null || OrName == "") {
                showAlert(" Orphanage/ Home name is required");
                return false;
            }
            else if (!isNaN(OrName)) {
                showAlert("Enter only character in Orphanage/ Home");
                return false;
            }

            if (!Email.match(emailPattern)) {
                showAlert("Enter a valid email address: " + Email);
                return false;
            }


            else if (isNaN(Mnum) || Mnum == "" || Mnum == null || Mnum.length != 10) {
                showAlert("Enter a valid Mobile Number");
                return false;
            }
            else if (password == null || password == "") {
                showAlert("Password is required");
                return false;
            }
            else if (!(password.match(filter1) && password.match(filter2) && password.match(filter1) && password.match(filter3))) {
                showAlert("Password must contain atleast one uppercase, one lowercase, one number and one special character");
                return false;
            }
            else if (password != cpassword || cpassword == null || cpassword == "") {
                showAlert("confirm password does not match");
                return false;
            }
            else {
                return true;
            }
        }

    });
})