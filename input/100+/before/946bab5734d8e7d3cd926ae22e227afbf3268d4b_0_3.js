function() {	
	var fieldset = $('fieldset .control-group');
	fieldset.remove();

	resetLocalStorage();

	this.pragmas = [];
	this.addCommand();
}