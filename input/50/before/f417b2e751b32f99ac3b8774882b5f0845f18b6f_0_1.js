function() {
	MINI.request('get', SRC, null, function(src) {
		srcData = prepareSections(src);
		setUpConfigurationUI(srcData);
	});
}