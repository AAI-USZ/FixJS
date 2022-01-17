function(templateOrSelector, modelview) {
		
		//ensure that the template is compiled
		if(!_.isFunction(templateOrSelector)) {
			if(_.isString(templateOrSelector)) {
				//TODO check a local cache of templates
				var source = $('script#' + templateOrSelector + '[type="text/x-handlebars"]').html() || templateOrSelector;
				this._template = Handlebars.compile(source);
				//TODO add template to the cache
			}
			else {
				//TODO report error
				this._template = Handlebars.compile("<b>Invalid Template!</b>"); 
			} 
		}
		else {
			this._template = templateOrSelector;
		}
		
		this._context = new BindingContext(modelview);
		this._attachedToDom = false;
	}