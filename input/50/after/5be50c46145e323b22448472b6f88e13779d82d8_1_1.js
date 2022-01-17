function(text) {
	return text.replace(new RegExp('«|»|!|\\?', 'g'), ' ');
}