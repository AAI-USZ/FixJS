function(){
		src = this.el.dom.src;
		
		// kills the cached image by re-requesting and ignoring cache
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.setRequestHeader('Pragma', 'no-cache');
		xhr.send();
		
		// reloads image
		this.el.dom.src = "";
		this.el.dom.src = src;
	}