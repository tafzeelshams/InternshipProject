const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'})

/*
var mysql = require('mysql');
const path = require('path');
var cors = require('cors');
*/
const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect((err) => {
  if(!err)
  {
    console.log("Connected");
  }
  else
  {
    console.log("Connection Failed");
  }
});

//Define Routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/api',require('./routes/api'));
/*
const router = express.Router();


const mysqlConnection = require("./connection");

app.use(express.json());
app.use(cors());


app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api/init', (req, res) => {
	mysqlConnection.query("SELECT * from timeValue", function(err, rows, fields) {
    if(err) throw err;
    //var jsonArr = formatData(rows);
    res.send(rows);
    //res.send(jsonArr);
    //console.log(jsonArray);
  });
});

app.get('/api/seconds/:second', (req, res) => {
	mysqlConnection.query(`SELECT * from timeValue WHERE time > current_timestamp-${req.params.second}`, function(err, rows, fields) {
    if(err) throw err;
    //var jsonArr = formatData(rows);
    res.send(rows);
    //res.send(jsonArr);
    //console.log(jsonArray);
  });
});

*/

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
