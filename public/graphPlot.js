window.onload=function(){
  var getD5min=document.getElementById('5_min');
  var getD15min=document.getElementById('15_min');
  var live=document.getElementById('Live');
  var getDrange=document.getElementById('plotRange');
  getD5min.addEventListener('click',plotLast5Minutes);
  getD15min.addEventListener('click',plotLast15Minutes);
  plotRange.addEventListener('click',plotByRange);
  live.addEventListener('click',goLive);
  goLive();
}


var v1 = []


function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}


function formatData(dataArray) {
  var timeList =[], valueList=[];
  for(var i = 0; i < dataArray.length; i++) {
    timeList[i] = convertTZ(dataArray[i].Time, "Asia/Kolkata")
    //timeList[i] = dataArray[i].Time;
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
  onlyLeft();
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
  both();
  console.log("Hello5");
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/seconds/500');
  xhr.onload = () => {
    const dataApi = JSON.parse(xhr.response);
    var jsonArr = formatData(dataApi);
    console.log(jsonArr);
    plotStaticGraph(jsonArr);
    feedTable(jsonArr);
  }
  xhr.send();
}

function plotLast15Minutes(){
  clearInterval(v1);
  both();
  console.log("Hello15");
  const xhr = new XMLHttpRequest();
  xhr.open('GET','/api/seconds/1500');
  xhr.onload = () => {
    const dataApi = JSON.parse(xhr.response);
    var jsonArr = formatData(dataApi);
    console.log(jsonArr);
    plotStaticGraph(jsonArr);
    feedTable(jsonArr);
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
  else if (a > b)
  {
   alert("Start date should be before end date.");    
     return false; 
  }
  else{
    clearInterval(v1);
    both();
    var timeStart = (new Date(a)).toISOString();
    var timeEnd = (new Date(b)).toISOString();  
    console.log("Start Time "+ timeStart," End time "+ timeEnd);
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`/api/rangeQuery/${timeStart}/${timeEnd}`);
    xhr.onload = () => {
      const dataApi = JSON.parse(xhr.response);
      var jsonArr = formatData(dataApi);
      console.log(jsonArr);
      plotStaticGraph(jsonArr);
      feedTable(jsonArr);
    }
    xhr.send();
    return true;
  } 
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
  //feedTable(jsonArr);
}

function onlyLeft(){
  console.log("onlyLeft");
  var x = document.getElementById("tableDiv");
  x.style.display = "none";
  var y = document.getElementById("graphDiv");
  y.style.width = "100%";  
}

function both(){
  console.log("both");
  var x = document.getElementById("tableDiv");
  x.style.display = "block";
  x.style.width = "30%";
  var y = document.getElementById("graphDiv");
  y.style.width = "70%";
}

function feedTable(jsonArr){
  var table = document.getElementById("tblBody");
  table.innerHTML = "";
  for (var i = 0; i < jsonArr[0].length; i++) {
    var row = document.createElement('tr');
    var cell1 = document.createElement('td');
    cell1.innerText=jsonArr[0][i];
    row.append(cell1);
    var cell2 = document.createElement('td');
    cell2.innerText=jsonArr[1][i];
    row.append(cell2);
    var cell3 = document.createElement('td');
    cell3.innerHTML='<button type="button" class = dltBtn onclick = deleteRow() >Delete</button>';
    row.append(cell3);
    table.append(row);
  }
}

function deleteRow()
{
  // event.target will be the input element.
  var td = event.target.parentNode;
  var tr = td.parentNode;// the row to be removed
  var timeCol = tr.children[0].innerText;
  console.log(timeCol);
  tr.parentNode.removeChild(tr);
  plotStaticGraph(sortByTime());
  var delTime = (new Date(timeCol)).toISOString();
  console.log(delTime);
  const xhr = new XMLHttpRequest();
  xhr.open('GET',`/api/deleteRow/${delTime}`);
  xhr.onload = () => {
    
  }
  xhr.send();
}

function getJsonArr(){
  var table= document.getElementById('tblBody');
  var obj = table.rows.item(0).cells;
  var timeArr = [];
  var valueArr = [];
  for(var i=0; i<table.rows.length; i++ ){
    var obj = table.rows.item(i).cells;
    timeArr.push(new Date(obj[0].innerText));
    valueArr.push(obj[1].innerText);
  }
  //console.log(timeArr);
  //console.log(valueArr);
  var jsonArr = [timeArr,valueArr];
  return jsonArr;
}


function sortByTime(){
  var jsonArr = getJsonArr();
    for(var i=0;i<jsonArr[0].length;i++){
        for(var j=0;j<jsonArr[0].length-i-1;j++){
            if(jsonArr[0][j]>jsonArr[0][j+1]){
                var temp=jsonArr[0][j];
                jsonArr[0][j]=jsonArr[0][j+1];
                jsonArr[0][j+1]=temp;
                temp=jsonArr[1][j];
                jsonArr[1][j]=jsonArr[1][j+1];
                jsonArr[1][j+1]=temp;
            }
        }
    }
    return jsonArr;
}

function feedTableTimeSorted(){
  feedTable(sortByTime());
}

function sortByValue(){
  var jsonArr = getJsonArr();
    for(var i=0;i<jsonArr[1].length;i++){
        for(var j=0;j<jsonArr[1].length-i-1;j++){
            if(parseInt(jsonArr[1][j])>parseInt(jsonArr[1][j+1])){
                var temp=jsonArr[1][j];
                jsonArr[1][j]=jsonArr[1][j+1];
                jsonArr[1][j+1]=temp;
                temp=jsonArr[0][j];
                jsonArr[0][j]=jsonArr[0][j+1];
                jsonArr[0][j+1]=temp;
            }
        }
    }
    return jsonArr;   
}

function feedTableValueSorted(){
  feedTable(sortByValue());
}