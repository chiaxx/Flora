// Add this code at the end of your existing JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  // Get all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-cart");

  // Add a click event listener to each "Add to Cart" button
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handle_addCartItem);
  });
});

// Function to handle adding items to the cart
function handle_addCartItem() {
  // Get the product container
  const product = this.closest(".products__card");

  // Get product details
  const title = product.querySelector(".products__title").textContent;
  const price = product.querySelector(".products__price").textContent;

  // Call your existing addCartItem function with the title and price
  addCartItem(title, price);
}

// Function to add an item to the cart
function addCartItem(title, price) {
  let newToAdd = {
    title,
    price,
  };

  // Handle if the item is already in the cart
  if (itemsAdded.find((el) => el.title === newToAdd.title)) {
    alert("This item is already in the cart!");
    return;
  } else {
    itemsAdded.push(newToAdd);
  }

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, "");
  let newNode = document.createElement("div");
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  update();
}

// Update the cart icon to reflect the number of items in the cart
function update() {
  addEvents();
  updateTotal();

  const cartIcon = document.querySelector("#cart-icon");
  const cartItemCount = itemsAdded.length;
  cartIcon.setAttribute("data-count", cartItemCount);
}
