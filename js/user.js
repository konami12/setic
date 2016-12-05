board.controller('userController',['$scope', '$templateCache', function($scope, $templateCache){
$templateCache.removeAll();
	date = new Date();
	var flag = false;
	$scope.repaetData = "";
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
											'asistencia' : 0},
						    'banco'  : "",
						    'clave'  : "",
						    'bcuenta' : ""
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
					_element.parent().parent().parent().addClass('has-error');
					_element.next().next().addClass('fa-times-circle');
					cont++;
				}
				else
				{
					_element.parent().parent().parent().removeClass('has-error');
					_element.next().next().removeClass('fa-times-circle');
				}
				if (index === 'email')
				{
					valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(_aux.$viewValue);
					if (!valid)
					{
						_element.parent().parent().parent().addClass('has-error');
						_element.next().next().addClass('fa-times-circle');
						(cont === 0) ? _element.focus() : '';
						cont++;
					}
					else
					{
						_element.parent().parent().parent().removeClass('has-error');
						_element.next().next().removeClass('fa-times-circle');
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

			email   = $scope.entity.email;
			phone   = $scope.entity.tel;
			celular = $scope.entity.cel;
			cuenta  = $scope.entity.bcuenta;
			inter   = $scope.entity.clave;
			msg     = "";
			msg0    = "";
			msg1    = "";
			msg2    = "";
			msg3    = "";
			msg4    = "";

			for (i in json)
			{
				aux = json[i];
				if (flag)
				{
				}
				else
				{
					if (aux.email === email)
					{
						msg0 = 'Corre electronico, ';
						$('#i2').addClass('fa-times-circle');
						$('#i2').parent().parent().parent().addClass('has-error');
					}
					else
					{
						$('#i2').removeClass('fa-times-circle');
						$('#i2').parent().parent().parent().removeClass('has-error');
					}
					if (aux.tel === phone)
					{
						msg1 = 'Numero telefonico , ';
						$('#i0').addClass('fa-times-circle');
						$('#i0').parent().parent().parent().addClass('has-error');
					}
					else
					{
						$('#i0').removeClass('fa-times-circle');
						$('#i0').parent().parent().parent().removeClass('has-error');
					}
					if (aux.cel === celular)
					{
						msg2 = 'Celular, ';
						$('#i1').addClass('fa-times-circle');
						$('#i1').parent().parent().parent().addClass('has-error');
					}
					else
					{
						$('#i1').removeClass('fa-times-circle');
						$('#i1').parent().parent().parent().removeClass('has-error');
					}
					if (aux.bcuenta === cuenta)
					{
						msg3 = 'Clave interbancaria, ';
						$('#i4').addClass('fa-times-circle');
						$('#i4').parent().parent().parent().addClass('has-error');
					}
					else
					{
						$('#i4').removeClass('fa-times-circle');
						$('#i4').parent().parent().parent().removeClass('has-error');
					}
					if (aux.clave === inter)
					{
						msg4 = 'Cuenta bancaria';
						$('#i3').addClass('fa-times-circle');
						$('#i3').parent().parent().parent().addClass('has-error');
					}
					else
					{
						$('#i3').removeClass('fa-times-circle');
						$('#i3').parent().parent().parent().removeClass('has-error');
					}
				}
			}				

			msg= msg1+msg2+msg0+msg3+msg4;

			if (msg != '')
			{
				$scope.repaetData = msg;
				$('#error2').slideDown('slow');
			}
			else
			{
				$('#error2').slideUp('slow');
				$('.input-icon i').removeClass('fa-times-circle');
				$('div.has-error').removeClass('has-error');
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
	$('input[name=salario]').validField(onlyNum + '.');
	$('input[name=name]').focus();
}]);