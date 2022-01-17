function(attr){
			// Set type to button to avoid problems with IE which
			// considers buttons to be of type submit by default. One
			// problem that occurd was that hitting enter inside a
			// text-input caused a click event in the button right next
			// to it.
			return $('<button>', attr).attr('type', 'button');
		}