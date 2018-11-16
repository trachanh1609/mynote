

// Function arguments( 2 or fewer ideally)
// DONT
function createMenu(title, body, buttonText, cancellable) {
}
//DO
const menuConfig = {
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
}

function createMenu(menuConfig){
    const {title, body, buttonText, cancellable} = menuConfig;

}



// Functions should do one thing
// DONT
function emailClients(clients) {
    clients.forEach(( client) => {
        const clientRecord = database.lookup(client);
        if(clientRecord.isActive()){
            email(client);
        }
    });
}

// DO
function emailClients(clients) {
    clients
        .filter(isClientActive)
        .forEach(email) ;
}

function isClientActive(client){
    const clientRecord = database.lookup(client);
    return clientRecord.isActive()
}


// Functions names should say what they do
// DONT
function addToDate(date, month) {
    // ...
}

const date= new Date();
addToDate(date, 1);

// DO
function addMonthToDate(month, date) {
    // ...
}

const date= new Date();
addMonthToDate(1, date);



// Functions should only be one level of abstraction
// DONT
function parseBetterJSAlternative(code) {
    const REGEXES = [
        // ...
    ];

    const statements = code.split(' ');
    const tokens = [];
    REGEXES.forEach( (REGEX) => {
        statements.forEach((statement) => {
            // ...
        });
    });
    
    const ast = [];
    tokens.forEach((token) => {
        // ...
    })

    ast.forEach((node)=>{
        // ...
    })
}

// DO
function tokenize(code){
    return tokens
}
function lexer(tokens){
    return ast
}
function parseBetterJSAlternative(code) {
    const tokens = tokenize(code);
    const ast = lexer(tokens);
    ast.forEach((node)=>{
        // ...
    })
}