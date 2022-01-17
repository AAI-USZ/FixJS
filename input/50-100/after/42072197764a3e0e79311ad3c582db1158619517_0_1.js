function(evt) {
			console.log('keypress ' + evt.which + ' ' + popcorn.paused());
			if (evt.which === 32) {
				evt.preventDefault();
				evt.stopPropagation();
				return false;
			}
		}