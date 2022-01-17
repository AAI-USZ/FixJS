function(module4){

	

	console.log('Executing module2.js');

	echo('Executing module2.js');



	console.log('Trying to use module4...');

	echo('Trying to use module4...');

	

	if(module4.speak('Hello, World!') === 'ok') {

		console.log('module4 used successfully');

		echo('module4 used successfully');

	}

	else {

		console.error('Failed using module4');

		echo('Failed using module4');

	}



	return {};

}