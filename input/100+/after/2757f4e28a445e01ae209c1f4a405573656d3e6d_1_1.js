function( callback ) {

		var _this = this;

		

		// Load the cTagsMap if set

		if( this.config.cTagsMap ){

			mw.log('Comscore:: Retrive Comscore xml file from: ' + _this.config.cTagsMap);

			new mw.ajaxProxy({

				url: _this.config.cTagsMap,

				success: function( resultXML ) {

					_this.handleXMLResult( resultXML, callback );

				},

				error: function() {

					mw.log("Comscore:: Error: failed to load: " + _this.config.cTagsMap);

					_this.addPlayerBindings( callback );

				}

			});

		} else {

			this.addPlayerBindings( callback );

		}

	}