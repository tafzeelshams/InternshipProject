# Steps to run the application

***

### Step 1 : Setup Database
Create database using the schema provided in `./database/schema.sql`

---

### Step 2 : Edit Python3 programs for data feeding in `./database/feeder`
Edit the `databaseConnection.py` file according to the database created in above step (Line # : 6)

---

### Step 3 : Establish NodeJS application.
(Make Sure NodeJS is installed)
##### Execute these command on current directory
`npm init -y`
`npm i express mysql dotenv hbs bcryptjs`

##### Create .env file and update database details
DATABASE = <databaseName>
DATABASE_HOST = <hostName>
DATABASE_USER = <username>
DATABASE_PASSWORD = <password>

##### Start the NodeJS application by executing
`node app.js`

---

### Step 4 : Register User
Open `localhost/3001/register`
Fill in the details.

---

### Step 5 : Start feeding database
By executing `valueGenerator.py` file in `./database/feeder`

---

### Step 6 : Open `localhost/3001/`
Login to see the graph.

***
#### Note : the application is listening on port 3001, if port is unavailable the 3001 has to be replaced by available port no in file ./public/graphPlot.js