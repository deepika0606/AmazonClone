document.addEventListener("DOMContentLoaded", function () {
    updateCartTotal();

    // Handle quantity change
    document.querySelectorAll(".quantity").forEach(select => {
        select.addEventListener("change", updateCartTotal);
    });

    // Handle delete button
    document.querySelectorAll(".delete-item").forEach(button => {
        button.addEventListener("click", function () {
            this.closest(".cart-item").remove();
            updateCartTotal();
        });
    });

    // Handle save for later
    document.querySelectorAll(".save-for-later").forEach(button => {
        button.addEventListener("click", function () {
            let item = this.closest(".cart-item");
            document.querySelector(".saved-items").appendChild(item);
            item.querySelector(".save-for-later").remove();
            updateCartTotal();
        });
    });

    // Handle adding items from shop.html (if localStorage is used)
    loadCartFromStorage();
});

// Function to update subtotal
function updateCartTotal() {
    let totalItems = 0;
    let totalPrice = 0;

    document.querySelectorAll(".cart-item").forEach(item => {
        let price = parseFloat(item.getAttribute("data-price"));
        let quantity = parseInt(item.querySelector(".quantity").value);
        
        totalItems += quantity;
        totalPrice += price * quantity;
    });

    document.getElementById("total-items").innerText = totalItems;
    document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
    document.getElementById("total-items-bottom").innerText = totalItems;
    document.getElementById("total-price-bottom").innerText = `$${totalPrice.toFixed(2)}`;

    saveCartToStorage();
}

// Save cart state in localStorage
function saveCartToStorage() {
    let cartData = [];
    
    document.querySelectorAll(".cart-item").forEach(item => {
        let product = {
            name: item.querySelector("h2").innerText,
            price: item.getAttribute("data-price"),
            quantity: item.querySelector(".quantity").value
        };
        cartData.push(product);
    });

    localStorage.setItem("cart", JSON.stringify(cartData));
}

// Load cart from localStorage
function loadCartFromStorage() {
    let cartData = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartData.length > 0) {
        let cartItemsContainer = document.querySelector(".cart-items");
        cartItemsContainer.innerHTML = ""; // Clear existing items

        cartData.forEach(product => {
            let newItem = document.createElement("div");
            newItem.classList.add("cart-item");
            newItem.setAttribute("data-price", product.price);
            newItem.innerHTML = `
                <img src="placeholder.jpg" alt="Product">
                <div class="item-details">
                    <h2>${product.name}</h2>
                    <p class="price">$${product.price}</p>
                    <label>Qty: 
                        <select class="quantity">
                            <option value="1" ${product.quantity == 1 ? "selected" : ""}>1</option>
                            <option value="2" ${product.quantity == 2 ? "selected" : ""}>2</option>
                            <option value="3" ${product.quantity == 3 ? "selected" : ""}>3</option>
                        </select>
                    </label>
                    <div class="item-actions">
                        <button class="delete-item">Delete</button>
                        <button class="save-for-later">Save for later</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(newItem);
        });

        updateCartTotal();
    }
}
