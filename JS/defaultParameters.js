// Link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// ONE
// set to DefaultP if parameter is "undefined". So
// if 'undefined'==='undefined' , num = 1
// if null , num = null , which is an object
function test(num = 1) {
    console.log(typeof num);
  }
  
  test();          // 'number' (num is set to 1)
  test(undefined); // 'number' (num is set to 1 too)
  
  // test with other falsy values:
  test('');        // 'string' (num is set to '')
  test(null);      // 'object' (num is set to null)



  // TWO
  // The default argument is evaluated at call time,
  // a new object is created each time the function is called.
  function append(value, array = []) {
    array.push(value);
    return array;
  }
  
  append(1); //[1]
  append(2); //[2], not [1, 2]

  // this even applies to functions and variables
  function callSomething(thing = something()) {
    return thing;
   }
   
   let numberOfTimesCalled = 0;
   function something() {
     numberOfTimesCalled += 1;
     return numberOfTimesCalled;
   }
   
   callSomething(); // 1
   callSomething(); // 2


  // THREE
  // Parameters defined beforehand (to the left) are available to later default parameters:
  function greet(name, greeting, message = greeting + ' ' + name) {
    return [name, greeting, message];
}

greet('David', 'Hi');  // ["David", "Hi", "Hi David"]
greet('David', 'Hi', 'Happy Birthday!');  // ["David", "Hi", "Happy Birthday!"]

function go() {
    return ':P';
  }

function withoutDefaults(a, b, c, d, e, f, g) {
    switch (arguments.length) {
      case 0:
        a;
        // break;   // No break and switch wil continue until the case is matched
      case 1:
        b = 5;
      case 2:
        c = b;
      case 3:
        d = go();
      case 4:
        e = this;
      case 5:
        f = arguments;
      case 6:
        g = this.value;
      default:
    }
    return [a, b, c, d, e, f, g];
  }
  

  const arrayNoDefault = withoutDefaults.call({value: '=^_^='});
  console.log("array", arrayNoDefault) ;
  // array [ undefined, 5, 5, ':P', { value: '=^_^=' }, {}, '=^_^=' ]

  const arrayNoDefault2 = withoutDefaults.call({value: '=^_^='}, 7, 8 ,9);
  console.log("array2", arrayNoDefault2) ;
 // array2 [ 7,
//   8,
//   9,
//   ':P',
//   { value: '=^_^=' },
//   { '0': 7, '1': 8, '2': 9 },  
//   '=^_^=' ]

 const myObject =  { '0': 7, '1': 8, '2': 9 };
 console.log("Obj length", myObject.length);
 // Obj length undefined