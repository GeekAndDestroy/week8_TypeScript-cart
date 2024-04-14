import { v4 as uuidv4 } from 'uuid';


// Classes

class Item {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name: string, price: number, description: string) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string){
        this._name = name;
    }

    public get price(): number {
        return this._price;
    }

    public set price(price: number){
        this._price = price;
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string){
        this._description = description;
    }

    public itemElement(): HTMLDivElement {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item", "card");
        itemDiv.innerHTML = `
            <h3>${this._name}</h3>
            <p>${this._description}</p>
            <p>Price: $${this._price}</p>
            <button class="btn btn-primary" id="add-to-cart-button">Add to Cart</button>
        `;
        const addToCartButtons = itemDiv.querySelector("#add-to-cart-button");
        addToCartButtons.onclick = () => {
            user.cart.addToCart(this);
        }
        return itemDiv
        
        
        
        
        // addToCartButtons.forEach(button => {
        //     button.addEventListener("click", () => {
        //         const itemId = (button as HTMLElement).dataset.itemId;
        //         if (itemId) {
        //             user.addToCart(itemId);
        //         }
        //     });
        // });
        // return itemDiv;
    }
}
// <button class="btn btn-primary add-to-cart-button" onclick="addToCart('${this._id}')">Add to Cart</button>

class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[];
    // private _shop: Shop;
  
    
    constructor(name: string, age: number) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = [];
        // this._shop = new Shop();
    }


    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string){
        this._name = name;
    }

    public get age(): number {
        return this._age;
    }

    public set age(age: number){
        this._age = age;
    }

    public get cart(): Item[] {
        return this._cart;
    }



    addToCart(itemId: string): void {
        // const itemToAdd = shop.items.find(item => item.id === itemId);
        const itemToAdd = this._shop.items.find(item => item.id === itemId);
        if (itemToAdd) {
            this._cart.push(itemToAdd);
            this.updateCart();
        }
    }

    removeFromCart(item: Item): void {
        const index = this._cart.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
            this._cart.splice(index, 1);
        }
    }

    private removeAllFromCart(item: Item): void {
        this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
        this.updateCart();
    }

    cartTotal(): number {
        return Math.round((this._cart.reduce((total, item) => total + item.price, 0) + Number.EPSILON) * 100) / 100; //Math.round() and Number.EPSILON used to correctly round to 2 decimals


        // Attempt to float using toFixed() method
        // let total = this._cart.reduce((total, item) => total + item.price, 0)
        // return total.toFixed(2);
    }

    printCart(): void {
        console.log("Items in the cart:");
        this._cart.forEach(item => console.log(item.name));
    }

    public static loginUser(event: Event): User | null | undefined {
        event.preventDefault();
        const nameInput = document.getElementById("name") as HTMLInputElement;
        const ageInput = document.getElementById("age") as HTMLInputElement;
        const name = nameInput.value;
        const age = parseInt(ageInput.value);

        return new User(name, age);
    }

        public cartHTMLElement(): HTMLDivElement {
        const cartContent = document.createElement("div");
        cartContent.classList.add("cart-content");
    
        if (this._cart.length === 0) {
            const emptyCartMessage = document.createElement("p");
            emptyCartMessage.textContent = "Cart is empty.";
            cartContent.appendChild(emptyCartMessage);
        } else {
            this._cart.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.textContent = `${item.name} - Quantity: ${this.getItemQuantity(item)} - Price: $${item.price}`;
    
                const removeOneButton = document.createElement("button");
                removeOneButton.classList.add("btn", "btn-warning");
                removeOneButton.textContent = "-1";
                removeOneButton.addEventListener("click", () => this.removeFromCart(item));
    
                const removeAllButton = document.createElement("button");
                removeAllButton.classList.add("btn", "btn-warning");
                removeAllButton.textContent = "X";
                removeAllButton.addEventListener("click", () => this.removeAllFromCart(item));
    
                itemDiv.appendChild(removeOneButton);
                itemDiv.appendChild(removeAllButton);
                cartContent.appendChild(itemDiv);
            });
        }
        return cartContent;
    }
    

    private getItemQuantity(item: Item): number {
        return this._cart.filter(cartItem => cartItem.id === item.id).length;
    }

    private updateCart(): void {
        const cartDiv = document.getElementById("cart") as HTMLDivElement;
        if (cartDiv) {
            cartDiv.innerHTML = "";
            cartDiv.appendChild(this.cartHTMLElement());
        }
    }
}

class Shop {
    private _items: Item[];

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

    public get items(): Item[] {
        return this._items;
    }

    public showItems(): void {
        const shopDiv = document.getElementById("shop") as HTMLDivElement;
        this._items.forEach(item => {
            shopDiv.appendChild(item.itemElement());
        });
    }

    getItemByName(name: string): Item | undefined {
        return this._items.find(item => item.name === name);
    }

    getItemsByDescription(description: string): Item[] {
        return this._items.filter(item => item.description.includes(description));
    }

    public addItem(item: Item): void {
        this._items.push(item);
    }

    public getItems(): Item[] {
        return this._items;
    }

    getItemById(id: string): Item | undefined {
        return this._items.find(item => item.id === id);
    }
}

export {
    Item,
    User,
    Shop
}

