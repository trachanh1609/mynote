// DONT
var yyyymmddstr = moment().format('YYYY/MM/DD');
// DO
// Use meaningful and pronounceable variables names
var yearMonthDate = moment().format('YYYY/MM/DD');



// DONT
var FIRST_US_PRESIDENT = "George Washington";
// DO
// Use ES6 const
const FIRST_US_PRESIDENT = "George Washington";



// DONT
getUserInfo();
getClientData();
getCustomerRecord();
// DO
// Use the same vocabulary for the same type of variables
getUser();



// DONT
for( var i= 0 ; i < 525600; i++){
    runCronJob();
}

// DO
// Use searchable names
const MINUTES_IN_YEAR = 525600 ;
for( var i= 0 ; i < MINUTES_IN_YEAR; i++){
    runCronJob();
}



// DONT
const cityStateRegex = /^(.+)[,\\s]+(.?)\s*(\d{5})?$/;
saveCityState(cityStateRegex.match(cityStateRegex)[1], cityStateRegex.match(cityStateRegex)[2]);

// DO
// Use explanatory variables
const match = cityStateRegex.match(cityStateRegex);
const city = match[1];
const state= match[2];
saveCityState(city, state);

// DONT
// Dont add unneeded context
var Car = {
    carMake : 'Honda',
    carModel: 'Accord',
    carColor: 'Blue'
}
// DO
var Car = {
    make : 'Honda',
    model: 'Accord',
    color: 'Blue'
}
// VS code shortcut
// Ctrl + Alt + DOWN : multi cursor
// Alt + DOWN : Move that line down
// Alt + Shift + DOWN : Copy that line down



// DONT
function createMicrobrewery(name){
    var breweryName;
    if(name){
        breweryName = name;
    } else {
        breweryName = 'Hipster Brew Co.';
    }
}

// DO
// Short-circuiting is cleaner than conditionals
function createMicrobrewery(name){
    var breweryName = name || 'Hipster Brew Co.' ;
}