function _deferInstance_setTimeout()
	{
	
		var self = this , timeout = self.options["timeout"];
		if( timeout != undefined && !isNaN(timeout) )
		{
			//log( "hastimeout" );						
			if( self.timeoutMS === null )
			{
				// set this on first run
				self.timeoutMS = (+new Date())+timeout;
			};
			
			if( self.timeoutMS > (+new Date()) )
			{
				if( self.completed === NO )
				{
					// do it again				
					self.timeoutID = window.setTimeout( function _deferInstance_setTimeout_impl_set(){self.resultHandler(self.test());} , self.options.interval );
					
					log( "setTimeout" );
				};
			} else {
				log("timed out" , this);
				
				var failedHandler = self.options["onFail"];
				
				if( isFunction(failedHandler) )
				{
					safeCall( failedHandler , null , NO , "" );
				};

				destroyInstance( self.id );
			};
		};
		
	}