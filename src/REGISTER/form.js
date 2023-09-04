document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.getElementById("signup-form");

    addUserForm.addEventListener("submit", async (event) => {
        var is_not_validated = validaterec();

        if (is_not_validated) {
            alert("Form is validated");

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
            localStorage.setItem("is-loggedin-cus", true);
            window.location.href = "../ShopPage/foodie-master/index.html";
        }
    }
        else {
            event.preventDefault();

        }

        function validaterec() {
            var Fname = document.recForm.name.value;
            var OrName = document.recForm.orgName.value;
            var Email = document.recForm.email.value;
            var Mnum = document.recForm.mobileNumber.value;
            var password = document.recForm.passwordHash.value;
            var cpassword = document.recForm.Cpassword.value;
            var filter1 = /[a-zA-Z]/g;
            var filter2 = /[@$,<>#:?_*&;]/g;
            var filter3 = /[0-9]/g;
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


            if (Fname == null || Fname == "") {
                alert("Full Name is required");
                return false;
            }
            else if (!isNaN(Fname)) {
                alert("Enter only character in Full Name");
                return false;
            }
            else if (OrName == null || OrName == "") {
                alert(" Orphanage/ Home name is required");
                return false;
            }
            else if (!isNaN(OrName)) {
                alert("Enter only character in Orphanage/ Home");
                return false;
            }

            if (!Email.match(emailPattern)) {
                alert("Enter a valid email address: " + Email);
                return false;
            }


            else if (isNaN(Mnum) || Mnum == "" || Mnum == null || Mnum.length != 10) {
                alert("Enter a valid Mobile Number");
                return false;
            }
            else if (password == null || password == "") {
                alert("Password is required");
                return false;
            }
            else if (!(password.match(filter1) && password.match(filter2) && password.match(filter1) && password.match(filter3))) {
                alert("Password must contain atleast one uppercase, one lowercase, one number and one special character");
                return false;
            }
            else if (password != cpassword || cpassword == null || cpassword == "") {
                alert("confirm password does not match");
                return false;
            }
            else {
                return true;
            }
        }

    });
})