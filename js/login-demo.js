var login = angular.module('login', []);

login.controller('LoginController', ['$scope', function($scope){

	$scope.username = "";
	$scope.password = "";
	$scope.msg      = "";

	$scope.frmLogin = function()
	{	
		var request = false;
		if ($scope.username == '' || $scope.password == '')
		{
			hidden();
			$scope.msg   = "Introduce tu usuario y password";
			$scope.error = 'has-error';
			$scope.alert = 'alert-danger';
		}
		else
		{
			if ($scope.username == "demo1" && $scope.password == "demo1")
			{
				hidden();
				$scope.alert = 'alert-success';
				$scope.error = 'has-success';
				$scope.msg = "Accediendo"; 
				sessionStorage.setItem('key', 'ok');
				setInterval(function(){
					window.location = window.location.href + "pages";
				},1500);
			}
			else
			{
				hidden();
				$scope.error = 'has-error';
				$scope.alert = 'alert-danger';
				$scope.msg   = "Usuario incorrecto"; 
			}
		}
	}

	function hidden()
	{
		$("#alert").slideDown();
		var t = setInterval(function(){
     		$("#alert").slideUp();
			clearInterval(t);
		}, 5000);
	}

}]);