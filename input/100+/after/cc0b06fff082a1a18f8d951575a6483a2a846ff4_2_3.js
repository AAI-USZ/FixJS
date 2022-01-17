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
				
				removeEventListener( doc , ( !!_isIE ? kDOMContentLoaded : kOnReadyStateChange ) , handleReady , NO );
				removeEventListener( window , kLoad , handleReady , NO );
			};
				
			return returnValue;
		} else {	// add event handlers
		
			// A fallback to window.onload, that will always work
			addEventListener( window , kLoad , handleReady , NO );
		
			// Mozilla, Opera and webkit nightlies currently support this event
			if ( !!(doc.addEventListener) ) {
				// Use the handy event callback
				addEventListener( doc , kDOMContentLoaded , handleReady , NO );
	
			// If IE event model is used
			} else if ( _isIE ) {
				// ensure firing before onload,
				// maybe late but safe also for iframes
				addEventListener( doc , kOnReadyStateChange , handleReady , NO );
				
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