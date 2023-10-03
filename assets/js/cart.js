document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const closeCart = document.querySelector("#cart-close");
    const buyButton = document.querySelector(".btn-buy");
  
    cartIcon.addEventListener("click", () => {
      cart.classList.add("active");
    });
  
    closeCart.addEventListener("click", () => {
      cart.classList.remove("active");
    });
  
    // Cart items data
    let cartItems = [];
  
    // Buy button click event
    buyButton.addEventListener("click", () => {
      if (cartItems.length === 0) {
        alert("There is no item in the cart. Please add items to your cart.");
      } else {
        // Implement your logic for processing the order here
        alert("Your order has been placed successfully!");
        cartItems = [];
        updateCart();
      }
    });
  
    // Function to update the cart content
    function updateCart() {
      const cartContent = document.querySelector(".cart-content");
      const totalElement = document.querySelector(".total-price");
  
      // Clear the cart content
      cartContent.innerHTML = "";
  
      let total = 0;
  
      // Iterate through cart items and display them
      cartItems.forEach((item) => {
        const cartBoxElement = CartBoxComponent(item.title, item.price, item.imgSrc);
        const newNode = document.createElement("div");
        newNode.innerHTML = cartBoxElement;
        cartContent.appendChild(newNode);
  
        total += parseFloat(item.price.substring(1)) * item.quantity;
      });
  
      // Update the total
      totalElement.innerHTML = "$" + total.toFixed(2);
  
      addEvents(); // Re-add event listeners
    }
  
    // Function to add event listeners to cart elements
    function addEvents() {
      // Remove items from cart
      const cartRemoveBtns = document.querySelectorAll(".cart-remove");
      cartRemoveBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const title = btn.parentElement.querySelector(".cart-product-title").innerHTML;
          cartItems = cartItems.filter((item) => item.title !== title);
          updateCart();
        });
      });
  
      // Change item quantity
      const cartQuantityInputs = document.querySelectorAll(".cart-quantity");
      cartQuantityInputs.forEach((input) => {
        input.addEventListener("change", () => {
          const title = input.parentElement.querySelector(".cart-product-title").innerHTML;
          const item = cartItems.find((item) => item.title === title);
          if (item) {
            item.quantity = parseInt(input.value);
            updateCart();
          }
        });
      });
    }
  
    // Function to handle adding items to the cart
    function handleAddCartItem(title, price, imgSrc) {
      const existingItem = cartItems.find((item) => item.title === title);
  
      if (existingItem) {
        alert("This item is already in your cart!");
      } else {
        cartItems.push({
          title,
          price,
          imgSrc,
          quantity: 1,
        });
        updateCart();
      }
    }
  
    // Function to generate cart box HTML
    function CartBoxComponent(title, price, imgSrc) {
      return `
        <div class="cart-box">
            <img src="${imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
        </div>`;
    }
  
    // Add event listeners to add-to-cart buttons
    const addCartBtns = document.querySelectorAll(".add-cart");
    addCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const product = btn.closest(".product");
        const title = product.querySelector(".products__title").textContent;
        const price = product.querySelector(".products__price").textContent;
        const imgSrc = product.querySelector(".products__img").src;
        handleAddCartItem(title, price, imgSrc);
      });
    });
  
    // Initial setup
    addEvents();
  });
  