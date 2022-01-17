function(response, sound) {
			var message = 'Error with sound "' + sound.key + ': ' + sound.url + '". \nThis is as good as the error gets. Sorry.';
			sounds.errors.push(sound);
			after();
			throw (message);
		}