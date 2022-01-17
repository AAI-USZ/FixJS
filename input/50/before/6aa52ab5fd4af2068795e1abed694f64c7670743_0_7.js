function(table) {
		if(dojo.isIE) {
			while(table.hasChildNodes())
				table.deleteRow(0);
		} else {
			table.innerHTML = '';
		}
	}