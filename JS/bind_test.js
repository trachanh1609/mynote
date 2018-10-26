var owen = {
  name: "Owen"
}

function sayTo(first, second){
  console.log( first + " " + this.name + " " + second );
}

console.log('Call() running :');
sayTo.call(owen, 'Call: Hi', 'Are you ok ?');

console.log('Apply() running :');
sayTo.call(owen, ['Apply: Hi', 'Are you ok ?']);


var sayToOwen = sayTo.bind(owen);

console.log('sayToOwen (bind) running :');
sayToOwen('Bind: Hi', 'Are you ok ?');
