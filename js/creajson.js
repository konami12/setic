
var name     = ["Alberto", "Alejandro", "Antonio", "Amado", "Aurelio", "Cecilia", "Celia", "Daniela", "Delia", "Eugenia", "Paulino", "Rafael", "Raymundo", "Ricardo", "Rufino", "Nicolas", "Mario", "Marcelo", "Margarito", "Modesto", "Mauro", "Antonio", "Alberto", "Daniel", "Damian", "Antonia", "Alejandra", "Berenice", "Cecilia", "Concepcion", "Eulalia", "Dolores", "Francisca", "Genoveva", "Xochitl", "Nayeli", "Ciereni", "oaquina", "Juana", "Julia", "Luisa", "Maria", "Marcela", "Margarita", "Miguel", "Nicolas", "Pedro", "Rafael", "Ramon", "Salvador", "Enrique"]; 
var pat      = ["Morales", "Morantes", "Moras", "Morelos", "Moreno", "Morentin", "Morfin", "Morgado", "Morillo", "Morin", "Moriyo", "Morones", "Morquecho", "Morras", "Morua", "Moscoso", "Loria", "Losada", "Losano", "Lossano", "Palafos", "Palasios", "Palencia", "Pallares", "Palma", "Palmerin", "Palo", "Paloalto", "Paloblanco", "Palomar", "Palomeque", "Palomera", "Cardenas", "Cardiel", "Cardona", "Cardoso", "Cariaga", "Carillo", "Carion", "Carlin", "Carlon", "Carlos", "Carmel", "Carmona", "Carnero", "Caro", "Zolis", "Zolorsano", "Zoriano", "Zosa", "Zosaya"];
var mat      = ["Alcaras", "Alcocer", "Alcorta", "Aldaco", "Aldape", "Aldaz", "Alderete", "Alejandro", "Alejo", "Aleman", "Alexos", "Alfaro", "Alferes", "Alfonso", "Alguera", "Allala", "Allende", "Almager", "Almaguer", "Almanza", "Almaras", "Almasan", "Almeda", "Almejo", "Almendares", "Almodovar", "Almonte", "Almorin", "Alonzo", "Altamirano", "Mendes", "Mendez", "Mendia", "Mendieta", "Mendiola", "Mendosa", "Meneces", "Meneses", "Meras", "Mercado", "Merced", "Mereles", "Merino", "Merlin", "Merlo", "Merodio", "Baena", "Baes", "Bahena", "Baina", "Baisa"]; 
var puesto   = ["Vigilante|0", "Programador|1", "Contador|1", "Obrero|0", "Recursos Humanos|1", "Intendente|0", "Soporte Tecnico|1", "Velador|0"];
var grupo    = ['Operaciones','Adminstrativo'];
var pagadora = ['empresa1', 'empresa2','empresa3','empresa4'];
var depto    = ['Departament 1', 'Departamento 2', 'Departamento 3'];
var email    = ['hotmail.com', 'gmail.com', 'yahoo.com.mx'];
var calle    = ['Av. industrial', 'Guadalupe Victoria', 'Zapata', 'Rio Tiver', 'Calandria', 'Mañanitas'];
var mun      = ['La Paz', 'Chimalhuacan', 'Nezahualcoyotl', 'Iztapaluca'];
var col      = ['Los Reyes', 'Ermita', 'Estrella', 'Esperanza'];
var json     = [];
function ruleta(num, opt)
{
	var opt = opt || 0;
	r = Math.floor((Math.random() * num) + 1);
	return (r < 10) ? (r+opt) : r; 
}


for (var i = 0 ; i < 50 ; i++)
{
	n1 = ruleta(50);
	n2 = ruleta(50);
	n3 = ruleta(50);
	aux = ruleta(100)%2;
	_name  = name[n1] + " " + pat[n2] + " " + pat[n3];
	_name2  = name[n2] + " " + pat[n3] + " " + pat[n2];
	_email = name[n1] + ruleta(1000) + "@" + email[ruleta(2)];
	movil    = ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10);
	phone    = ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10);	
	contacto = ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10) + "-" + ruleta(99,10);
	pues     = puesto[ruleta(7)]; 
	pues     = pues.split("|");
	grp      = grupo[pues[1]];
	estu     = (pues[1] == 1) ? 'Universidad' : 'Preparatoria';
	pues     = pues[0]; 
	_depto    = depto[ruleta(2)];
	falta     = ruleta(4);
	asis      = 21 - falta;

	_json = {
				"num"  : (1100 + i),
				"name" : _name,
				"edad" : ruleta(50,20),
				"sexo" : (aux === 0) ? 'F' : 'M',
				"turno": (aux > 0) ? 'Matutino' : 'Vespertino',
				'addr' : {
						 	'col'    : col[ruleta(3)],
						 	'calle' : calle[ruleta(5)],	
						 	'mun'    : mun[ruleta(3)],
						 	'num'    : ruleta(180, 50),
						 	'cp'     : ruleta(99400),
						 	'estado' : 'Estado de México'	
				    	},
				'puesto'   : pues,
				'grupo'    : grp,
				'salario'  : ruleta(5000) + 1000,
				'pagadora' : pagadora[ruleta(3)],
				'foto'     : 'empleado_' + ruleta(5) + ".png",
				'estudio'  : estu,
				'tel'      : phone,
				'cel'      : movil,
				'email'    : _email,
				'depto'    : _depto,
				'emergencia' : {'n' : _name2 , 't' : contacto},
				'datIngreso' : ruleta(28)+"-09-"+2016,
				'datBaja'    : "00-00-00",
				'status'     : (aux === 0) ? 1 : 2,
				'asistencia' : {'f' : falta, 'asistencia' : asis},

 			};

	json.push(_json);
}

console.log (json);