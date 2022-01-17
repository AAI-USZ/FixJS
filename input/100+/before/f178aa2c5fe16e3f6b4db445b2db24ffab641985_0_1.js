function(e) {
		// get the menu and the content element
		var menu = $('#context-menu'),
			content = menu.find('ul');

		// switch the key code
		switch (e.which) {
			// up arrow
			case 38:
				// move the selected thing up
				content.find('li.selected').removeClass('selected').prev().addClass('selected');
				break;

			// down arrow
			case 40:
				// move the selected thing down
				content.find('li.selected').removeClass('selected').next().addClass('selected');
				break;

			// the key code for completion
			case _options.completeKeyCode:
			// esc key
			case 27:
				if (e.which == _options.completeKeyCode) {
					// get the text of the selected item
					var val = content.find('li.selected').text();
					// replace the last item with the selected item
					self.replaceName(val);
				}

				// remove the listener on the field
				$('input[name="message"]').unbind('keydown', self.keyDown);

				// hide the menu
				menu.hide();
				break;
		}

		// stop the action of any keys
		e.preventDefault();
	}