// import { User, Shop } from './classes';

// document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.querySelector("form");
//     if (loginForm) {
//         loginForm.addEventListener("submit", (event) => {
//             const user = User.loginUser(event);
//             if (user) {
//                 const shop = new Shop();
//                 const shopDiv = document.getElementById("shop");
//                 const cartDiv = document.getElementById("cart");
//                 const loginDiv = document.getElementById("login");

//                 if (loginDiv) {
//                     loginDiv.style.display = "none";
//                 }
                
//                 if (shopDiv && cartDiv) {
//                     shop.items.forEach(item => shopDiv.appendChild(item.itemElement()));
//                     cartDiv.appendChild(user.cartHTMLElement());
//                 }
                
//                 // const addToCartButtons = document.querySelectorAll("#add-to-cart-button");
//                 // addToCartButtons.forEach(button => {
//                 //     button.addEventListener("click", () => {
//                 //         const itemId = (button as HTMLElement).dataset.itemId;
//                 //         if (itemId) {
//                 //             user.addToCart(itemId);
//                 //         }
//                 //     });
//                 // });
//             }
//         });
//     }
// });


import { v4 as uuidv4 } from 'uuid';


// Classes

class Item {

    constructor(
        private _name : string,
        private _price : number,
        private _description : string,
        private _id: string = uuidv4(),
    ) {}

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
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

        const addToCartButtons = itemDiv.querySelector("#add-to-cart-button") as HTMLButtonElement;
        addToCartButtons.onclick = () => {
          Shop.myUser!.addToCart(this);
        }
        return itemDiv   
    }
}


class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Item[] = [];
  
    
    constructor(name: string, age: number) {
      this._id = uuidv4();
      this._name = name;
      this._age = age;
      this._cart = [];
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

    public set cart(value:Item[]){
      this._cart = value
    }

    addToCart(item : Item): void {       
      this._cart.push(item);
      Shop.updateCart();   
    }

  //   removeQuantityFromCart(item: Item, quantity: number): void {
  //     let remainingQuantity = quantity;
  //     this.cart = this.cart.filter(cartItem => {
  //         if (cartItem.id === item.id && remainingQuantity > 0) {
  //             remainingQuantity--;
  //             return false;
  //         }
  //         return true;
  //     });
  //     Shop.updateCart();
  // }

  //   removeQuantityFromCart(item: Item, quantity: number): void {
  //     for (let i=0; i < quantity; i++){
  //       let indexOfItem = this.cart.findIndex( cartItem => cartItem.id == item.id)
  //       this.cart.splice(indexOfItem, 1);
  //     }
  //     Shop.updateCart();
  // }

    removeQuantityFromCart(item: Item, quantity: number): void {
      let remove = 0;
      while (quantity > remove) {
          this.cart.splice(this.cart.findIndex((i) => i.id == item.id), 1);
          remove++;
      }
      Shop.updateCart();
  }



    private removeFromCart(item: Item): void {
      this._cart = this._cart.filter(cartItem => cartItem.id !== item.id);
      Shop.updateCart();
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

    public static loginUser(): User | null | undefined {
    
        const nameInput = document.getElementById("name") as HTMLInputElement;
        const ageInput = document.getElementById("age") as HTMLInputElement;
        const name = nameInput.value;
        const age = parseInt(ageInput.value);
        return new User(name, age);
    }

    public cartHTMLElement(): HTMLDivElement {
        const cartContent = document.createElement("div");
        cartContent.classList.add("cart-content");

        const uniqueItems = new Set<Item>(this._cart);
         
        uniqueItems.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = `${item.name} - Quantity: ${this.getItemQuantity(item)} - Price: $${item.price}`;

            const removeOneButton = document.createElement("button");
            removeOneButton.classList.add("btn", "btn-warning", `remove-one-${item.id}`, "rmbtn");
            removeOneButton.textContent = "-1";
            removeOneButton.id = `${item.id}-rm1`
            removeOneButton.onclick = () => {Shop.myUser!.removeQuantityFromCart(item,1)}

            const removeAllButton = document.createElement("button");
            removeAllButton.classList.add("btn", "btn-warning", `remove-all-${item.id}`, "rmbtn");
            removeAllButton.textContent = "X";

            itemDiv.appendChild(removeOneButton);
            itemDiv.appendChild(removeAllButton);
            cartContent.appendChild(itemDiv);
        });

        const cartTotal = document.createElement("div");
        cartTotal.textContent = `Your total is: ${this.cartTotal()}`;
        cartContent.appendChild(cartTotal);
        return cartContent;
    }

    public addRemoveEventListeners(): void {
        this._cart.forEach(item => {
            const removeOneButtons = document.getElementById(`${item.id}-rm1`) as HTMLButtonElement||null;
            if (removeOneButtons) {removeOneButtons.onclick = () => Shop.myUser?.removeQuantityFromCart(item, 1);
            };
            const removeAllButtons = document.querySelectorAll(`.remove-all-${item.id}`);
            removeAllButtons.forEach(button => {
                button.addEventListener("click", () => Shop.myUser!.removeFromCart(item));
            });
        });
    }

    private getItemQuantity(item: Item): number {
        return this._cart.filter(cartItem => cartItem.id === item.id).length;
    }
}

