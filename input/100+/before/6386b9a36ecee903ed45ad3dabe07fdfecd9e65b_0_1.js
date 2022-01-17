function(){ // delaying execution due to stupid Chrome Linux bug
		window.addEventListener('resize', function(){ // in case there's a resizer *outside* the popup page
			if (resizerDown) return;
			var width = window.innerWidth;
			body.style.width = width + 'px';
			localStorage.popupWidth = width;
			clearMenu();
		});
	}