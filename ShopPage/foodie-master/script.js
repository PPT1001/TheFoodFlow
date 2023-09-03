
// document.addEventListener("DOMContentLoaded", function () {  
    
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready();
}

// ready function

function ready(){

    fetch("https://tff-server.vercel.app/products/getproducts")
      .then(response => response.json())
      .then(products => {
          const productList = document.getElementById("food-menu-list");

          // Loop through the products and create list items for each
          products.forEach(product => {

        const formData = {
            "product-name": product.productName,
            "restaurant-name": "- "+product.restaurantName,
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

    const menuList = document.getElementById('food-menu-list');

    
    menuList.addEventListener('click', function (event) {
        const target = event.target;

        // Check if the clicked element has the 'add-to-cart' class
        if (target.classList.contains('add-to-cart')) {
            try {
                // Log to the console to check if this event handler is being called
                console.log("Add to Cart clicked");

                const product = target.closest('.food-menu-card').querySelector(".product-name").textContent;
                const price = parseFloat(target.closest('.food-menu-card').querySelector(".product-price").getAttribute("value"));

                // Log the product and price to ensure they are being retrieved correctly
                console.log("Product:", product);
                console.log("Price:", price);

                // Call addToCart function with product and price
                addToCart(product, price);

                addProductToStorage();

            } catch (error) {
                // Log any errors to the console
                console.error("Error:", error);
            }
        }
    });
    
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartTable = document.querySelector("#cart tbody");
    const totalCell = document.querySelector("#total");




    const clearCartButton = document.querySelector("#clear-cart");
    const cartIcon = document.getElementsByClassName("search-btn")[0];
    const cartCloseIcon = document.getElementsByClassName("close-btn")[0];
    const orderBtn = document.getElementsByClassName("add-to-cart");

    for (let index = 0; index < orderBtn.length; index++) {
        orderBtn[index].addEventListener("click", function () {
            document.getElementById("cart").classList.add("active");
        });

    }

    cartIcon.addEventListener("click", function () {
        document.getElementById("cart").classList.add("active");
    });
    cartCloseIcon.addEventListener("click", function () {
        document.getElementById("cart").classList.remove("active");
        document.getElementsByClassName("close-btn")[0].classList.add("activate");

    });



    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert("Hello");
            const product = this.parentElement.parentElement.querySelector(".product-name").textContent;
            const price = parseFloat(this.parentElement.parentElement.querySelector(".product-price").getAttribute("value"));
            addToCart(product, price);
        

            addProductToStorage();
            

        });
    });
    
    function addProductToStorage() {

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        for (let index = 0; index < cart.length; index++) {
            if (cart[index][0] == localStorage.getItem("product")) {
                cart.splice(index, 1);
            }
        }

        var arrayCart = [localStorage.getItem("product"), parseInt(localStorage.getItem("price")), parseInt(localStorage.getItem("quantity")), parseInt(localStorage.getItem("subtotal")), parseInt(localStorage.getItem("total"))];
        cart.push(arrayCart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    clearCartButton.addEventListener("click", function () {
        clearCart();
        updateTotal();
    });

    function addToCart(product, price) {
        var bodyCart = document.getElementById("cart");
        localStorage.setItem("product", product);
        localStorage.setItem("price", price);
        for (let index = 0; index < document.getElementsByTagName("tr").length; index++) {
            let namee = document.getElementsByTagName("tr")[index].getAttribute("value");
            if (namee == product) {
                const quantityInput = document.getElementsByTagName("tr")[index].querySelector("input[type='number']");
                const currentQuantity = parseInt(quantityInput.value);
                const newQuantity = currentQuantity + 1;
                quantityInput.value = newQuantity;
                updateSubtotal(document.getElementsByTagName("tr")[index], price, newQuantity);
                updateTotal();
                return;
            }
        }
        createNewCartRow(product, price);

        updateTotal();
    }

    function createNewCartRow(product, price) {
        const row = document.createElement("tr");
        row.setAttribute("value", product);

        const productCell = document.createElement("td");
        productCell.textContent = product;

        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = 1; // Initial quantity
        localStorage.setItem("quantity", quantityInput.value);

        quantityInput.addEventListener("input", function () {
            updateSubtotal(row, price, parseInt(this.value));
            updateTotal();
        });
        quantityCell.appendChild(quantityInput);

        const priceCell = document.createElement("td");
        priceCell.textContent = "$" + price.toFixed(2);

        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = "$" + price.toFixed(2);
        localStorage.setItem("subtotal", parseInt(subtotalCell.textContent.replace("$", "")));

        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {

            cartTable.removeChild(row);

            updateTotal();
        });
        removeCell.appendChild(removeButton);

        row.appendChild(productCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(subtotalCell);
        row.appendChild(removeCell);
        cartTable.appendChild(row);
    }

    function updateQuantityAndSubtotal(row, price) {
        const quantityInput = row.querySelector("input[type='number']");
        const currentQuantity = parseInt(quantityInput.value);
        const newQuantity = currentQuantity + 1;
        quantityInput.value = newQuantity;



        updateSubtotal(row, price, newQuantity);
        updateTotal();
    }

    function updateSubtotal(row, price, quantity) {

        const maxQuantity = parseFloat(document.getElementById("max-quantity").innerHTML);
        if (quantity <= 0) {
            quantity = 1;
            const quantityIn = row.querySelector("input[type='number']");
            quantityIn.value = 1;
        }
        if (quantity > maxQuantity) {
            quantity = maxQuantity;
            const quantityIn = row.querySelector("input[type='number']");
            quantityIn.value = maxQuantity;
        }
        const subtotalCell = row.querySelector("td:nth-child(4)");
        const newSubtotal = price * quantity;
        localStorage.setItem("subtotal", newSubtotal);
        localStorage.setItem("quantity", quantity);

        subtotalCell.textContent = "$" + newSubtotal.toFixed(2);

    }

    function updateTotal() {
        const allSubtotalCells = cartTable.querySelectorAll("td:nth-child(4)");
        let total = 0;

        allSubtotalCells.forEach(subtotalCell => {
            total += parseFloat(subtotalCell.textContent.replace("$", ""));
        });

        localStorage.setItem("total", total);
        totalCell.textContent = "$" + total.toFixed(2);
        var totally = totalCell.innerHTML.replace("$", "");
        if (totally == 0) {
            var storage = [];
            storage = JSON.stringify(storage);
            localStorage.setItem("cart", storage);
        }



    }

    function clearCart() {
        while (cartTable.firstChild) {
            cartTable.removeChild(cartTable.firstChild);
        }
        var storage = [];
        storage = JSON.stringify(storage);
        localStorage.setItem("cart", storage);
    }
};



if (localStorage.getItem("is-loggedin")) {
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



