function(_, $, Handlebars, BindingContext, binder) {
	
	var View = function(templateOrSelector, modelview) {
		
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
	
	View.prototype.appendTo = function(elementOrSelector) {
		if(!this._attachedToDom) {
			
			//TODO bind/util wrap this for high level changes?  
			
			binder.start(this._context);
			$(this._template(this._context.target)).appendTo(elementOrSelector);
			binder.end(); //TODO pass 'this' to end so it can perform the after insertion tasks
			
			this._attachedToDom = true;
			//TODO add a removedFromDom handler here to update status
		}
		else {
			//TODO remove from existing position and rebind to 
		}
	}
	
	return View;
}