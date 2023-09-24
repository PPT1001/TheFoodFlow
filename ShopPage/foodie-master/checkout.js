if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
}
else {
    ready();
}

// ready function

function ready() {
    document.getElementById("total").innerHTML = "Rs. " + localStorage.getItem('total') || 0;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        creatRow(item);
    }
    document.getElementById("cart-tot").innerHTML = cart.length;


    function creatRow(item) {
        // Create a new list item element
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed");

        // Create the left div element
        const leftDiv = document.createElement("div");

        // Create the product name element
        const productName = document.createElement("h6");
        productName.classList.add("my-0");
        productName.textContent = item[0] + " (Rs. " + item[1] + ")";

        // Create the description element
        const description = document.createElement("small");
        description.classList.add("text-muted");
        description.textContent = "Quantity: " + item[2];

        // Append the product name and description elements to the left div
        leftDiv.appendChild(productName);
        leftDiv.appendChild(description);

        // Create the right span element for the price
        const priceSpan = document.createElement("span");
        priceSpan.classList.add("text-muted");
        priceSpan.textContent = "Rs. " + item[3];

        // Append the left div and right span to the list item
        listItem.appendChild(leftDiv);
        listItem.appendChild(priceSpan);

        // Append the list item to your desired container element (e.g., ul or div)
        const container = document.getElementsByClassName("cart-items")[0];
        container.appendChild(listItem);


        const ProceedBtn = document.getElementById("Proceed");

        ProceedBtn.addEventListener("click", async (event) => {
            event.preventDefault();

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const response = await fetch("https://tff-server.vercel.app/products/placeorder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart),
            });


            // const result = await response.json();
            // console.log(result);
            // alert(result.status);


        });

    }
}