function _initKeypressCounter($input) {
		var keysPressed = [];
		$input.on('keydown.jqcombo', function(e) {
			// Store currently pressed keys
			if ($.inArray(e.keyCode, keysPressed) == -1) {
				keysPressed.push(e.keyCode);
			}
			keypressCounter = keysPressed.length;
		});
		
		$input.on('keyup.jqcombo', function(e) {			
			// Remove currently pressed key from store
			var index = $.inArray(e.keyCode, keysPressed);
			if (index >= 0) {
				keysPressed.splice(index, 1);
			}
			keypressCounter = keysPressed.length;
		});	
	}