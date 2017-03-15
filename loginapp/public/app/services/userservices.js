angular.module('userServices',[])

.factory('User',function($http){
	userFactory={};
//can access throughout app
userFactory.create=function(regData){
	return $http.post('/api/users',regData);
}
	return userFactory;
});
