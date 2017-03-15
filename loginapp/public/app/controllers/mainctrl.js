angular.module('mainController',['authServices'])

.controller('mainctrl',function(Auth,$timeout,$location,$rootScope){

var app=this;

$rootScope.$on('$routeChangeStart',function(toState){
	if(toState.authenticate && toState.name !=='login' && !$rootScope.isLoggedIn()){
		event.preventDefault();
		$state.transition('/');

	}


if(Auth.isLoggedIn()){
	console.log('success: user is logged in');
		app.isLoggedIn=true;


	Auth.getUser().then(function(data){
		console.log(data.data.username);
		app.username=data.data.username;
	});
}else{
	console.log('Failure: user is not logged in');
	app.isLoggedIn=false;
	app.username='';
}

});


this.doLogin=function(loginData){
		app.errorMsg=false;


		Auth.login(app.loginData).then(function(data){
			if(data.data.success){
				app.loading=false;
				app.successMsg=data.data.message;
				$timeout(function(){
					$rootScope.isLoggedIn=true;
					$location.path('/profile');

					app.loginData='';
					app.successMsg=false;
				},1000);
			}else{

				
				app.errorMsg=data.data.message;
			}

		});
	
			};

			this.logout=function(){
				Auth.logout();
				$location.path('/logout');
				$timeout(function(){
					$location.path('/');
				},1000);
			};

});