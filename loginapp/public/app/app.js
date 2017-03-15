angular.module('userApp',['appRoutes','userControllers','mainController','userServices','authServices'])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});
