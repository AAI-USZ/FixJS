function(module1){

	

	console.log('Executing module4.js');

	document.getElementById('console').innerHTML += 'Executing module4.js\n';

	

	return {

		speak: function(message) {

			console.log('module4.js: ' + message);

			document.getElementById('console').innerHTML += 'module4.js: ' + message + '\n';

			return 'ok';

		}

	};

}