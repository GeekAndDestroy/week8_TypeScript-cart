import { User, Shop } from './classes';

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            const user = User.loginUser(event);
            if (user) {
                const shop = new Shop();
                const shopDiv = document.getElementById("shop");
                const cartDiv = document.getElementById("cart");
                const loginDiv = document.getElementById("login");

                if (loginDiv) {
                    loginDiv.style.display = "none";
                }
                
                if (shopDiv && cartDiv) {
                    shop.items.forEach(item => shopDiv.appendChild(item.itemElement()));

                    // Display cart contents
                    cartDiv.appendChild(user.cartHTMLElement());
                }

                // Attach event listener to all "Add to Cart" buttons
                const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
                addToCartButtons.forEach(button => {
                    button.addEventListener("click", () => {
                        const itemId = (button as HTMLElement).dataset.itemId;
                        if (itemId) {
                            user.addToCart(itemId);
                        }
                    });
                });
            }
        });
    }
});
