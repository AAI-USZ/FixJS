function() {
			
			// cleanup response
			data = data.replace( /(^[\r\n\s\t ]+|[\r\n\s\t ]+$)/g, '' )
			data = data.match( /^\{.*\}$/ ) ? JSON.parse( data ) : {}
			
			// emit trouble
			if( response.headers.status >= 300 ) {
				app.emit( 'api-error', {
					request:		options,
					request_body:	body,
					response: {
						headers:	response.headers,
						body:		data
					}
				})
			}
			
			// do callback
			cb( data, response.headers )
			
		}