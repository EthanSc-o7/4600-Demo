const express = require('express')
let salary = require("./SalarySMPC.js"); 
const fs = require("fs");
const app = express()
const path = require('path');

app.set('view engine', 'ejs')
app.set({"Content-type:" : "application/javascript"}); 
app.use(express.static(__dirname + '/views'));
app.use("/node_modules", express.static(path.resolve("node_modules"))); // Expose node_modules

app.use(express.urlencoded({extended: true}))
app.get('/',(req,res) =>{
  res.render('index');
} )

app.get("/fetch.js", (request, response) => {
  response.sendFile(path.join(__dirname, './fetch.js'))
});

app.get("/peopleShares", (req, res)=>{
  fs.readFile("PeopleShares.json", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get("/randomShares", (req, res)=>{
  fs.readFile("randomShares.json", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to load data" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/people', (req,res) =>{
  var length = req.body.NumberPeople;
  var people = [];
  var person = {}; 
  for(let i = 0; i < length; i++){
    var personName = 'person ' + (i+1); 
    var personSalary = req.body.Person[i];
    person[i] = {name: personName, salary: personSalary}; 
    people[i] = person[i]; 
  }
  encryptedPeople = salary.createShares(length,people);
  fs.writeFile('PeopleShares.json', JSON.stringify(encryptedPeople), (err)=>{
    if (err) throw err;
  })
  swappedSharesPeople = salary.spreadShares(encryptedPeople);
  var sum = salary.Salaverage(swappedSharesPeople);
  var avg = sum / length; 
  swappedSharesPeople.push({avg: avg, sum: sum});
  
  fs.writeFile('RandomShares.json', JSON.stringify(swappedSharesPeople), (err)=>{
    if (err) throw err;
  })
  res.status(200).send();
})

app.listen(3000)

var swappedSharesPeople = []; 
var encryptedPeople = [];

