function( callerAjaxParameters ) {

		++Wikipedia.numberOfActionsLeft;

		var ajaxparams = $.extend( {}, {
			context: this,
			type: 'POST',
			url: mw.util.wikiScript('api'),
			data: QueryString.create(this.query),
			datatype: 'xml',

			success: function(xml, statusText, jqXHR) {
				this.statusText = statusText;
				this.responseXML = xml;
				this.errorCode = $(xml).find('error').attr('code');
				this.errorText = $(xml).find('error').attr('info');

				if (typeof this.errorCode === "string") {

					// the API didn't like what we told it, e.g., bad edit token or an error creating a page
					this.returnError();
					return;
				}

				// invoke success callback if one was supplied
				if (this.onSuccess) {

					// set the callback context to this.parent for new code and supply the API object
					// as the first argument to the callback (for legacy code)
					this.onSuccess.call( this.parent, this );
				} else {
					this.statelem.info("done");
				}

				Wikipedia.actionCompleted();
			},

			// only network and server errors reach here – complaints from the API itself are caught in success()
			error: function(jqXHR, statusText, errorThrown) {
				this.statusText = statusText;
				this.errorThrown = errorThrown; // frequently undefined
				this.errorText = statusText + ' "' + jqXHR.statusText + '" occurred while contacting the API.';
				this.returnError();
			}

		}, callerAjaxParameters );

		return $.ajax( ajaxparams );  // the return value should be ignored, unless using callerAjaxParameters with |async: false|
	}