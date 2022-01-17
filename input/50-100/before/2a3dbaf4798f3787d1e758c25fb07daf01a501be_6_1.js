function(module4){

	

	console.log('Executing module2.js');

	document.getElementById('console').innerHTML += 'Executing module2.js\n';



	console.log('Trying to use module4...');

	document.getElementById('console').innerHTML += 'Trying to use module4...\n';

	

	if(module4.speak('Hello, World!') === 'ok') {

		console.log('module4 used successfully');

		document.getElementById('console').innerHTML += 'module4 used successfully\n';

	}

	else {

		console.error('Failed using module4');

		document.getElementById('console').innerHTML += 'Failed using module4\n';

	}



	return {};

}