function(line) {
			sel.adopt(new Element('option', {
		    'value': line.id,
		    'text': line.name
		}));
		/*Array.push(sel.options, (new Element('option', {
		    'value': line.id,
		    'text': line.name
		})));*/
		if (typeOf(line) != undefined && line.id == id) {
			sel.selectedIndex=index;
		}
		index++;
	    }