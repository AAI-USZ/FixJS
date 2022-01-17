function( options, form ) {
	this._defaults = _defaults;
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
}