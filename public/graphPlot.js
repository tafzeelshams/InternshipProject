window.onload=function(){
  var getD5min=document.getElementById('5_min');
  var getD15min=document.getElementById('15_min');
  var live=document.getElementById('Live');
  getD5min.addEventListener('click',getByMinute5);
  getD15min.addEventListener('click',getByMinute15);
  live.addEventListener('click',goLive);
}


var v1 = []


function formatData(dataArray) {
  var timeList =[], valueList=[];
  for(var i = 0; i < dataArray.length; i++) {
    timeList[i] = dataArray[i].Time;
    valueList[i] = dataArray[i].Value;
  }
  jsonArray = [timeList, valueList];
  console.log("in FormatData()...\n");
  //console.log(jsonArray);
  return jsonArray;
}


function initialCall(){
  const xhr = new XMLHttpRequest();
    
  //xhr.open('GET','https://reqres.in/api/users');
  
  xhr.open('GET','http://localhost:3001/api/init');
  xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    var jsonArr = formatData(data);
    console.log(jsonArr);
    initGraph(jsonArr);
  }
  xhr.send();
}


function goLive(){
  clearInterval(v1);
  const xhr = new XMLHttpRequest();
    
  //xhr.open('GET','https://reqres.in/api/users');
  
  xhr.open('GET','http://localhost:3001/api/init');
  xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    var jsonArr = formatData(data);
    console.log(jsonArr);
    initGraph(jsonArr);
  }
  xhr.send();
}


function initGraph(jsonArr){
  console.log(jsonArr);
  var timeArr = jsonArr[0];
  var dataArr = jsonArr[1];
  console.log(timeArr);
  console.log(dataArr);
  var trace1 = {
    x: timeArr,
    y: dataArr,
    mode: 'lines',
    fill: 'tozeroy',
    type: 'scatter'
  };
  var data = [trace1];

  var layout = {
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

  //////////
  v1 = setInterval(callApi, 5000);
    

  function callApi(){
    const xhr = new XMLHttpRequest();
  
    //xhr.open('GET','https://reqres.in/api/users');
    
    xhr.open('GET','http://localhost:3001/api/seconds/5');
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
}



function getByMinute5(){
  console.log("Hello5");
  const xhr = new XMLHttpRequest();
  
    //xhr.open('GET','https://reqres.in/api/users');
    
  xhr.open('GET','http://localhost:3001/api/seconds/300');
  xhr.onload = () => {
    const dataApi = JSON.parse(xhr.response);
    var jsonArr = formatData(dataApi);
    console.log(jsonArr);
    ///
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
        title: "time"
      },
      legend: {
        y: 0.5,
        traceorder: 'reversed',
        font: {size: 16},
        range: [0,100],
        yref: 'paper'
      }
    };
    Plotly.newPlot('graphDiv', data, layout);
  }
  xhr.send();
}

function getByMinute15(){
  console.log("Hello15");
  const xhr = new XMLHttpRequest();
  
    //xhr.open('GET','https://reqres.in/api/users');
    
  xhr.open('GET','http://localhost:3001/api/seconds/1500');
  xhr.onload = () => {
    const dataApi = JSON.parse(xhr.response);
    var jsonArr = formatData(dataApi);
    console.log(jsonArr);
    ///
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
  }
  xhr.send();
}