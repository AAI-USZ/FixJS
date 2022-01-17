function(el) {
	return this.getFieldValue(el).length > 0 || el.val().length > 0;
}