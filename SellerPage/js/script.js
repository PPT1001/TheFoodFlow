
document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.querySelector("#submit-button");

    
    
    submitButton.addEventListener("click", function() {

    

        const productname = document.querySelector("#product-name").value;
        alert("Product Name Added");
        const restaurantname = document.querySelector("#restaurant-name").value;
        alert("Restaurant Name Added");
        const productprice = document.querySelector("#product-price").value;
        alert("Product Price Added");
        const quantity = document.querySelector("#quantity").value;
        alert("Product Quantity Added");
        const producttype = document.querySelector("#product-type").value;
        alert("Product Type Added");
        const formData = {
            "product-name": productname,
            "restaurant-name": restaurantname,
            "product-price": productprice,
            "quantity": quantity,
            "product-type": producttype,
        };

        alert("Form Data Added");
        createNewProduct(productname, restaurantname, productprice, quantity, producttype);
        alert("Product Added");
    });
    
});