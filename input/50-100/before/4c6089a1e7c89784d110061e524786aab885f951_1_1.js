function(templateOrSelector, modelview) {
		
		//ensure that the template is compiled
		if(!_.isFunction(template)) {
			if(_.isString(template)) {
				//TODO check a local cache of templates
				var source = $('script#' + templateOrSelector + '[type="text/x-handlebars"]').html() || templateOrSelector;
				this._template = Handlebars.compile(source);
			}
			else {
				//TODO report error
				this._template = Handlebars.compile("<b>Invalid Template!</b>"); 
			} 
		}
		
		this.context = new BindingContext(modelview);
		this._attachedToDom = false;
	}