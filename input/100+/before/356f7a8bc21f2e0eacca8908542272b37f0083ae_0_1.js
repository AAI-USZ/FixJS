function(aDetails)
	{
		this.fireEvent({ type : 'GM_xmlhttpRequestCall', detail : aDetails });

		if (!this.emulateXMLHTTPRequest)
			return;

		var uri = aDetails.url;
		if (typeof uri != 'string')
			throw new Error('Invalid url: url must be of type string');
		if (!/^(http|https|ftp):\/\//.test(uri))
			throw new Error('Invalid url: '+uri);

		var request = Cc['@mozilla.org/xmlextras/xmlhttprequest;1']
				.createInstance(Ci.nsIXMLHttpRequest)
				.QueryInterface(Ci.nsIDOMEventTarget);
		var _this = this;
		var listener = {
				request : request,
				handleEvent : function(aEvent)
				{
					var state = {
						responseText : this.request.responseText,
						readyState : this.request.readyState,
						responseHeaders : (
							this.request.readyState == 4 ?
								this.request.getAllResponseHeaders() :
								''
						),
						status : (
							this.request.readyState == 4 ?
								this.request.status :
								''
						),
						statusText : (
							this.request.readyState == 4 ?
								this.request.statusText :
								''
						),
						finalUrl : (
							this.request.readyState == 4 ?
								this.request.channel.URI.spec :
								''
						),
						handled : false // extended spec of UxU
					};

					var eventType = aEvent.type.charAt(0).toUpperCase()+aEvent.type.substring(1);
					var event = {
							type    : 'GM_xmlhttpRequestBefore'+eventType,
							state   : state,
							handled : false
						};
					_this.fireEvent(event);

					event.type = 'GM_xmlhttpRequest'+eventType;
					if ('on'+aEvent.type in this) {
						state.handled = event.handled = true;
						var func = this['on'+aEvent.type];
						this.frame.contentWindow.setTimeout(function(aState) {
							func(aState);
							_this.fireEvent(event);
						}, 0, state);
						return;
					}
					_this.fireEvent(event);
				},
				frame : this.frame
			};

		if (aDetails.onload) listener.onload = aDetails.onload;
		if (aDetails.onerror) listener.onerror = aDetails.onerror;
		if (aDetails.onreadystatechange) listener.onreadystatechange = aDetails.onreadystatechange;

		request.addEventListener('load', listener, false);
		request.addEventListener('error', listener, false);
		request.addEventListener('readystatechange', listener, false);

		request.open(aDetails.method, uri);

		if (aDetails.overrideMimeType)
			request.overrideMimeType(aDetails.overrideMimeType);

		if (aDetails.headers)
			for (var i in aDetails.headers)
			{
				request.setRequestHeader(i, aDetails.headers[i]);
			}

		request.send(aDetails.data || null);
	}