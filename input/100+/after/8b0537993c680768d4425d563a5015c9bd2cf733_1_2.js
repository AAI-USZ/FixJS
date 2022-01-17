function onSelectionChange( evt )
	{
		var path = evt.data.path,
			blockLimit = path.blockLimit,
			elements = path.elements,
			element,
			i;

		// Grouping should only happen under blockLimit.(#3940).
		for ( i = 0 ; i < elements.length && ( element = elements[ i ] )
			  && !element.equals( blockLimit ); i++ )
		{
			if ( listNodeNames[ elements[i].getName() ] )
				return this.setState( this.type == elements[i].getName() ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF );
		}

		return this.setState( CKEDITOR.TRISTATE_OFF );
	}