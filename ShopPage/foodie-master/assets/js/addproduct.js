
document.addEventListener("DOMContentLoaded", function() {

const formData = {
    "product-name": "Pra",
    "restaurant-name": "- Pragash Restaurant",
    "product-price": "$"+100,
    "quantity": 10,
    "product-type": "Noodles",
};

const productname = formData["product-name"];
const restaurantname = formData["restaurant-name"];
const productprice = formData["product-price"];
const quantity = formData["quantity"];
const producttype = formData["product-type"];

createNewProduct(productname, restaurantname, productprice, quantity, producttype);


  function createNewProduct(productname, restaurantname, productprice, quantity, producttype){
        
        
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
