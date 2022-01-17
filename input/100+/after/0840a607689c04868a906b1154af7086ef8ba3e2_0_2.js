function(){
	    if (!this.options.javascript || this._javascript_is_loaded() )
		return;
	    this.options.js_loaded = true;
	    $.getScript(this.options.javascript);
	}