var express= require('express');
var app=express();
var port= process.env.PORT || 8070;
var morgan=require('morgan');
var mongoose =require('mongoose');
var bodyParser = require('body-parser');
var router=express.Router();
var appRoutes= require('./app/routes/api')(router);
var path=require('path');




app.use(morgan('dev'));


//parse the data to json
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//to have access of all front end files
app.use(express.static(__dirname +'/public'));
app.use('/api',appRoutes);


mongoose.connect('mongodb://localhost:27017/tutorial',function(err){
	if(err){
		console.log("not connected:"+err);

	}else{
		console.log("connected");
	}
});

app.get('*', function(req,res){

	//providing the path
	res.sendFile(path.join(__dirname +'/public/app/views/index.html'));
});



app.listen(port,function(){
	console.log("running the server on port" + port);
});

