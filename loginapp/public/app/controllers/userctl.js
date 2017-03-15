angular.module('userControllers',['userServices'])

.controller('regCtrl',function($http,$location,$timeout,User){

		var app=this;

this.regUser=function(regData){
		app.errorMsg=false;
		app.loading=true;

		User.create(app.regData).then(function(data){
			if(data.data.success){
				app.loading=false;
				app.successMsg=data.data.message;
				$timeout(function(){
					$location.path('/');
				},1000);
			}else{
				app.loading=false;
				app.errorMsg=data.data.message;
			}

		});
			};

});