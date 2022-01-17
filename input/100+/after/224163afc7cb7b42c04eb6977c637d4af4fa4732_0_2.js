function(matches, elem) {
		// get the element
		elem = $(elem);

		// blur the field
		elem.blur();

		// get the necessary items
		var pos = elem.offset(),
			menu = $('#context-menu'),
			content = $('ul', menu),
			i;

		// clear the content if needed
		content.empty();

		// add the matches to the list
		for(i = 0; i < matches.length; i++) {
			content.append('<li class="gs-namecomplete-option">' + matches[i] + '</li>');
		}

		// select the first item
		$(content.find('li')[0]).addClass('selected');
		
		content.find('li').click(self.selectOnClick);

		// bind the keydown to move around the menu
		$(document).bind('keydown', self.keyDown);

		// estimate the left to the # of chars * 7...not sure?
		// get the top of the box to put this thing at
		var posLeft = elem.val().length * 7,
			posTop  = Candy.Util.getPosTopAccordingToWindowBounds(menu, pos.top);

		// show it
		menu.css({'left': posLeft, 'top': posTop.px, backgroundPosition: posLeft.backgroundPositionAlignment + ' ' + posTop.backgroundPositionAlignment});
		menu.fadeIn('fast');

		return true;
	}