function ParanoiaReset(checkbox, drops) {
	var selects = $('select');
	for (var i = 0; i < selects.results(); i++) {
		if (selects.raw(i).name.match(/^p_/)) {
			if(drops == 0) {
				selects.raw(i).selectedIndex = 0;
			} else if(drops == 1) {
				selects.raw(i).selectedIndex = selects.raw(i).options.length - 2;
			} else if(drops == 2) {
				selects.raw(i).selectedIndex = selects.raw(i).options.length - 1;
			}
			AlterParanoia();
		}
	}
	var checkboxes = $(':checkbox');
	for (var i = 0; i < checkboxes.results(); i++) {
		if (checkboxes.raw(i).name.match(/^p_/) && (checkboxes.raw(i).name != 'p_lastseen')) {
                if (checkbox == 3) 
                    checkboxes.raw(i).checked = !(checkboxes.raw(i).name.match(/_list$/) || checkboxes.raw(i).name.match(/_l$/));
                else 
                    checkboxes.raw(i).checked = checkbox; 
                AlterParanoia();			
		}
	}
}