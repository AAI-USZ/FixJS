function() {
	
	this.DEFAULT_NEWVERSION = 0.0,
	this.DEFAULT_UPDATECHECK = 0;
	
	this.newversion = GM_getValue("newversion", this.DEFAULT_NEWVERSION),
	this.updateCheck = GM_getValue("updateCheck", this.DEFAULT_UPDATECHECK);
	
	return this;
}