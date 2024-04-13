"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shop = exports.User = exports.Item = void 0;
const uuid_1 = require("uuid");
// Classes
class Item {
    constructor(name, price, description) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    itemElement() {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item", "card");
        itemDiv.innerHTML = `
            <h3>${this._name}</h3>
            <p>${this._description}</p>
            <p>Price: $${this._price}</p>
            <button class="btn btn-primary" onclick="addToCart('${this._id}')">Add to Cart</button>
        `;
        return itemDiv;
    }
}
exports.Item = Item;
class User {
    constructor(name, age) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._age = age;
        this._cart = [];
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get age() {
        return this._age;
    }
    set age(age) {
        this._age = age;
    }
    get cart() {
        return this._cart;
    }
    addToCart(item) {
        this._cart.push(item);
    }
    removeFromCart(item) {
        const index = this._cart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
            this._cart.splice(index, 1);
        }
    }
    removeAllFromCart(item) {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
        this.updateCart();
    }
    cartTotal() {
        return Math.round((this._cart.reduce((total, item) => total + item.price, 0) + Number.EPSILON) * 100) / 100; //Math.round() and Number.EPSILON used to correctly round to 2 decimals
        // Attempt to float using toFixed() method
        // let total = this._cart.reduce((total, item) => total + item.price, 0)
        // return total.toFixed(2);
    }
    printCart() {
        console.log("Items in the cart:");
        this._cart.forEach(item => console.log(item.name));
    }
    static loginUser(event) {
        event.preventDefault();
        const nameInput = document.getElementById("name");
        const ageInput = document.getElementById("age");
        const name = nameInput.value;
        const age = parseInt(ageInput.value);
        return new User(name, age);
    }
    cartHTMLElement() {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart");
        if (this._cart.length === 0) {
            cartDiv.textContent = "Cart is empty.";
        }
        else {
            this._cart.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.textContent = `${item.name} - Quantity: ${this.getItemQuantity(item)} - Price: $${item.price}`;
                const removeOneButton = document.createElement("button");
                removeOneButton.textContent = "-1";
                removeOneButton.addEventListener("click", () => this.removeFromCart(item));
                const removeAllButton = document.createElement("button");
                removeAllButton.textContent = "X";
                removeAllButton.addEventListener("click", () => this.removeAllFromCart(item));
                itemDiv.appendChild(removeOneButton);
                itemDiv.appendChild(removeAllButton);
                cartDiv.appendChild(itemDiv);
            });
        }
        return cartDiv;
    }
    getItemQuantity(item) {
        return this._cart.filter(cartItem => cartItem.id === item.id).length;
    }
    updateCart() {
        const cartDiv = document.getElementById("cart");
        cartDiv.innerHTML = "";
        cartDiv.appendChild(this.cartHTMLElement());
    }
}
exports.User = User;
class Shop {
    constructor() {
        this._items = [
            new Item("Collar", 15.99, "Make your pooch the most fashionable doggo in the neighborhood! This collar will turn heads and wag tails."),
            new Item("Bed", 29.99, "Treat your fur baby to the lap of luxury with this plush bed fit for a king-sized pup. Warning: May cause excessive snoring."),
            new Item("Toy", 8.49, "Keep your canine entertained for hours with this squeaky toy. Caution: May induce bouts of zoomies."),
            new Item("Leash", 12.99, "Take your pup for a walk in style and show off your matching accessories. Warning: May attract envious stares from other dog parents."),
            new Item("Treats", 5.99, "Reward your good boy or girl with these delicious treats. Warning: May lead to begging and puppy-dog eyes."),
            new Item("Poop Bags", 4.99, "Keep your neighborhood clean and your walks embarrassment-free with these biodegradable bags. Warning: May induce a strong sense of responsibility.")
        ];
    }
    get items() {
        return this._items;
    }
    showItems() {
        const shopDiv = document.getElementById("shop");
        this._items.forEach(item => {
            shopDiv.appendChild(item.itemElement());
        });
    }
    getItemByName(name) {
        return this._items.find(item => item.name === name);
    }
    getItemsByDescription(description) {
        return this._items.filter(item => item.description.includes(description));
    }
    addItem(item) {
        this._items.push(item);
    }
    getItems() {
        return this._items;
    }
}
exports.Shop = Shop;
