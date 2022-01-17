function(){
		return ('htmlFor' in this) ? this.htmlFor : this.getAttribute('for');
	}