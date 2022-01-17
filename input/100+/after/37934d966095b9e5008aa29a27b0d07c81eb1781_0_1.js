function( promise, method, arg_url, response, ioargs ) {

		var	err = null, result = null, 
			headers = {};

		if( ioargs ) dojo.forEach( ( ioargs.xhr.getAllResponseHeaders() || "" )
			.split( /\s*\n/ ), function( hdr ) {
				var kv = hdr.split( /:\s*/ ),
					key = kv[0].toLowerCase().replace( /(?:^|-)./g, function( s ){ return s.toUpperCase(); } );
				if( kv[0] ) {
					if( key in headers ) {
	 					if( !(headers[key] instanceof Array) )	headers[key] = [ headers[key], kv[1]||"" ];
						else	headers[key].push( kv[1]||"" );
					} else		headers[key] = kv[1]||"";
				}
			} );

		if( !response && !ioargs.xhr.status ) {
			//	Dojo failed to signal connection loss as an error :(
			err = new Error( "Connection to service failed" );
		} else if( response instanceof Error ) {
			//	Error detected by dojo.xhr() -- timeout, HTTP code etc.
			err = response;
			response = response.responseText || ioargs && ioargs.xhr.responseText || '';
		}

		if( method === 'GET' && (!err || err.dojoType != 'cancel') && this._pending_gets.hasOwnProperty( arg_url ) )
			delete this._pending_gets[ arg_url ];

		if( (!err || err.dojoType != 'cancel') && ioargs.xhr.readyState == 4 ) { // The request has completed and was not cancelled
			var	content_type = headers[ 'Content-Type' ];

			if( this.rejectContentTypes ? 
				content_type && adstream.data._contentTypeInList( content_type, this.rejectContentTypes ) :
				!content_type || !adstream.data._contentTypeInList( content_type, this.acceptContentTypes ) ) {
				if( ioargs.xhr.status < 400 )	err = new Error( "Unexpected content type returned: " + content_type );
			} else if( response ) {
				var json;
				try { json = dojo.fromJson( response ); } catch( e ) {
					err = new Error( "Malformed response from the server: bad JSON syntax" );
				}
				if( json )	try { result = this._sync( json, arg_url ); } catch( e ) { err = e; }
			}
		}

		if( err ) {
			if( method !== 'GET' || err.dojoType != 'cancel' || this._paused !== 'all' ) {
				err.ioargs = ioargs;
				err.responseHeaders = headers;
				err.status = ioargs.xhr.status;
				err.responseText = response;
				promise.reject( err );
			}
		} else if( typeof result === 'object' )	{
			promise.resolve( result );	//	Method call with return value
		} else {
			var d = adstream.data._descend( arg_url, this.root );
			if( !d.rel_url || 												//	Resolved to the object
				(d.obj[d.rel_url] instanceof adstream.data.schema.Method) 	//	Method call w/o return value: return the object itself
			)		promise.resolve( d.obj );
			else	promise.reject( new Error( "Protocol violation: no relevant data returned for " + arg_url ) );
		}

		return null;
	}