function( query, values, callback ) {

			var q = encodeURIComponent(this.untag( query, this.tagRE, values ));
			
			var cb = "c" + this.getUID();

			//Using JSONP to it's limit, also known as the poor man's AJAX ;)
			window[cb] = function( data ) {
				console.log("Calling callback method", cb, data);
				callback( data, values.context );
			}
			
			var url = this.yqlURL + this.untag( this.yqlBody, this.tagRE, { query:q, callback: cb } );
			
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			
			console.debug( query );
			console.debug( values );
			console.debug( url );
			
			document.documentElement.appendChild( script );
			
			return new YQLRequest( script, cb );

		}