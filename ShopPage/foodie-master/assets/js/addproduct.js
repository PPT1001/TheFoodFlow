console.log(formDataArray);



const menuData = {
    imageSrc: `./assets/images/${formData['image']}`,
    productName: formData['product-name'],
    restaurantName: formData['restaurant-name'],
    price: formData['product-price'],
    rating: 5, // You can set the rating as needed
    maxQuantity: parseInt(formData['quantity']), // Parse quantity as an integer
    category: formData['product-type'],
    // You can add more data fields as needed
  };

function fillMenuData() {
    const card = document.querySelector(".food-menu-card");
    card.querySelector("img").src = menuData.imageSrc;
    card.querySelector(".product-name").textContent = menuData.productName;
    card.querySelector(".restaurant-name").textContent = menuData.restaurantName;
    card.querySelector(".price.product-price").setAttribute("value", menuData.price);
    card.querySelector(".rating-wrapper").innerHTML = `<ion-icon name="star"></ion-icon>`.repeat(menuData.rating);
    card.querySelector("#max-quantity").textContent = `Max Quantity: ${menuData.maxQuantity}`;
    card.querySelector(".category").textContent = `Category: ${menuData.category}`;
  }