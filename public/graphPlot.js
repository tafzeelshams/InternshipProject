window.onload=function(){
  var getD5min=document.getElementById('5_min');
  var getD15min=document.getElementById('15_min');
  var live=document.getElementById('Live');
  var getDrange=document.getElementById('plotRange');
  getD5min.addEventListener('click',plotLast5Minutes);
  getD15min.addEventListener('click',plotLast15Minutes);
  plotRange.addEventListener('click',plotByRange);
  live.addEventListener('click',goLive);
}


var v1 = []

/*
function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
*/

function formatData(dataArray) {
  var timeList =[], valueList=[];
  for(var i = 0; i < dataArray.length; i++) {
    //timeList[i] = convertTZ(dataArray[i].Time, "Asia/Kolkata")
    timeList[i] = dataArray[i].Time;
    valueList[i] = dataArray[i].Value;
  }
  jsonArray = [timeList, valueList];
  return jsonArray;
}


function callApi(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/seconds/5');
  xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    var arr = formatData(data);
    var update = {
          y: [arr[1]],
          x: [arr[0]]
      };
    if(arr[0].length==1)
    {
      Plotly.extendTraces('graphDiv', update, [0]);
      
    }
    console.log(arr);
  }
  xhr.send();
}


function goLive(){
  clearInterval(v1);
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/init');
  xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    var jsonArr = formatData(data);
    console.log(jsonArr);
    plotStaticGraph(jsonArr);
    v1 = setInterval(callApi, 5000);
  }
  xhr.send();
}



function plotLast5Minutes(){
  clearInterval(v1);
  console.log("Hello5");
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/seconds/500');
  xhr.onload = () => {
    const dataApi = JSON.parse(xhr.response);
    var jsonArr = formatData(dataApi);
    console.log(jsonArr);
    plotStaticGraph(jsonArr);
  }
  xhr.send();
}

function plotLast15Minutes(){
  clearInterval(v1);
  console.log("Hello15");
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/seconds/1500');
  xhr.onload = () => {
    const dataApi = JSON.parse(xhr.response);
    var jsonArr = formatData(dataApi);
    console.log(jsonArr);
    plotStaticGraph(jsonArr);
  }
  xhr.send();
}

function plotByRange(){ 
  var a=document.getElementById("startTime").value;
  var b=document.getElementById("endTime").value;
  var c;
  if (a!=undefined && a.length == 0 || a!=undefined && b.length == 0)
  { 
     alert("Fill start and end times");   
     return false; 
  }
  if (a > b)
  {
   alert("Start date should be before end date.");    
     return false; 
  } 
  console.log("Start Date "+a," End date "+b);  
     return true; 
}


function plotStaticGraph(jsonArr){
  var trace1 = {
      x: jsonArr[0],
      y: jsonArr[1],
      mode: 'lines',
      fill: 'tozeroy',
      type: 'scatter'
    };  

    var data = [trace1];

    var layout = {
      //height: 670,
      //width: 1440,
      title: "Value vs Time",
      yaxis: {
        linecolor: 'lightblue',
        linewidth: 2,
        mirror: true,
        range: [0,100],
        title: "Value"
      },
      xaxis: {
        linecolor: 'lightblue',
        linewidth: 2,
        mirror: true,
        title: "Time"
      },
      legend: {
        y: 0.5,
        traceorder: 'reversed',
        font: {size: 16},
        yref: 'paper'
      }
    };
    Plotly.newPlot('graphDiv', data, layout);
    console.log("New");
}