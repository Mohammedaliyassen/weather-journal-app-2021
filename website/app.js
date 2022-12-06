    /* Global Variables */

const api = 'http://api.openweathermap.org/data/2.5/weather?zip='; 
const apiKey = '&appid=106c121413715c06078a3b7267751139';
let keyCode = document.querySelector('input');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'-'+ d.getDate()+'-'+ d.getFullYear();
//add Event Listener to click 
document.getElementById('generate').addEventListener('click',()=>{
    
    getInfo(api,keyCode.value,apiKey)
        .then(function ( mydate ){
        postData('/postData',{info1:mydate.main.temp - 273 ,city: mydate.name});
        const info1 = mydate.main.temp - 273;
        document.getElementById('city').innerHTML = mydate.name;
        //reading Temp info and add style 
        if(info1.toFixed(2)<= 20 ){
        document.getElementById('temp').style.textShadow = '-2px 1px 5px #00d0ff';
        document.getElementById('temp').innerHTML = 
            info1.toFixed(2)+'° C ' + '<img src="clouds.png" style="position: absolute;">';}
        else{
            document.getElementById('temp').style.textShadow = '-2px 1px 5px red';
            document.getElementById('temp').innerHTML = 
                info1.toFixed(2)+'° C ' + '<img src="sun.png" style="position: absolute;">';}
        //reading Data info
        
        document.getElementById('date').innerHTML = newDate;
        //reading Feeling info
        const feeling = document.querySelector('textarea') ;
        document.getElementById('content').innerHTML ='i feel like : ' + feeling.value; 
    });
});
//function to get data from api 
const getInfo = async (url,keyCode,apiKey)=>{
    const response = await fetch(url+keyCode+apiKey);
    try{
        const mydate = await response.json();
        console.log(mydate);
        return mydate;
        
    } catch(error){
        alert('your error is :'+error);
        console.log('your error is :'+error);
    }
}
//function to save the data from api
const postData = async ( url, data = {})=>{
    console.log(data);
      const response = await fetch('/postData' , {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
//turn data to json
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      alert('your error is :'+error);
      console.log("error", error);
      }
  }
