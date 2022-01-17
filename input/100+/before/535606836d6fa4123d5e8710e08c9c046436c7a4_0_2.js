function() {
		var select = $j('#selLevel')[0];
		select.options[select.options.length] = new Option('Level '+self.level, self.level.toString());
		select.selectedIndex = select.options.length-1;
	}