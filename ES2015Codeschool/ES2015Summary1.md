Cheatsheet
https://devhints.io/es6

#### Level 1: Declarations
##### 1.1
- let, const : not hoisted , scoped to the nearest block.
- var : hoisted
- Variables declared with "let" can be reassigned, but cannot be redeclared within the same scope
- const cannot be reassigned, must assigned an initial value ( const MAX_USERS ; > Syntax Error)


currying, binding ?
##### 1.2 Loop

````javascript
function loadProfiles(userNames){
  for(var i in userNames){
    _fetchProfile("/users/" + userNames[i], function(){
      console.log("Fetched for ", userNames[i]);
    })
  }
}

loadProfiles(["Sam", "Brook", "Tyler", "Alex"])
// Will output
// Fetched for Alex  4 times

````

#### Level 2: Functions
##### 2.1

- Default Parameter Values
````javascript
  function loadProfiles(userNames = []) // empty array if no argument is passed
  instead of function loadProfiles(userNames){
    let names = typeof(userNames) !=="undefined" ? userNames : [];
    let namesLength = names.length;
    // ...
  }
````
- Problem:
  - The option object makes it hard to know what options a function accepts
````javascript
  function loadProfiles(userNames = [], options = {}) {
    let profilesClass = options.profilesClass || ".user-profile";
    let reverseSort   = options.reverseSort   || false;
  }
````
- ES6 solution:
  - Using Named Parameters of optional settings makes it easier to understand how a function should invoke

  ````javascript
  function loadProfiles(userNames = [], {profilesClass, reverseSort}= {}) {
      profilesClass = profilesClass || ".user-profile";
      reverseSort   = reverseSort   || false;
  }

  function setPageThread(name, {popular,expires, activeClass} = {} ){      // {popular, expires, activeClass} are Named Parameters by looking at function signature
    let nameElement = _buildNameElement(name);
    let settings = _parseSettings(popular, expires, activeClass);

    _updateThreadElement(nameElement, settings);
  }

  // calling function
  setPageThread("New Version out Soon", {
    popular: true
  });
  // -> popular: true, expires: undefined, activeClass: undefined but not crashed
  ````

##### 2.7 Rest Parameter, Spread Operator, Arrow Functions

  ###### REST PARAMETERS

  - ES5: using arguments object

````javascript
    function displayTags(){
      for (let i in arguments){
        let tag = arguments[i];
      }
    }
````

- Problems:
  - Where did this "argument" come from ? Which parameters this function expects
  - Add another argument will break the Loop. For ex:

````javascript
    function displayTags(targetElement){
      for (let i in arguments){
        let tag = arguments[i];   // arguments[0] is targetElement
      }
    }
````

- ES6: Using Rest parameters

````javascript
function displayTags(...tags){
  for (let i in tags){
    let tag = tags[i];
  }
}
function displayTags(targetElement, ...tags){   // Rest parameters must always go LAST
  for (let i in tags){
    let tag = tags[i];   // arguments[0] is targetElement
  }
}
````

SPREAD OPERATOR
The spread operator allows us to split an Array argument into Individual elements
In function invocation ( not in function definition) :
let tags= data.tags;
displayTags(...tags) ;  // === displayTags(tag, tag, tag ...) ;

ARROW FUNCTION
Arrow functions bind to the scope of where they are defined, not where they are used ( also known as lexical binding)
Example:
function TagComponent(target, urlPath){
  this.targetElement = target;
  this.urlPath = urlPath;
}

TagComponent.prototype.render = function() {
  getRequest(this.urlPath, function(data){
    let tags = data.tags;
    displayTags(this.targetElement, ...tags);  // ---> ERROR, this.targetElement is undefined because the anonymous function create a new scope
  })
}

Instead of this, use arrow function to
TagComponent.prototype.render = function() {
  getRequest(this.urlPath, (data)=>{
    let tags = data.tags;
    displayTags(this.targetElement, ...tags);  // ---> this is the same as TagComponent -> lexical binding -> working
  })
}

Level 3: Object and Strings
- Object Initializer Shorthand

- ES5 Problem : repeating "first", "last", "fullName"
function buildUser(first,last){
  let fullName = first + " " + last;
  return {first: first, last: last, fullName : fullName}
}

- ES6 : Shorthand
function buildUser(first,last){
  let fullName = first + " " + last;
  return {first, last, fullName}
}

let user = buildUser("Sam", "Williams");
console.log(user.first);  // Sam
console.log(user.last);   // Williams
console.log(user.fullName); // Sam Williams

- We can use shorthand in assigning
let name = "Sam";
let age = 45;
let user = {name, age};
console.log(user.name);
console.log(user.age) ;

- We can use shorthand to assign Properties from objects to Local Variables with the SAME NAME
let user = buildUser("Sam", "Williams");
Instead of
let first = user.first
let last = user.last;
let fullName = user.fullName;

Use this
let {first, last, fullName} = buildUser("Sam", "Williams");
let {last, fullName} = buildUser("Sam", "Williams");
let {fullName} = buildUser("Sam", "Williams");

- Instead of
function buildUser(first, last, postCount){
  let fullName =  first + " " + last;
  const ACTIVE_POST_COUNT = 10;
  return {
    first,
    last,
    fullName,
    isActive: function(){
      return postCount >= ACTIVE_POST_COUNT;
    }
  }
}
- We can use
function buildUser(first, last, postCount){
  let fullName =  first + " " + last;
  const ACTIVE_POST_COUNT = 10;
  return {
    first,
    last,
    fullName,
    isActive(){
      return postCount >= ACTIVE_POST_COUNT;
    }
  }
}

