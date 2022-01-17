function(){
		var self = this;
	
		if (!this.options.javascript)
			return;
	
		var name = Object.getPrototypeOf(this).widgetBaseClass;
		this._trigger('javacript',name);
		if ($(":"+name).filter(function(index){return self.options.js_loaded;}).length > 0)
			return;
	
		this.options.js_loaded = true;
		var fbroot = $('<div id="fb-root"></div>').prependTo($(document.body));	
		var js = document.createElement("script");
		js.type = "text/javascript";
		js.src = this.options.javascript;
		js.async = true;
		js.id = this.options.js_id;
		fbroot.append(js);
	}