
var user = {name: "tejasmarbartholemew", 
            salary: 12000
            };


function xmlFunction(cFunction) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlFullDoc = this.responseXML;
      var users = xmlFullDoc.getElementsByTagName("user");
      var xmlDoc;
      for(element of users){
        if (element.getAttribute("username") == user.name){
          xmlDoc = element;
        }
      }
      if (!xmlDoc){
        console.log("WRONG USERNAME");

      }
      else{
        cFunction(xmlDoc);
      }
    }
 };
  xhttp.open("GET", "data.xml", true);
  xhttp.send();
}

function xmlFunctionRaw(cFunction) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
      cFunction(this);
      
    }
  };
  xhttp.open("GET", "data.xml", true);
  xhttp.send();
}

function xmlTransactionHistory(xmlDoc) {


    var amounts = xmlDoc.getElementsByTagName("amount");
    var categories = xmlDoc.getElementsByTagName("category");
    var time = xmlDoc.getElementsByTagName("time");

    for (var i = 0 ; i < amounts.length; i++){
      console.log(i);

      var newRow = document.createElement("tr");

      var newTime = document.createElement("td");
      var timeDate = new Date(Number(time[i].childNodes[0].nodeValue));
      var newTimeText = document.createTextNode(timeDate.toDateString());
      newTime.appendChild(newTimeText);
      newRow.appendChild(newTime);
      
      var newCat = document.createElement("td");
      var newCatText = document.createTextNode(categories[i].childNodes[0].nodeValue);
      newCat.appendChild(newCatText);
      newRow.appendChild(newCat);

      var newAmt = document.createElement("td");
      var newAmtText = document.createTextNode(amounts[i].childNodes[0].nodeValue);
      newAmt.appendChild(newAmtText);
      newRow.appendChild(newAmt);
      
      document.getElementById("tableHist").appendChild(newRow);
    }
  
}

function xmlBalance(xmlDoc){//CALCULATES THE BALANCE

  var balance = 0;
  var transactions = xmlDoc.getElementsByTagName("amount");
  for (payment of transactions){
    balance += Number(payment.childNodes[0].nodeValue);
  }
  document.getElementById("balanceDisplay").innerHTML = "$" + balance.toFixed(2);
}

function xmlTransaction(xml){
  var xmlDoc = xml.responseXML;

  var category = document.getElementById("category").value;
  var amount = document.getElementById("amount").value;
  var sign = document.getElementById("transactionSign").value;//GETTING VALUES FROM FORM
  var date = document.getElementById("date").value;

  var timeEntered = Number(Date.now());//standardizing dates for xml
  var date = Number(Date.UTC(date));
  //PROCESSING DATA INTO VARIABLES GOING INTO XML DOC
  if (sign == "pos"){
    amount = Math.abs(Number(amount)).toFixed(2);
  }
  else if (sign == "neg"){
    amount = -1 * Math.abs(Number(amount)).toFixed(2);
  }


  console.log(category + ", $" + amount + ", " + timeEntered + "," + date);
  //PUT INTO HTML
  
  var newRow = document.createElement("tr");

  var newTime = document.createElement("td");
  var timeDate = new Date(Number(date));
  var newTimeText = document.createTextNode(timeDate.toDateString());
  newTime.appendChild(newTimeText);
  newRow.appendChild(newTime);
  
  var newCat = document.createElement("td");
  var newCatText = document.createTextNode(category);
  newCat.appendChild(newCatText);
  newRow.appendChild(newCat);

  var newAmt = document.createElement("td");
  var newAmtText = document.createTextNode(amount);
  newAmt.appendChild(newAmtText);
  newRow.appendChild(newAmt);
  
  console.log("HAHFAHH: " + amount);

  document.getElementById("tableHist").appendChild(newRow);


  //NEXT PUT IN XML
  //Creating all the elements and values to be combined
  /*transactionElement = xmlDoc.createElement("transaction");

  amountElement = xmlDoc.createElement("amount");
  amountValue = xmlDoc.createTextNode(amount.toString());//processing amount of $$
  amountElement.appendChild(amountValue);
  
  categoryElement = xmlDoc.createElement("category");//processing category
  categoryValue = xmlDoc.createTextNode(category);
  categoryElement.appendChild(categoryValue);

  timeElement = xmlDoc.createElement("time");//processing time purchase was made
  timeValue = xmlDoc.createTextNode(date);
  timeElement.appendChild(timeValue);

  timeEntElement = xmlDoc.createElement("time-entered");//processing time the data was entered
  timeEntValue = xmlDoc.createTextNode(timeEntered);
  timeEntElement.appendChild(timeEntValue);

  transactionElement.appendChild(amountElement);//Combining all
  transactionElement.appendChild(categoryElement);
  transactionElement.appendChild(timeElement);
  transactionElement.appendChild(timeEntElement);

  var users = xmlDoc.getElementsByTagName("user");
  var ourUser;
  for(element of users){
    if (element.getAttribute("username") == user.name){
      ourUser = element;
    }
  }
  if (ourUser){
    var transactions = ourUser.getElementsByTagName("transactions");
    transactions[0].appendChild(transactionElement);
  }

*/
}

