function( selector, context, xml ) {
			var matcher = compile( selector, context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}