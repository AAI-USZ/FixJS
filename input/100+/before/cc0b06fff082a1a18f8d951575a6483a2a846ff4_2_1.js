function safeCall( func , context , shouldThrowError , errorText )
	{
		var result = NO;
		
		if( isNil(context) ) context = window;
	
		try
		{
			result = func.call(context);
		} catch(e) {
			if( _debug === YES )
			{
				log( e );
			};
		
			if( shouldThrowError === YES )
			{
				var err = new Error(errorText);
				err.originalError = e;
				log( func.toString() , e );
				throw err;
			};
		};
		
		return result;
	}