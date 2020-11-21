var distance, axisTitles;
function setup(){
  var canvas = createCanvas(400, 400);
  canvas.parent("Graph");
  background(50,50,50);
  stroke(255);
  distance = 30;
  axisTitles = {
    x: "Time",
    y: "Money ($)"
  }

  xmlFunction(graphTotalVsTime);
}

function draw(){
  line(distance, canvas.height-distance, distance, distance);
  line(distance, canvas.height-distance, canvas.width-distance, canvas.height-distance); 
}

function graphTotalVsTime(xmlDoc){/*
  var amounts = xmlDoc.getElementsByTagName("amount");
  var times = xmlDoc.getElementsByTagName("time");
  var days = times * 1 / (1000 * 60 * 60 * 24);
  var axisWidth = canvas.width - 2 * distance;
  var timeWidth = maximum(times) - minimum(times);
  var coeff = axisWidth/timeWidth;
  for (var i = 1; i < amounts.length; i++){
    
    var time = Number(times[i]);
    var amount = Number(amounts[i]);
    console.log(time-minimum(times)+ " , " + amount*2+ " , " + Number(times[i-1])-minimum(times)+ " , " + Number(amount[i-1])*2);
    line(time-minimum(times), amount*2, Number(times[i-1])-minimum(times), Number(amount[i-1])*2);
  }*/
}

function maximum(array){
  var max = -Infinity;
  for (i of array){
    if (Number(i) > max){
      max = Number(i);
    }
  }
  return max;
}

function minimum(array){
  var min = Infinity;
  for (i of array){
    if (Number(i) < min){
      min = Number(i);
    }
  }
  return min;
}