- Template Strings are String Literals allowing embedded expressions. This allows for a much better way to do string interpolation.
Instead of
let fullName =  first + " " + last;
Use
let fullName = `${first} ${last}`;  // Enclosed by back-tick NOT Single quotes
- Template Strings can be used for multi-line strings, preserve the new line character (use back-tick)

3.9 OBJECT.ASSIGN
Problems
function countdownTimer(target, timeLeft, {a,b,c,d,e,f,g}={})   // too long
function countdownTimer(target, timeLeft, option={}){    // long, difficult to see the default Values
  let a = option.a || 'a';
  let b = option.b || 'b';
  let c = option.c || 'c';
  let d = option.d || 'd';
  let e = option.e || 'e';
  let anotherVar = something;
}

ES6 Solution: Object assign
function countdownTimer(target, timeLeft, option={}){
  let defaults = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd'
  }

  let settings = Object.assign({}, defaults, option);  // {}: target object is modified and returned, (defaults, option) Source objects remain unchanged
  // In case of duplicate Properties on source objects, the value from the last object on the chain always prevails

  // Incorrect usage
  // ONE
  // Object.assign(defaults, options);  // defaults is mutated, we cannot go back and access original default values after the merge

  // TWO
  // let settings = {};
  // Object.assign(settings, defaults, option)    // Not reading return values, settings is passed as a reference
}


#### 4. ARRAYS, MAPS, SETS
##### 4.1 ARRAYS
- Array Destructuring
let users = ["Sam", "Tyler", "Brook"];
Problems
let a = users[0]
let b = users[1]
let c = users[2]

Solutions in ES6 : Array Destructuring
let [a, , b] = users;

- Combining Destructuring with Rest PARAMETERS
let [first, ...rest] = users;
console.log(rest)  // ["Tyler", "Brook"]

- Destructuring Arrays from return Values
function activeUsers(){
  let users = ["Sam", "Tyler", "Brook"];
  return users;
}
let [a, b, c] = activeUsers();

- Using for...of to Loop Over ARRAYS
let names = ["Sam", "Tyler", "Brook"];
for(let name of names ){
  console.log(name)     // Sam Tyler Brook
}
Instead of
for(let index in names ){
  console.log(names[index])     // Sam Tyler Brook
}

- for...of does not work in objects Properties
- How to check ? Object must be iterable
console.log( typeof names[Symbol.iterator]);  // function , ok to do for...of
let post = {title: "hi", replies: 12};
console.log( typeof post[Symbol.iterator]);  // undefined, NOT ok to do for...of

- Find an Element in an ARRAYS
let users = [
  {login: "Sam", admin: false},
  {login: "Brook", admin: true},
  {login: "Tyler", admin: true}
]

let admin = users.find( (user) => {
  return user.admin;
});
OR
let admin = users.find(user => user.admin);
console.log(admin) ; //   {login: "Brook", admin: true},


##### 4.8 MAPS
###### Issues with Objects as Maps
````javascript
let author1 = { name: "Sam" };
let author2 = { name: "Tyler" };

let mostRecentReply = {};

mostRecentReply[author1] = "ES2015";
mostRecentReply[author2] = "Semi-colons: Good or Bad?";

console.log( mostRecentReply[author1] );  // Semi-colons: Good or Bad?
console.log( mostRecentReply[author2] );  // Semi-colons: Good or Bad?
````

Map is datatructure containing key/values
- Issue of JS object as map is : keys are always converted to strings.

Using Map Example
let user1 = {name: "Sam"};
let user2 = {name: "Tyler"};

let totalReplies = new Map();
totalReplies.set(user1, 5);
totalReplies.set(user2, 42);

console.log(totalReplies.get(user1));  // 5
console.log(totalReplies.get(user2));  // 42

- Using Map : When keys and values are known, When all keys are the same type , all values are the same type
- When not using Map : keys are unknown. Example


````javascript
let recentPosts = new Map();
createpost(newPost, (data) => {
  recentPosts.set(data.author, data.message); // key = data.author is unknown util runtime
})

````
- Using Object :   // author : String, replies: number then using Object is our best choice

````javascript
let recentPosts = {
  author: '',    // keys are previously defined. We dont
  replies: 0    //  run the risk of accidentally overwriting values.
}
````

- Iterating Mpas with for...of
let mapSettings = new Map()
mapSettings.set("user", "Sam");
mapSettings.set("topic", "ES2015");
mapSettings.set("replies", ["Can't wait", "So cool"]);

for (let [key, value] of mapSettings){
  console.log(`${key} = ${value}`);
}


##### WEAKMAP

- The WeakMap is a type of Map where only **objects** can be passed as keys. Primitive data types ( string,number,boolean) are not allowed

```javascript
  let user = {}
  let comment = {}
  let mapSettings = new WeakMap();
  mapSettings.set(user, "user")
  mapSettings.set(comment, "comment")

  console.log(mapSettings.get(user));  // user

  mapSettings.set("title", "ES2015")  // Invalid value used as weakmap key
  mapSettings.has(user)  // true
  mapSettings.delete(user)  // true
```
- WeakMap is not **iterable**, not **for...of**
- WeakMaps are better with Memory. Individual entries in a WeakMap can be **garbage collected** while the WeakMap itself still exists.

````javascript
  let user = {};   // All objects occupy memory space
  let userStatus = new WeakMap();
  userStatus.set(user, "logger");

  // ...
  someOtherFunction(user);  // Once it returns, user can be garbage collected

  // If user is garbage collected, it will also collect userStatus
  // and free up memory
````

##### 4.17 SETS
