function() {
	
	var oneJanStamp = Date.UTC(this.getUTCFullYear(), 0, 1);
	return Math.floor((this - oneJanStamp) / 86400000);

}