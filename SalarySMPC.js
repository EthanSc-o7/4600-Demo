export function createShares(numPeople, people){
  for(let j = 0; j < numPeople; j++){
    var secretShares = []; 
    for(let i = 0; i < numPeople-1; i++){
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      var share = Math.floor(Math.random() * 1001) * plusOrMinus;
      secretShares[i] = share; 
    }
    secretShares[numPeople-1] = people[j].salary - secretShares.reduce((partialSum, a) => partialSum + a, 0);
    people[j].shares = secretShares; 
    
  }
  return people; 
}
export function spreadShares(people){
  var length = people[0].shares.length; 
  for(let j = 0; j < length-1; j++){
    var rowShares = []
    for(let i = 0; i < length; i++){
      rowShares[i] = people[i].shares[j];
    }
    for(let i = 0; i < length; i++){
      people[i].shares[j] = rowShares[(i+(j+1))%length];
    }
  }
  return people;  
}

export function Salaverage(people){
  var length = people[0].shares.length; 
  var sum = 0; 
  for(let i = 0; i < length; i++){
    sum += people[i].shares.reduce((partialSum, a) => partialSum + a, 0);
  }
  var average = sum / length; 
  return sum; 
}