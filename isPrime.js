// The regex way

function isPrime(n){
    const regex = /^1?$|^(11+?)\1+$/ ;
    const numInUnaryForm = Array(n+1).join(1) ;

    // console.log(typeof(numInUnaryForm)) ;
    return !(numInUnaryForm.match(regex));
}

// Max integer can be evaluated is 6710859, 
// greater than that will give "RangeError: Maximum call stack size exceeded"
console.log("Number is a prime:", isPrime(6710859) );