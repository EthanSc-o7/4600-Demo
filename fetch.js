const btnEL = document.getElementById('dataButton'); 
//const form = document.getElementById("dataForm");
async function fetchData(){
  
  try {
    const response = await fetch(("http://localhost:3000/peopleShares")); 
    const secondResponse = await fetch (("http://localhost:3000/randomShares"))
    if (!response.ok) {
      throw new Error("failed to fetch")
    }
    const ranData = await secondResponse.json(); 
    const data = await response.json(); 
    const length = data.length; 

    var col = []; 

    for(var key in data){
      if(col.indexOf(key) == -1){
        col.push(key);
      }
    }


    var table = document.createElement("table"); 
    var tr = table.insertRow(-1); 

    var th = document.createElement("th"); 
    th.innerHTML = "Number of People"; 
    tr.appendChild(th); 
    for(var i = 0; i < col.length; i++){
      var th = document.createElement("th"); 
      th.innerHTML = "person " + col[i]; 
      tr.appendChild(th); 

    }

    tr = table.insertRow(-1); 
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = "person's unique shares"; 

    for(var i = 0; i < data.length; i++){
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i].shares; 
    }

    tr = table.insertRow(-1); 
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = "Shares distributed"; 

    for(var i = 0; i < ranData.length; i++){
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = ranData[i].shares; 
    }

    var divContainer = document.getElementById("showTable"); 
    divContainer.innerHTML = ""; 
    divContainer.appendChild(table); 

    var heading = document.getElementById("salAvg"); 
    var heading1 = document.getElementById("salSum"); 
    heading1.textContent = "Sum of Secret Shares = " + ranData[length].sum;
    heading.textContent = "Average = " + ranData[length].avg;
    
    //console.log(ranData[length].avg); 
  } catch (error) {
   console.error(error);
  }
  setTimeout(getSalary(), 1000 * 60);


};

async function getSalary(){
  try {
    const response = await fetch(("http://localhost:3000/peopleShares")); 
    if (!response.ok) {
      throw new Error("failed to fetch")
    }
    const data = await response.json(); 
    var col = []; 

    for(var key in data){
      if(col.indexOf(key) == -1){
        col.push(key);
      }
    }


    var table = document.createElement("table"); 
    var tr = table.insertRow(-1); 
    var th = document.createElement("th"); 
    th.innerHTML = "Number of People"; 
    tr.appendChild(th);

    for(var i = 0; i < col.length; i++){
      var th = document.createElement("th"); 
      th.innerHTML = "person " + col[i]; 
      tr.appendChild(th); 

    }

    tr = table.insertRow(-1); 
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = "Salary"; 

    for(var i = 0; i < data.length; i++){
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i].salary; 
    }

    var divContainer = document.getElementById("salaryTable"); 
    divContainer.innerHTML = ""; 
    divContainer.appendChild(table); 



  } catch (error) {
    console.error(error); 
  }
}
btnEL.addEventListener('click',fetchData);
//form.addEventListener("submit", fetchData); 