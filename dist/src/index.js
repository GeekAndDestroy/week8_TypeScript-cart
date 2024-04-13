"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
// Create some items for the shop
const items = [
    new classes_1.Item("Collar", 15.99, "Make your pooch the most fashionable doggo in the neighborhood!"),
    new classes_1.Item("Bed", 29.99, "Treat your fur baby to the lap of luxury."),
    new classes_1.Item("Toy", 8.49, "Keep your canine entertained for hours with this squeaky toy."),
];
// Create a shop and add the items to it
const shop = new classes_1.Shop();
items.forEach(item => shop.addItem(item));
// Create a user
const user = new classes_1.User("John", 30);
// Display the available items in the shop
console.log("Available Items:");
shop.getItems().forEach(item => console.log(item.name));
// Add an item to the user's cart
user.addToCart(items[0]);
user.addToCart(items[1]);
user.addToCart(items[1]); // Add the same item twice
user.addToCart(items[2]);
// Display the items in the user's cart
console.log("\nUser's Cart:");
user.printCart();
// Remove an item from the user's cart
user.removeFromCart(items[1]);
// Display the updated cart
console.log("\nUser's Updated Cart:");
user.printCart();
// Display the total price of items in the cart
console.log("\nTotal Price:", user.cartTotal());
// import { User, Shop } from './classes';
// document.addEventListener('DOMContentLoaded', () => {
//     const shop = new Shop(); // Create a new shop
//     let user: User | null = null; // Define user variable
//     // Function to display items in the shop
//     function displayShopItems() {
//         const shopDiv = document.getElementById('shop');
//         if (shopDiv) {
//             shopDiv.innerHTML = ''; // Clear previous content
//             shop.items.forEach(item => {
//                 const itemElement = item.itemElement(); // Create HTML element for each item
//                 if (shopDiv) {
//                     shopDiv.appendChild(itemElement); // Append item to shop div
//                 }
//             });
//         }
//     }
//     // Function to handle user login
//     function handleLogin(event: Event) {
//         event.preventDefault(); // Prevent form submission
//         // Get user input values
//         const nameInput = document.getElementById('name') as HTMLInputElement;
//         const ageInput = document.getElementById('age') as HTMLInputElement;
//         const name = nameInput.value;
//         const age = parseInt(ageInput.value);
//         // Create a new user
//         user = new User(name, age);
//         // Display shop items after login
//         displayShopItems();
//         // Add event listeners for add to cart buttons
//         addAddToCartListeners();
//     }
//     // Function to add event listeners for add to cart buttons
//     function addAddToCartListeners() {
//         const addToCartButtons = document.querySelectorAll('.add-to-cart');
//         addToCartButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const itemId = (button as HTMLButtonElement).dataset.itemId;
//                 const item = shop.items.find(item => item.id === itemId);
//                 if (item && user) {
//                     user.addToCart(item);
//                     updateCart();
//                 }
//             });
//         });
//     }
//     // Function to update the cart display
//     function updateCart() {
//         const cartDiv = document.getElementById('cartdiv');
//         if (cartDiv) {
//             cartDiv.innerHTML = ''; // Clear previous content
//             if (user && user.cart.length === 0) {
//                 cartDiv.textContent = 'Cart is empty.';
//             } else if (user) {
//                 user.cart.forEach(item => {
//                     const itemDiv = document.createElement('div');
//                     if (item && user) {
//                         itemDiv.textContent = `${item.name} - Quantity: ${user.cart.filter(cartItem => cartItem.id === item.id).length} - Price: $${item.price}`;
//                     }    
//                     const removeButton = document.createElement('button');
//                     removeButton.textContent = 'Remove';
//                     removeButton.addEventListener('click', () => {
//                         if (user) {
//                             user.removeFromCart(item);
//                             updateCart();
//                         }
//                     });
//                     itemDiv.appendChild(removeButton);
//                     if (cartDiv) {
//                         cartDiv.appendChild(itemDiv);
//                     }
//                 });
//             }
//         }
//     }
//     // Add event listener for login button
//     const loginButton = document.getElementById('loginbutton');
//     if (loginButton) {
//         loginButton.addEventListener('click', handleLogin);
//     }
// });