class Shop {
    static myUser: User | null |undefined;

    constructor(
        private _items: Item[] = []
    ) {
        this._items = _items;
        this.items.push(new Item("Collar", 15.99, "Make your pooch the most fashionable doggo in the neighborhood! This collar will turn heads and wag tails.")),
        this.items.push(new Item("Bed", 29.99, "Treat your fur baby to the lap of luxury with this plush bed fit for a king-sized pup. Warning: May cause excessive snoring.")),
        this.items.push(new Item("Toy", 8.49, "Keep your canine entertained for hours with this squeaky toy. Caution: May induce bouts of zoomies.")),
        this.items.push(new Item("Leash", 12.99, "Take your pup for a walk in style and show off your matching accessories. Warning: May attract envious stares from other dog parents.")),
        this.items.push(new Item("Treats", 5.99, "Reward your good boy or girl with these delicious treats. Warning: May lead to begging and puppy-dog eyes.")),
        this.items.push(new Item("Poop Bags", 4.99, "Keep your neighborhood clean and your walks embarrassment-free with these biodegradable bags. Warning: May induce a strong sense of responsibility."))
        this.showItems();
        Shop.myUser!.cart = [];
        Shop.updateCart();
    }

    public get items(): Item[] {
        return this._items;
    }

    public set items(value:Item[]){
        this._items = value;
    }

    public showItems(): void {
        const shopDiv = document.getElementById("shop") as HTMLDivElement;
        this._items.forEach(item => {
            shopDiv.appendChild(item.itemElement());
        });
    }

    // static updateCart(): void {
    //     const cartDiv = document.getElementById("cart") as HTMLDivElement;
    //     if (cartDiv) {
    //         cartDiv.innerHTML = "";
    //         cartDiv.replaceChildren(Shop.myUser!.cartHTMLElement());
    //     }
    // }

    static updateCart() {
        const cartDiv = document.getElementById("cart") as HTMLElement;
        if (Shop.myUser!.cart.length <= 0) {
            cartDiv.innerHTML = `<H2>My Cart</H2>No items in cart`;
        } else {
            cartDiv.replaceChildren(Shop.myUser!.cartHTMLElement());
            cartDiv.innerHTML = ('<H2>My Cart</H2>' + cartDiv.innerHTML);
            Shop.myUser!.addRemoveEventListeners();
        }
    }

    static loginUser(event: Event) {
        event.preventDefault();
        Shop.myUser = User.loginUser();
        if (Shop.myUser) {
            document.getElementById("login")!.remove();
            new Shop();
        }
    }

}

// Driver Code

document.getElementById("loginbutton")!.addEventListener("click", (event) => Shop.loginUser(event));