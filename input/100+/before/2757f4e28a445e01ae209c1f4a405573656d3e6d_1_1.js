function( callback ) {

		var _this = this;



		var loadFromProxy = function() {

			var proxyUrl = mw.getConfig( 'Mw.XmlProxyUrl' );

			if( !proxyUrl ){

				mw.log( "Error: mw.Comscore : missing kaltura proxy url ( can't load ad )");

				return ;

			}

			$.getJSON( proxyUrl + '?url=' + encodeURIComponent( _this.config.cTagsMap ) + '&callback=?', function( result ){

				if( result['http_code'] == 'ERROR' || result['http_code'] == 0 ){

					mw.log("Error: loadXml error with http response");

					return ;

				}

				try{

					var resultXML = $.parseXML( result['contents'] );

				} catch (e){

					mw.log("Error: Comscore could not parse:" + resultXML);

					return ;

				}

				// get the xml document:

				_this.handleXMLResult( resultXML, callback );

			});

		};



		// Load the cTagsMap if set

		if( this.config.cTagsMap ){

			mw.log('Comscore:: Retrive Comscore xml file from: ' + this.config.cTagsMap);

			// First try to directly load the xml url:

			try{

				$.ajax({

					url: _this.config.cTagsMap,

					success: function( data ) {

						_this.handleXMLResult( data, callback );

					},

					error: function( jqXHR, textStatus, errorThrown ){

						// try to load the xml with the proxy:

						loadFromProxy();

					}

				});

			} catch ( e ){

				mw.log( "Comscore:: first cross domain request failed, trying with proxy" );

			}

		} else {

			this.addPlayerBindings( callback );

		}

	}