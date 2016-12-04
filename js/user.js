board.controller('userController',['$scope', function($scope){

	date = new Date();
	var flag = false;
	if (localStorage.getItem("edit") === "edit")
	{
		$scope.entity = $scope.data;
		$scope.action = "Edicion de empleado";
		localStorage.setItem("edit", "no-edit");
		flag = true;
	}
	else
	{
		$scope.entity = {
						"num"  : ($scope.empleados.length) + 1001,
						"name" : "",
						"edad" : "",
						"sexo" : "",
						"turno": "",
						'addr' : {
								 	'col'    : "",
								 	'calle' : "",	
								 	'mun'    : "",
								 	'num'    : "",
								 	'cp'     : "",
								 	'estado' : ""	
						    	},
						'puesto'   : "",
						'grupo'    : "",
						'salario'  : "",
						'pagadora' : "",
						'foto'     : "empleado_" + Math.floor((Math.random() * 5) + 1) + ".png",
						'estudio'  : "",
						'tel'      : "",
						'cel'      : "",
						'email'    : "",
						'depto'    : "",
						'emergencia' : {'t' : '' , 'n' : ""},
						'datIngreso' : date.getDay() + "-" + (date.getMonth()+1) + "-" + date.getFullYear(),
						'datBaja'    : "00-00-00",
						'status'     : 1,
						'asistencia' : {'f' : 0, 
										'asistencia' : 0}
						};
		$scope.action = "Alta de empleado";
	}

	$scope.validForm = function(formulary)
	{
		var cont  = 0;
		for (index in formulary)
		{
			if (index.indexOf('$') < 0)
			{
				_aux    = formulary[index];
				_element = $("[name="+index+"]");
				//console.log(_aux);
				if (!_aux.$valid)
				{
					(cont === 0) ? _element.focus() : '';
					_element.parent().parent().addClass('has-error');
					cont++;
				}
				else
				{
					_element.parent().parent().removeClass('has-error');
				}
				if (index === 'email')
				{
					valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_aux.$viewValue);
					if (!valid)
					{
						_element.parent().parent().addClass('has-error');
						(cont === 0) ? _element.focus() : '';
						cont++;
					}
					else
					{
						_element.parent().parent().removeClass('has-error');
					}
				}
			}
		}

		if (cont > 0)
		{
			$('#error').slideDown('slow');
		}
		else
		{
			if (flag)
			{
				var position = json.indexOf($scope.data);
				json[position] = $scope.data;
			}
			else
			{
				json.push($scope.entity);
			}
			$scope.empleados = json;
			$('#ok').slideDown('slow');
			$scope.resetForm(formulary);
		}
	}

	//========================================//

	$scope.resetForm = function(formulary)
	{
		v = setInterval(function(){
			$('#ok').slideUp('slow');
			$('div.has-error').removeClass('has-error');
			$('#error').slideUp('slow');
			$('#r1').click();
			if (!flag)
			{
				$('#r2').click();
			}
			
			clearInterval(v);
		},500);
		$scope.file      = "./tmpl/new_user.html&p=0";
	}


	$('input[name=cel]').mask('(99)-99-99-99-99', {placeholder: ""}, {reverse: true});
	$('input[name=tel]').mask('(99)-99-99-99-99', {placeholder: ""}, {reverse: true});
	$('input[name=emergenciat]').mask('(99)-99-99-99-99', {placeholder: ""}, {reverse: true});
	$('input[name=name]').validField(onlyText + ' ');
	$('input[name=edad]').validField(onlyNum);
	$('input[name=email]').validField(onlyText + onlyNum + email);
	$('input[name=emergencian]').validField(onlyText + ' ');
	$('input[name=addr-cp]').validField(onlyNum);
	$('input[name=addr-col]').validField(onlyText + ' ');
	$('input[name=addr-mun]').validField(onlyText + ' ');
	$('input[name=addr-num]').validField(onlyNum + ' ');
	$('input[name=pago]').validField(onlyNum + '.');
	$('input[name=name]').focus();
}]);