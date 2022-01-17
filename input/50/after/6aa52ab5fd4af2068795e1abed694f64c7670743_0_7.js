function(table) {
		if(dojo.isIE) {
			try {
				while(table.hasChildNodes()) {
					table.deleteRow(0);
				}
			} catch(e) {
				// not supported by broswer
			}
		} else {
			table.innerHTML = '';
		}
	}