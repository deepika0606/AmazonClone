document.addEventListener("DOMContentLoaded", function () {
    // Sample cart items stored in localStorage (for demo purposes)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                let itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price;
            });
        }

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
        addRemoveItemEvent();
    }

    function addRemoveItemEvent() {
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    updateCartDisplay();

    // Form Validation
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        let isValid = true;
        document.querySelectorAll("input, select").forEach(input => {
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
                isValid = false;
            } else {
                input.style.border = "1px solid #ccc";
            }
        });

        if (!isValid) {
            event.preventDefault();
            alert("Please fill in all fields.");
        } else {
            alert("Order placed successfully!");
            localStorage.removeItem("cart"); // Clear cart after order
        }
    });
});
