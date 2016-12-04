session = sessionStorage.getItem('key');

if (session === "ok")
{
var board = angular.module('AppBoard', []);

board.controller('ControllerBoard', ['$scope', function($scope){
	$scope.empleados = json;
	$scope.data      = [];
	$scope.active    = 1;
	$scope.file      = "./tmpl/dash.html";

	//==========================================//
	
	$scope.searchUser = function(value)
	{
		var outList = new Array();
		$scope.search  = $('#search').val();
		$scope.search = ($scope.search).toLowerCase();
		for(index in json)
		{
			_aux = json[index];
			_aux.name = (_aux.name).toLowerCase();
			if (_aux.name.indexOf($scope.search) >= 0)
			{
				outList.push(_aux);
			}
		}

		if (outList.length === 0)
		{
			$scope.msg = "La busqueda de \" " + $scope.search + " \" no genero ningun resultado ... "; 
			$('table').hide('fast', function(){
				$('#error').slideDown('slow');
			});
		}
		else
		{
			$scope.msg = ""; 
			$('table').show('fast', function(){
				$('#error').slideUp('slow');
			});
		}

		$scope.empleados = outList;
	}

	//==========================================//

	$scope.question = function(data)
	{
		$scope.contacto = "N° " + data.num + " : " + data.name;
		$scope.data     = data;
	}
	
	//==========================================//
	
	$scope.empleadosAction = function(opt)
	{
		var d     = 21;
		var count = 0; 
		var v     = 0;
		var salida = {'f':0,'a':0};
		for (key in $scope.empleados)
		{
			aux = $scope.empleados[key].asistencia;
			v  = ($scope.empleados[key].status === 2) ? (v+1) : v;
			f  = aux.f;
			a  = aux.asistencia
			r1 = (f * 100) /d;
			r2 = (a * 100) /d;
		    salida.f += r1;
		    salida.a += r2;
			count++;
		}

		salida.f = salida.f/count;
		salida.a = salida.a/count;

		switch(opt)
		{
			case 1:
				return (isNaN(salida.f)) ? 0 : salida.f;
			break;
			case 2:
				return (isNaN(salida.a)) ? 0 : salida.a;
			break;
			case 3:
				return v;
			break;
		}
	}

	//==========================================//

	$scope.borrarUser = function()
	{

		var position = json.indexOf($scope.data);
		if (position >= 0)
		{
			json.splice(position,1);
			$scope.search = "";
			$scope.empleados = json;
			$scope.action = "El emplado " + $scope.contacto + " Fue eliminado satisfatoriamente ...";
			$scope.data = {};
			hidden('#success');
		}
	}

	//==========================================//

	$scope.editar = function(data)
	{
		$scope.data = data;
		$scope.flag = true;
		localStorage.setItem("edit", "edit");
		$scope.loadTmp('new_user' , 2);
	}

	//==========================================//

	$scope.loadTmp = function(file, m)
	{
		var url = "./tmpl/";
		$scope.file = url  + file + ".html";
		$scope.active = m;
	}

	//==========================================//

	$scope.salir = function()
	{
		sessionStorage.setItem('key', '4654544564f65sd');
		window.location.href = "../";
	}

	//==========================================//


	function hidden(selector)
	{
		$(selector).slideDown();
		var t = setInterval(function(){
     		$(selector).slideUp();
			clearInterval(t);
		}, 3000);
	}
}]);
}
else
{
	window.location.href = "../";
}