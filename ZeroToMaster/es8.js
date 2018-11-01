// New in ES8
// Object.values
// Object.entries

// We want to iterate through an Object 
// Before that we have Object.keys
const obj = {
    username0: 'Santa',
    username1: 'Peter',
    username3: 'Jane',
}

console.log("Using Object.keys");
Object.keys(obj).forEach( (key, index) => {
    console.log("index:", index , "key:", key , "value:", obj[key]);
} )
// index: 0 key: username0 value: Santa
// index: 1 key: username1 value: Peter
// index: 2 key: username3 value: Jane


console.log("\nUsing Object.values");
Object.values(obj).forEach(value=>{
    console.log("values:", value);
})
// values: Santa
// values: Peter
// values: Jane

console.log("\nUsing Object.entries");
Object.entries(obj).forEach(value=>{
    console.log("values:", value);
})
// values: [ 'username0', 'Santa' ]
// values: [ 'username1', 'Peter' ]
// values: [ 'username3', 'Jane' ]

console.log("\nCase 1 : Using Object.entries");
const newUserList = Object.entries(obj).map(value => {
    return value[1] + value[0].replace('user', '_person_')
})
console.log(newUserList)
// [ 'Santa_person_name0',
//   'Peter_person_name1',
//   'Jane_person_name3' ]


// Async Await
