function handleReady( ev )
	{	//log(ev);
		// insubstantial portions of ready code inspired by jQuery, under the MIT license
		// <https://github.com/jquery/jquery/blob/master/src/core.js>
		
		var doc = window.document;
    		
		if( _isReady === YES || doc.readyState === kComplete )
		{	//log("DOM Ready");
			return YES;
		};
        
        
		
		if( !isNil(ev) && !isNil(ev[kType]) )
		{
			var returnValue = NO;
			switch( ev[kType] )
			{
				case	kDOMContentLoaded:
				case	kLoad :
						returnValue = ( ev.returnValue === YES ); break;
				case	kReadyStateChange :
						if( ev.readyState === kComplete ) returnValue = YES;
						break;
			};
			
			if( returnValue === YES )
			{
				// clean up event handlers
				
				if ( !!(doc.addEventListener) )			// Moz/Opera/Webkit
				{
					doc.removeEventListener( kDOMContentLoaded , handleReady , NO );
					window.removeEventListener( kLoad , handleReady , NO );
				} else if ( _isIE ) {		// IE
					doc.detachEvent( kOnReadyStateChange , handleReady );
					window.detachEvent( kLoad , handleReady );
				};
			};
				
			return returnValue;
		} else {	// add event handlers
			// Mozilla, Opera and webkit nightlies currently support this event
			if ( !!(doc.addEventListener) ) {
				// Use the handy event callback
				doc.addEventListener( kDOMContentLoaded, handleReady, NO );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( kLoad, handleReady, NO );
	
			// If IE event model is used
			} else if ( _isIE ) {
				// ensure firing before onload,
				// maybe late but safe also for iframes
				doc.attachEvent( kOnReadyStateChange, handleReady );
	
				// A fallback to window.onload, that will always work
				window.attachEvent( kLoad, handleReady );	
				
				if( _robustIEReady === YES )
				{
					// If IE and not a frame
					// continually check to see if the document is ready
					var toplevel = NO;
		
					try {
						toplevel = window.frameElement === null;
					} catch(e) {;}
					
					// IE Scroll hack
					if( toplevel === YES )
					{
						defer( 
							function IEScrollHackPredicate(){
								doc.documentElement.doScroll("left");
								/* failure of the line above will result in a failed predicate test */
								return YES;
							} , 
							function IEScrollHackHandler(){ setReady(YES); } , 
							{ testDOMReady:NO }
						);
					};
				};
			};
		};
		
		return NO;
	}