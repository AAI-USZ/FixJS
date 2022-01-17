function() {
		var select = $j('#selLevel')[0];
		
		// find out if it already exists
		var exists = false;
		var i;
		for (i = 0; i < select.options.length && !exists; i++)
			if (select.options[i].value == self.level.toString())
				exists = true;
		
		if (!exists) {
			select.options[select.options.length] = new Option('Level '+self.level, self.level.toString());
			select.selectedIndex = select.options.length-1;
		} else {
			select.selectedIndex = i - 1;
		}
	}