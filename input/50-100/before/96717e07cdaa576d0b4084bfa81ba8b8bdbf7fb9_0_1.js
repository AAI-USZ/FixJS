function dispatch()
	{
		var node = this.first;
		while ( node = node.next ) {
			document.documentElement.attachEvent( "onpropertychange",
				getSignalClosure( this, node, arguments ), false
			);
		}
		
		// triggers the property change event
		++document.documentElement[ SIGNAL_EVENT ];
	}