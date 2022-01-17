function PragmaHeader() {	
	var values = this.getStoredValues();

	if ( values.length > 0 ) {
		for ( var item in values ) {
			this.addCommand(values[item]);
		}		
	} else {
		this.addCommand("");
	}	
}