const menuContainer = document.querySelector("#menu-container");
const cartContainer = document.querySelector("#shopping-cart");
console.log(cartContainer);

// showing the menu or food cards  =====>
function displayMenu(items) {
  menuContainer.innerHTML = items
    .map((item) => {
      return `<div class="food-card">
        <img src="${item.image}" alt="${item.name}">

    <div class="food-info">
<div class="name-veg-container">
<h3>${item.name}</h3> 
      <div class="rating-isVeg">
      <h4 class="rating">${item.rating}⭐</h4>
      <h4 class="isVeg">${item.isVeg ? "🟢" : "🔴"}</h4>
      </div></div>
      <p>${item.description}</p>

      <p class="price">$${item.price}</p>

      <button class="add-to-cart-btn" data-id="${item.id}">
        Add to Cart
      </button>
    </div>
        </div>`;
    })
    .join("");
}

// showing the cart =====>
function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<div><h2>Shopping Cart</h2><p>Your cart is empty.</p></div>";
    return;
  } 

const cartHTML = cart.map((item) => {
    return `
<div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        
        <div class="cart-item-details">
          <h5>${item.name}</h5>
          <p>Qty: ${item.quantity}</p>
          <p>$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    `;
  }).join(" ");

  const totalAmount = cart.reduce((accumulator, item) => {
    return accumulator + (item.price * item.quantity);
  }, 0);

  console.log(totalAmount);

  cartContainer.innerHTML = `
    <h2>Shopping Cart</h2>
    ${cartHTML}
    <div class="cart-total-container">
      <h3>Total:</h3>
      <h3 id="cart-total-amount">$${totalAmount.toFixed(2)}</h3>
    </div>
  `;
}

displayMenu(menuItems);

// create cart array=====>
const cart = [];

menuContainer.addEventListener("click", (event) => {

  const id = Number(event.target.dataset.id);

  if (!id) return;

  const selectedItem = menuItems.find((item) => item.id === id);

  const existingItem = cart.find((item) => item.id === selectedItem.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const newItem = { ...selectedItem, quantity: 1 };
    cart.push(newItem);
  }
  console.log(cart);
  displayCart();
});



