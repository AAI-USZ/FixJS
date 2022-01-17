function(e)
    {
	this.zIndex = ++highestZ;
	// @TODO : where should i write the strip function. 
     	stripHTML(this.editField);
	this.save();
        this.editField.focus();
	getSelection().collapseToEnd(); // Why should i move to the end ?
    }