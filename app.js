// variables
// var name with DOM in it is dealing with
// var name without DOM is dealing with logic

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Main cart
let cart = [];

// ---------------------------------------
/* How the JSON data is formated
// Object
{
    // array of objects
    "items": [
    //   object 1
    {
        // sys object
        "sys": { "id": "1" },
    //   fields object
        "fields": {
        // poperty
        "title": "queen panel bed",
        "price": 10.99,
        // image object, fields property, file object, url property
        "image": { "fields": { "file": { "url": "./images/product-1.jpeg" } } }
        }
    },
*/
// ---------------------------------------

// resposible for getting the products
class Products {
  // method getProducts using es6 async await (will always return the promise after the promise is settled and then it will return the result)
  async getProducts() {
    try {
      let result = await fetch('products.json');
      let data = await result.json();
      let products = data.items; // products is storing the array of objects or products
      // destructuring the products.json

      products = products.map(item => {
        // as we are iterating through the array we are destructuring it
        // get title 1st and then price from the item(each item or object in the array 8)
        const { title, price } = item.fields;
        // get id from sys object
        const { id } = item.sys;
        // get image
        const image = item.fields.image.fields.file.url;
        // return the clean version of object
        return { title, price, id, image };
      });
      // return data; // this will return the messy version of the object in product.json
      // return the clean version of object
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products, every method that is in the cart will be in here
class UI {
  displayProducts(products) {
    let result = '';
    // getting array so using array methods
    // get the properties from the object and place it wrapped inside the html we already have for the structure for the actual product we are going to be placing inside the html
    // looping over the products array defined in Products class
    products.forEach(product => {
      // adding data dynamically to the empty string using template literal, because we have access to each and every product i.e. (product => {
      result += `
            <article class="product">
            <div class="img-container">
                <img src=${product.image} alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to bag
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
            </article>
            `

    });
    productsDOM.innerHTML = result;
  }
}

// local storage
class Storage {
  // static method allows the use of a method without instantiating the class
  static saveProducts(products) {
    // access local storage
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// Remember the parameters in the methods above depend on what you are pasing in as an arguement below
document.addEventListener("DOMContentLoaded", () => {
  // create two instances of above classes
  const ui = new UI();
  const products = new Products();

  // get all products method
  // the .then will make sure the getProducts method will only run after we are done adding the products ui.displayProducts(products);
  products.getProducts().then(products => {
    //  method diplaying the products
    ui.displayProducts(products);
  });
});

