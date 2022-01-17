function asyncLoad( data ) {

			if ( data ) {

				queue.unshift( data );

				if ( queue.length > 1 ) {
					return;
				}
			} else if ( queue.length === 0 ) {

				return;
			}

			data = queue[ 0 ];

			var
				script,
				dispatched = False,
				url = data.scripts.shift(),
				onLoad = function( url ) {

					if ( !dispatched ) {

						dispatched = True;

						importedModules[ url ] = 1;

						while( queue.length && queue[ 0 ].scripts.length === 0 ) {

							data = queue.shift();

							data.onLoad && data.onLoad.call( data.scope || Class );
						}

						asyncLoad();
					}
				},

				onError = function( status, url ) {

					if ( data.onError && data.onError.call( data.scope || Class, status, url ) ) {

						if ( queue[ 0 ].scripts.length === 0 ) {
							queue.shift();
						}

					} else {

						if ( !data.onError ) {
							throwError( status, url );
						}

						queue.shift();
					}

					asyncLoad();
				},

				cleanupScript = function( prop ) {

					if ( script ) {

						script.onload = script.onreadystatechange = script.onerror = Null;
						script.parentNode.removeChild( script );

						for( prop in script ) {
							try {
								script[ prop ] = Null;
								delete script[ prop ];
							} catch( _e_ ) {}
						}

						script = Null;
					}
				};

			if ( data.isLocal && msie && msie < 9 ) {

				// Internet Explorer < 9 load a fast script via XHR
				xhrLoad( url, True, onLoad, onError );

			} else if ( url in importedModules ) {

				onLoad( url );

			} else {

				// inject script
				script = document.createElement( 'script' );

				script.type = 'text/javascript';

				script.onerror = function() {
					cleanupScript();
					onError( 404, url );
				}

				if ( "onload" in script || !( "readyState" in script ) ) {
					script.onload = function() {
						cleanupScript();
						onLoad( url );
					}
				} else {
					script.onreadystatechange = function() {
						if ( this.readyState == "loaded" || this.readyState == "complete" ) {
							cleanupScript();
							onLoad( url );
						}
					}
				}

	            script.src = url + ( Class["imports"]["disableCaching"] ? ( url.indexOf( "?" ) > 0 ? "&" : "?" ) + ( new Date() ).getTime() : "" );

	            (html.firstChild || document.getElementsByTagName('head')[0]).appendChild( script );
			}
		}