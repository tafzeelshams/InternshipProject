const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const mysqlConnection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

router.get('/init',(req,res) =>{
	mysqlConnection.query("SELECT * from timeValue", function(err, rows, fields) {
		if(err) throw err;
		//console.log(rows);
		res.send(rows);
	});
});

router.get('/seconds/:second',(req,res) =>{
	mysqlConnection.query(`SELECT * from timeValue WHERE time > current_timestamp-${req.params.second}`, function(err, rows, fields) {
		if(err) throw err;
		res.send(rows);
	});
});

router.get('/rangeQuery/:startTime/:endTime',(req,res) =>{
	//http://localhost:3001/api/rangeQuery/2021-04-01T12:07:27.000Z/2021-04-01T12:08:07.000Z
	mysqlConnection.query('SELECT * from timeValue WHERE time > CONVERT_TZ (?, "+00:00","+05:30") AND time < CONVERT_TZ (?, "+00:00","+05:30")',[req.params.startTime, req.params.endTime], function(err, rows, fields) {
		if(err) throw err;
		res.send(rows);
	});
});

router.get('/deleteRow/:time',(req,res) =>{
	//http://localhost:3001/api/rangeQuery/2021-04-01T12:07:27.000Z/2021-04-01T12:08:07.000Z
	mysqlConnection.query('DELETE from timeValue WHERE time = CONVERT_TZ (?, "+00:00","+05:30")',[req.params.time], function(err, rows, fields) {
		if(err) throw err;
		res.send(rows);
	});
});
module.exports = router;