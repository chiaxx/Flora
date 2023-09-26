// Initialize the cart count to 0
let cartCount = 0;

// Function to update the cart count in the header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
}

// Add event listeners to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Increment the cart count when a product is added
        cartCount++;
        updateCartCount();
    });
});

// You can also implement logic to decrease the cart count when items are removed.
// For a more advanced cart functionality, consider using an array to store cart items.
