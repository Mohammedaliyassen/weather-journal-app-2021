
// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const myPort = 8080;
const server = app.listen(myPort, ()=>{
    console.log('your server is runing in http://localhost:'+myPort);
});

//save my data to use it later
app.post('/postData',savaData);

function savaData(req,res){
    projectData.city = req.body.city;
    projectData.data = req.body.date;
    projectData.content = req.body.content;
    projectData.temp = req.body.info1.toFixed(2);
    console.log(projectData);
}
app.get('/postData',(req,res)=>{
    res.send(projectData);
})