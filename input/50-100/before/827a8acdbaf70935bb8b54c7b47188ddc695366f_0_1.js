function(line) {
		Array.push(sel.options, (new Element('option', {
		    'value': line.id,
		    'text': line.name
		})));
		if (line.id == id) sel.selectedIndex=index;
		index++;
	    }