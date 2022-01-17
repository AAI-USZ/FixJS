function(message) {

			console.log('module4.js: ' + message);

			document.getElementById('console').innerHTML += 'module4.js: ' + message + '\n';

			return 'ok';

		}