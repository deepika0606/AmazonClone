document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            let name = this.getAttribute("data-name");
            let price = parseFloat(this.getAttribute("data-price"));

            let existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(name + " added to cart!");
        });
    });

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-count").innerText = totalItems;
    }
});
