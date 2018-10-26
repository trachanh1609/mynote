// Closures
function first() {
    var greet = 'Hi';

    function second(name){
        console.log(greet, name) ;
    }
    return second;
}
var sayGreet = first();
sayGreet("Vinny");
// Output:
// Hi Vinny


// Currying
// Accept one parameter at a time.
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b ;

const newFunc = curriedMultiply(3);
let result = newFunc(4);
console.log(result);
// Or calling like this
result = curriedMultiply(4)(5) ;
console.log(result); // 4*5 = 20

// why we need to do this. Case
const multiplyBy5 = curriedMultiply(5);


// Compose
// is a function that takes 2 functions and return a function, the result of the first function is the argument(the input) of the second function

const compose = (f,g) => (a) => f(g(a)) ;

const addOne = (num) => num + 1 ;
console.log("compose 1:" , compose(addOne, addOne)(5) );  // return 7
// compose(addOne, addOne)(5) <=> addOne( addOne(5) ) <=> addOne (6) <=> 7

const multiplyByTwo = (num) => num * 2 ;
const multiplyByThree = (num) => num * 3 ;
console.log("compose 2:", compose(multiplyByTwo, multiplyByThree)(5) );

// Definition: "Compose takes 2 functions and return a function"
// "The result of the first function is the input of the second function"
const multiplyBySix = compose(multiplyByTwo, multiplyByThree);
console.log("compose 3:", multiplyBySix(5));


// Avoid side effects, functional purity, always return something.