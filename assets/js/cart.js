// <!-- Add this code at the end of your HTML file, just before the closing </body> tag -->

  // Select relevant elements
  const addToCartButtons = document.querySelectorAll('.featured__button');
  const cartIcon = document.getElementById('cart-shop');
  const cartContainer = document.getElementById('cart');
  const cartCloseButton = document.getElementById('cart-close');
  const cartTotalItems = document.getElementById('cart-total-items');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartContent = document.querySelector('.cart__content');
  const cartItems = [];

  // Function to update the cart UI
  function updateCartUI() {
    // Clear the existing cart items
    cartContent.innerHTML = '';

    // Calculate total items and price
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;

      // Create a new cart item element
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart__card');
      cartItemElement.innerHTML = `
        <div class="cart__box">
          <img src="${item.image}" alt="" class="cart__img">
        </div>
        <div class="cart__details">
          <h3 class="cart__title">${item.name}</h3>
          <span class="cart__price">$${item.price.toFixed(2)}</span>
          <div class="cart__amount">
            <div class="cart__amount-content">
              <span class="cart__amount-box decrease-quantity" data-index="${item.index}">
                <i class='bx bx-minus'></i>
              </span>
              <span class="cart__amount-number">${item.quantity}</span>
              <span class="cart__amount-box increase-quantity" data-index="${item.index}">
                <i class='bx bx-plus'></i>
              </span>
            </div>
            <i class='bx bx-trash-alt cart__amount-trash' data-index="${item.index}"></i>
          </div>
        </div>
      `;

      // Add click event listeners for quantity buttons and delete button
      cartItemElement.querySelector('.decrease-quantity').addEventListener('click', () => decreaseQuantity(item.index));
      cartItemElement.querySelector('.increase-quantity').addEventListener('click', () => increaseQuantity(item.index));
      cartItemElement.querySelector('.cart__amount-trash').addEventListener('click', () => removeFromCart(item.index));

      cartContent.appendChild(cartItemElement);
    });

    // Update the total items and total price in the cart UI
    cartTotalItems.textContent = totalItems;
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Function to add an item to the cart
  function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    updateCartUI();
  }

  // Function to remove an item from the cart
  function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartUI();
  }

  // Function to increase the quantity of an item in the cart
  function increaseQuantity(index) {
    cartItems[index].quantity++;
    updateCartUI();
  }

  // Function to decrease the quantity of an item in the cart
  function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    } else {
      removeFromCart(index);
    }

    updateCartUI();
  }

  // Add click event listeners to "Add to Cart" buttons
  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const product = {
        id: index,
        name: button.parentElement.querySelector('.featured__title').textContent,
        price: parseFloat(button.parentElement.querySelector('.featured__price').textContent.replace('$', '')),
        image: button.parentElement.querySelector('.featured__img').src
      };
      addToCart(product);
    });
  });

  // Toggle cart visibility when the cart icon is clicked
  cartIcon.addEventListener('click', () => {
    cartContainer.classList.toggle('cart--open');
  });

  // Close the cart when the close button is clicked
  cartCloseButton.addEventListener('click', () => {
    cartContainer.classList.remove('cart--open');
  });
