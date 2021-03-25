const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.login = async(req,res) => {
	try{
		const {username, password} = req.body;
		if(!username || !password) {
			return res.status(400).render('login',{
				message: "Please provide an email and password"
			})
		}
		db.query('SELECT * from users WHERE username = ?', [username], async(error,results) => {
			/*
			let hashedPassword = await bcrypt.hash(password,8);
			console.log(hashedPassword);
			*/
			if(results.length===0 || !(await bcrypt.compare(password,results[0].password))) {
				res.status(401).render('login', {
					message: 'Username or password is Incorrect'
				});
			} else {
				//valid user
				res.status(200).render('graph', {
					user: username
				});
			}
		})
	} catch (error) {
		console.log(error);
	}
}

exports.register = async(req,res) => {
	try{
		const {username, password, confirmPassword} = req.body;
		if(!username || !password || !confirmPassword) {
			return res.render('register',{
				message: "Form Incomplete"
			})
		} else if(password !== confirmPassword) {
			return res.render('register',{
				message: "Password and Confirm Password does not match"
			})
		}
		db.query('SELECT * from users WHERE username = ?', [username], async(error,results) => {
			if(results.length>0) {
				res.render('register', {
					message: 'Username already exist'
				});
			} else {
				//valid user
				let hashedPassword = await bcrypt.hash(password,8);
				//console.log(hashedPassword);
				db.query('INSERT INTO users SET ?',{username: username, password:hashedPassword}, (error, results) => {
					if(error){
						console.log(error);
					} else {
						res.render('register', {
							success: 'Registration Succesful'
						});
					}
				})
			}
			
		})
	} catch (error) {
		console.log(error);
	}
}