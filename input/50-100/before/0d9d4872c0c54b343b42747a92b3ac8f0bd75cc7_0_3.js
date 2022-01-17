function(parent, xmlData){
	this.id = $(xmlData).attr('id');
	if (!$(xmlData).attr('highlight')){
		this.highlight = $(xmlData).attr('highlight');
	}
}