function xmlMonthlyValues(xmlDoc){//Shows the income and expenses for the last 30 days
  var moneyMovements = xmlDoc.getElementsByTagName("amount");
  var time = xmlDoc.getElementsByTagName("time");
  var spent = 0;
  var earned = 0;
  var currentTime = Number(Date.now());
  var thirtyDaysInMillis = (30 * 24 * 60 * 60 * 1000);
  for (var i = 0; i < moneyMovements.length; i++){
    var timeDate = (Number(time[i].childNodes[0].nodeValue));
    console.log(currentTime + " " + thirtyDaysInMillis + " , " + timeDate);
    if(thirtyDaysInMillis >= currentTime - timeDate){
      var amt = Number(moneyMovements[i].childNodes[0].nodeValue);
      if(amt > 0){
        earned += amt;
      }
      else if (amt < 0){
        spent += amt;
      }
    }
  }
  document.getElementById("monthInDisplay").innerHTML = "$" + earned.toFixed(2);
  document.getElementById("monthExDisplay").innerHTML = "$" + Math.abs(spent).toFixed(2);
}

function xmlTips(xmlDoc) {

  var categoryList = xmlDoc.getElementsByTagName("category");
  var amountList = xmlDoc.getElementsByTagName("amount")
  var totals = {
    food: 0,
    shopping: 0,
    travel: 0,
    social: 0,
    event: 0,
    moneyReceived: 0
  };

  for(var x = 0; x < categoryList.length; x++) {

    if(categoryList[x] == "Food")
      totals.food += amountList[x];
    else if(categoryList[x] == "Shopping")
      totals.shopping += amountList[x];
    else if(categoryList[x] == "Travel")
      totals.travel += amountList[x];
    else if(categoryList[x] == "Social")
      totals.social += amountList[x];
    else if(categoryList[x] == "Event")
      totals.event += amountList[x];
    else if(categoryList[x] == "Money Received")
      totals.moneyReceived += amountList[x];

  }

  var totalsArray = [totals.food, totals.shopping, totals.travel, totals.social, totals.event, totals.moneyReceived];
  var max = 0;
  for(var i = 0; i < totalsArray.length; i++){

    if(totalsArray[i] > max)
      max = totalsArray[i];

  }
  if(max == totals.food)
    document.getElementById("tip1").innerHTML = "Try to reduce spending on food";
  else if(max == totals.shopping)
    document.getElementById("tip1").innerHTML = "Try to reduce spending to only necessities";
  else if(max == totals.travel)
    document.getElementById("tip1").innerHTML = "Try to either change modes of travel to a cheaper alternative";
  else if(max == totals.social)
    document.getElementById("tip1").innerHTML = "Try to reduce spending on social activities";
  else if(max == totals.event) 
    document.getElementById("tip1").innerHTML = "Try to reduce spending on your events";


} 
