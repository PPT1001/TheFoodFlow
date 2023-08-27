document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartTable = document.querySelector("#cart tbody");
    const totalCell = document.querySelector("#total");
    const clearCartButton = document.querySelector("#clear-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const product = this.parentElement.parentElement.querySelector(".product-name").textContent;
            const maxQuantity = 
            const price = parseFloat(this.parentElement.parentElement.querySelector(".product-price").getAttribute("value"));
            addToCart(product, price);
        });
    });

    clearCartButton.addEventListener("click", function() {
        clearCart();
        updateTotal();
    });

    function addToCart(product, price) {
        const existingRow = cartTable.querySelector(`tr[data-product="${product}"]`);

        if (existingRow) {
            updateQuantityAndSubtotal(existingRow, price);
        } else {
            createNewCartRow(product, price);
        }

        updateTotal();
    }

    function createNewCartRow(product, price) {
        const row = document.createElement("tr");
        row.setAttribute("data-product", product);

        const productCell = document.createElement("td");
        productCell.textContent = product;

        const quantityCell = document.createElement("td");
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = 1; // Initial quantity
        
        quantityInput.addEventListener("input", function() {
            updateSubtotal(row, price, parseInt(this.value));
            updateTotal();
        });
        quantityCell.appendChild(quantityInput);

        const priceCell = document.createElement("td");
        priceCell.textContent = "$" + price.toFixed(2);

        const subtotalCell = document.createElement("td");
        subtotalCell.textContent = "$" + price.toFixed(2);

        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function() {
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

        if (quantity <= 0){
            quantity = 1;
            const quantityIn = row.querySelector("input[type='number']");
            quantityIn.value = 1;
        }
        const subtotalCell = row.querySelector("td:nth-child(4)");
        const newSubtotal = price * quantity;
        subtotalCell.textContent = "$" + newSubtotal.toFixed(2);
    }

    function updateTotal() {
        const allSubtotalCells = cartTable.querySelectorAll("td:nth-child(4)");
        let total = 0;

        allSubtotalCells.forEach(subtotalCell => {
            total += parseFloat(subtotalCell.textContent.replace("$", ""));
        });

        totalCell.textContent = "$" + total.toFixed(2);
    }

    function clearCart() {
        while (cartTable.firstChild) {
            cartTable.removeChild(cartTable.firstChild);
        }
    }
});
