var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret="hi";

module.exports=function(router){


//saving to the database
//user regestration
router.post('/users', function(req, res){
var user= new User();
user.username=req.body.username;
user.email=req.body.email;
user.password=req.body.password;
if(req.body.username==null || req.body.username==''||req.body.email==null || req.body.email==''||req.body.password==null || req.body.password=='')
{
res.json({success:false, message:"ensure email,pass provided"});
}else{
	user.save(function(err){
		if(err){
			res.json({success:false, message:"username or email already exits"});
		}else{
			res.json({success:true, message: "user created"});
		}
	});
}
});

//login regestration
router.post('/authenticate', function(req, res){
User.findOne({username: req.body.username}).select("email username password").exec(function(err,user){
	if(err) throw err;

	if(!user){
		res.json({success:false,message: 'could not authenticate user'});
	}else if(user){
		if(req.body.password){
		var validPassword=user.comparePassword(req.body.password);
		} else{
res.json({success:false,message: 'password not provided'});
}
			if(!validPassword){
			res.json({success:false,message: 'could not authenticate password'});
		}else{

			
			var token=jwt.sign({username:user.username, email:user.email } ,secret,{ expiresIn:'24h'});
			
			res.json({success:true , message: "user authenticated" ,token:token});
		}
	}
	
});
});

router.use(function(req,res,next){
	var token=req.body.token || req.body.query || req.headers['x-access-token'];

	if(token){
		jwt.verify(token,secret,function(err,decoded){
		if(err){
			res.json({success:false, message:" token invalid"});
		}else{
			req.decoded=decoded;
			next();
		}
	});
	}else{

		res.json({success:false, message:"no token provided"});

	}

});


router.post('/me', function(req,res){
	res.send("tresting me route");
});
return router;
}
