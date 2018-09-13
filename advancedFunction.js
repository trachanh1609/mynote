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


// Currying
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b ;

const newFunc = curriedMultiply(3);
let result = newFunc(4);
console.log(result);
// Or calling like this
result = curriedMultiply(4)(5) ;
console.log(result);


// Compose
// is a function that takes 2 functions and return a function, the result of the first function is the argument of the second function

const compose = (f,g) => (a) => f(g(a)) ;

const addOne = (num) => num + 1 ;
console.log(compose(addOne, addOne)(5) );  // return 7
// compose(addOne, addOne)(5) <=> addOne( addOne(5) ) <=> addOne (6) <=> 7

// Avoid side effects, functional purity, always return something.