// https://dev.to/rainerhahnekamp/javascript-and-object-oriented-programming-55k6


function Product(_name, _price) {
    // name and price are encapsulated
    const name = _name;
    const price = _price;

    // name and price are NOT encapsulated
    // because they can be accessed like product.price = 5;
    // this.name = _name;
    // this.price = _price;
  
    this.getName = function() {
      return name;
    };
  
    this.getPrice = function() {
      return price;
    };
  }
  
function Basket() {
    const products = [];

    this.addProduct = function(amount, product) {
        products.push(...Array(amount).fill(product));
    };

    this.calcTotal = function() {
        return products
        .map(product => product.getPrice())
        .reduce((a, b) => a + b, 0);
    };

    this.printShoppingInfo = function() {
        console.log('one has to pay in total: ' + this.calcTotal());
    };
}

// Not this way 
// const basket = Product("bread", 1);

const basket = new Product("bread", 1);


// ----------------------------------------------------------------------------------------------------
// ES6 version. Not encapsulated
class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  }
  
class Book extends Product {
    constructor(name, price, author) {
        super(name, price);
        this.author = author;
    }
}
  
  class Basket {
    constructor() {
      this.products = [];
    }
  
    addProduct(amount, product) {
      this.products.push(...Array(amount).fill(product));
    }
  
    calcTotal() {
      return this.products
        .map(product => product.price)
        .reduce((a, b) => a + b, 0);
    }
  
    printShoppingInfo() {
      console.log('one has to pay in total: ' + this.calcTotal());
    }
  }
  
  const bread = new Product('bread', 1);
  const water = new Product('water', 0.25);
  const faust = new Book('faust', 12.5, 'Goethe');
  
  const basket = new Basket();
  basket.addProduct(2, bread);
  basket.addProduct(3, water);
  basket.addProduct(1, faust);
  basket.printShoppingInfo();



  //Prototype version. This is not encapsulated, but it can be written in encapsulated way.

function Product(name, price) {
    this.name = name;
    this.price = price;
  }
  
  function Book(name, price, author) {
    Product.call(this, name, price);
    this.author = author;
  }
  Book.prototype = Object.create(Product.prototype);
  Book.prototype.constructor = Book;
  
  function Basket() {
    this.products = [];
  }
  Basket.prototype.addProduct = function(amount, product) {
    this.products.push(...Array(amount).fill(product));
  };
  Basket.prototype.calcTotal = function() {
    return this.products
      .map(product => product.price)
      .reduce((a, b) => a + b, 0);
  };
  Basket.prototype.printShoppingInfo = function() {
    console.log('one has to pay in total: ' + this.calcTotal());
  };
  