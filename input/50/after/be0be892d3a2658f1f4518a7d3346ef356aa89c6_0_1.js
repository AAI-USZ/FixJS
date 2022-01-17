function( event ) {
		// Save active reference before collapseAll triggers blur
		var ui = {
			// Selecting a menu item removes the active item causing multiple clicks to be missing an item
			item: this.active || $( event.target ).closest( ".ui-menu-item" )
		};
		this.collapseAll( event, true );
		this._trigger( "select", event, ui );
	}