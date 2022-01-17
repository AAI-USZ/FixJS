function _addCss(css, fragment) {
        for (var i = 0; i < css.length; ++i) {
    	if(inArray(loadedcss, css[i])){
			_addCssFile(css[i], fragment);
			loadedcss.push(css[i]); // flag css file as 'loaded'
		}
        }
    }