function( text ) {
		this._elem = $( '<a/>', {
			'class': this.UI_CLASS,
			text: text,
			href: 'javascript:;',
			click: jQuery.proxy( this.doAction, this )
		} );
	}