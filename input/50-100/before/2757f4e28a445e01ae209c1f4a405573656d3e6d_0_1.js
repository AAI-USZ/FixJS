function( result ){

				var adDisplayConf = {};

				if( result['http_code'] == 'ERROR' || result['http_code'] == 0 ){

					mw.log("Error: loadAdXml error with http response");

					callback(false);

					return ;

				}

				try {

					var resultXML = $.parseXML( result['contents'] );

				} catch (e){

					mw.log("Error: AdLoader could not parse:" + resultXML);

					callback({});

					return ;

				}

				// get the xml document:

				_this.handleResult( resultXML, callback );

			}