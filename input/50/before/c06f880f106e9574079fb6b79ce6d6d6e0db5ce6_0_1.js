function(attr){
			var button = $('<button>', attr);
			// Avoid problems with IE which considers buttons to be of
			// type submit by default. One problem that occurd was that
			// hitting enter inside a text-input caused a click event in
			// the button right next to it.
			button[0].type = 'button';
			return button;
		}