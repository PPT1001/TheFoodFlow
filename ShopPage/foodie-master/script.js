
// document.addEventListener("DOMContentLoaded", function () {  

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready();
}

// ready function

function ready() {

    fetch("https://tff-server.vercel.app/products/getproducts")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("food-menu-list");

            // Loop through the products and create list items for each
            products.forEach(product => {

                const formData = {
                    "product-name": product.productName,
                    "restaurant-name": "- " + product.restaurantName,
                    "product-price": "$" + product.productPrice,
                    "quantity": product.quantity,
                    "product-type": product.productCategory,
                };

                const productname = formData["product-name"];
                const restaurantname = formData["restaurant-name"];
                const productprice = formData["product-price"];
                const quantity = formData["quantity"];
                const producttype = formData["product-type"];

                createNewProduct(productname, restaurantname, productprice, quantity, producttype);


                function createNewProduct(productname, restaurantname, productprice, quantity, producttype) {


                    const listItem = document.createElement('li');


                    const foodMenuCard = document.createElement('div');
                    foodMenuCard.classList.add('food-menu-card');


                    const cardBanner = document.createElement('div');
                    cardBanner.classList.add('card-banner');


                    const image = document.createElement('img');
                    image.src = './assets/images/food-menu-6.png';
                    image.width = 300;
                    image.height = 300;
                    image.loading = 'lazy';
                    image.alt = "Wendy's Chicken";
                    image.classList.add('w-100');


                    const badge = document.createElement('div');
                    badge.classList.add('badge');
                    badge.id = 'max-quantity';
                    badge.textContent = quantity;


                    const orderButton = document.createElement('button');
                    orderButton.classList.add('btn', 'food-menu-btn', 'add-to-cart');
                    orderButton.textContent = 'Order Now';


                    cardBanner.appendChild(image);
                    cardBanner.appendChild(badge);
                    cardBanner.appendChild(orderButton);


                    const wrapper = document.createElement('div');
                    wrapper.classList.add('wrapper');


                    const category = document.createElement('p');
                    category.classList.add('category');
                    category.textContent = producttype;


                    const ratingWrapper = document.createElement('div');
                    ratingWrapper.classList.add('rating-wrapper');


                    for (let i = 0; i < 5; i++) {
                        const starIcon = document.createElement('ion-icon');
                        starIcon.name = 'star';
                        ratingWrapper.appendChild(starIcon);
                    }


                    const cardTitleProductName = document.createElement('h3');
                    cardTitleProductName.classList.add('h3', 'card-title', 'product-name');
                    cardTitleProductName.textContent = productname;

                    const cardTitleRestaurantName = document.createElement('h4');
                    cardTitleRestaurantName.classList.add('restaurant', 'name', 'card-title');
                    cardTitleRestaurantName.textContent = restaurantname;


                    const priceWrapper = document.createElement('div');
                    priceWrapper.classList.add('price-wrapper');


                    const priceText = document.createElement('p');
                    priceText.classList.add('price-text');
                    priceText.textContent = 'Price:';


                    const productPrice = document.createElement('data');
                    productPrice.classList.add('price', 'product-price');
                    productPrice.value = '49.00';
                    productPrice.textContent = productprice;


                    const delElement = document.createElement('del');
                    delElement.classList.add('del');
                    delElement.textContent = '$59.00';


                    wrapper.appendChild(category);
                    wrapper.appendChild(ratingWrapper);

                    priceWrapper.appendChild(priceText);
                    priceWrapper.appendChild(productPrice);
                    priceWrapper.appendChild(delElement);

                    foodMenuCard.appendChild(cardBanner);
                    foodMenuCard.appendChild(wrapper);
                    foodMenuCard.appendChild(cardTitleProductName);
                    foodMenuCard.appendChild(cardTitleRestaurantName);
                    foodMenuCard.appendChild(priceWrapper);

                    listItem.appendChild(foodMenuCard);


                    const menuList = document.getElementById('food-menu-list');
                    menuList.appendChild(listItem)

                }

            });
        });
    // Define global variables
    const menuList = document.getElementById('food-menu-list');
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartTable = document.querySelector("#cart tbody");
    const totalCell = document.querySelector("#total");
    const clearCartButton = document.querySelector("#clear-cart");
    const cartIcon = document.getElementsByClassName("search-btn")[0];
    const cartCloseIcon = document.getElementsByClassName("close-btn")[0];
    const orderBtn = document.getElementsByClassName("add-to-cart");

    // Event listeners
    menuList.addEventListener('click', handleMenuClick);

    for (let index = 0; index < orderBtn.length; index++) {
        orderBtn[index].addEventListener("click", openCart);
    }

    cartIcon.addEventListener("click", openCart);
    cartCloseIcon.addEventListener("click", closeCart);
    clearCartButton.addEventListener("click", clearCart);

    // Functions
    function handleMenuClick(event) {
        const target = event.target;

        if (target.classList.contains('add-to-cart')) {
            try {
                const product = target.closest('.food-menu-card').querySelector(".product-name").textContent;
                const price = parseFloat(target.closest('.food-menu-card').querySelector(".product-price").getAttribute("value"));

                document.getElementById("cart").classList.add("active");

                addProductToStorage(product, price);
                updateCart();

            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    function openCart() {
        document.getElementById("cart").classList.add("active");
        updateCart();
    }

    function closeCart() {
        document.getElementById("cart").classList.remove("active");
        document.getElementsByClassName("close-btn")[0].classList.add("activate");
    }

    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartTable.innerHTML = ""; // Clear the cart table

        for (let index = 0; index < cart.length; index++) {
            const [product, price, quantity, subtotal, total] = cart[index];
            createNewCartRow(product, price, quantity, subtotal, total);
        }

        updateTotal();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const product = this.parentElement.parentElement.querySelector(".product-name").textContent;
            const price = parseFloat(this.parentElement.parentElement.querySelector(".product-price").getAttribute("value"));

            localStorage.setItem("product", product);
            localStorage.setItem("price", price);
            localStorage.setItem("quantity", 1);

            addProductToStorage(product, price);
            updateCart();
        });
    });

    function addProductToStorage(product, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Remove existing item from the cart with the same product
        cart = cart.filter(item => item[0] !== product);

        const arrayCart = [product, price, 1, price, price];
        cart.push(arrayCart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function clearCart() {
        cartTable.innerHTML = ""; // Clear the cart table
        localStorage.setItem("cart", "[]"); // Clear the cart data in local storage
    }

    function createNewCartRow(product, price, quantity, subtotal, total) {
        const row = document.createElement("tr");
        row.setAttribute("value", product);

        const productCell = document.createElement("td");
        productCell.textContent = product;

        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = quantity;

        quantityInput.addEventListener("input", function () {
            updateSubtotal(row, price, parseInt(this.value));
            updateTotal();
        });
        quantityCell.appendChild(quantityInput);

        const priceCell = document.createElement("td");
        priceCell.textContent = "$" + price.toFixed(2);

        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = "$" + subtotal.toFixed(2);

        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            removeProductFromCart(product);
        });
        removeCell.appendChild(removeButton);

        row.appendChild(productCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(subtotalCell);
        row.appendChild(removeCell);
        cartTable.appendChild(row);
    }

    function removeProductFromCart(product) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item[0] !== product);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCart();
    }

    function updateSubtotal(row, price, quantity) {
        const newSubtotal = price * quantity;
        const subtotalCell = row.querySelector("td:nth-child(4)");
        subtotalCell.textContent = "$" + newSubtotal.toFixed(2);

        // Update the cart data in local storage
        const product = row.getAttribute("value");
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.map(item => {
            if (item[0] === product) {
                return [product, price, quantity, newSubtotal, item[4]];
            } else {
                return item;
            }
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    function updateTotal() {
        const allSubtotalCells = cartTable.querySelectorAll("td:nth-child(4)");
        let total = 0;

        allSubtotalCells.forEach(subtotalCell => {
            total += parseFloat(subtotalCell.textContent.replace("$", ""));
        });

        localStorage.setItem("total", total);
        totalCell.textContent = "$" + total.toFixed(2);

        if (total === 0) {
            localStorage.removeItem("cart"); // Remove cart data from local storage if it's empty
        }
    }



    if (localStorage.getItem("is-loggedin-sup")) {
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
            window.location.href = "index.html";
        })
    }



}