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
			let hashedPassword = await bcrypt.hash(password,8);
			console.log(hashedPassword);
			if(!results || !(await bcrypt.compare(password,results[0].password))) {
				res.status(401).render('login', {
					message: 'Username or password is Incorrect'
				})
			} else {
				//valid user
				res.render('graph');
			}
		})
	} catch (error) {
		console.log(error);
	}
	/*
	//console.log(req.body);
	const username = req.body.username;
	const passwd = req.body.password;
	db.query('SELECT * from users WHERE username = ?', [username], (error, results) => {
		if(error){
			console.log(error);
		}
		
		if(results.length === 0 || results[0].password!==passwd){
			
			return res.render('login', {
				message: 'Username or password is Incorrect'
			});
		}
		else
		{
			res.send("graphPlot");
		}
		
	})
	//res.send("graphPlot");
	
	*/
}