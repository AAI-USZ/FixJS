function() {
			
			// cleanup response
			data = data.replace( /(^[\r\n\s\t ]+|[\r\n\s\t ]+$)/g, '' )
			data = data.match( /^\{.*\}$/ ) ? JSON.parse( data ) : {}
			
			// do callback
			cb( data, response.headers )
			
		}