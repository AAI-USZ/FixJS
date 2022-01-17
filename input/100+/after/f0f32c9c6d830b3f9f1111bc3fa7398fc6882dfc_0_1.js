function(uri, data, proxy, config) {
		/*
		* config:
		*   onsuccess : Function
		*   timeout : Number
		*   ontimeout : Function
		*	blank : String
		*	type : Number 0 hash 1 advance
		*/
		if (!uri) { return; }
		config = config || {};
		data = formatQuery(data);
		var type = config.type || 0;

		if (config.blank) {
			blankURI = config.blank;

			if (blankURI.indexOf('http') !== 0) {
				blankURI = protocolAndHost() + '/' + blankURI;
			}
		}

		var timeout = config.timeout || 0,
			frameId = 'crossDomainPost' + new Date().getTime(),
			finished = false;

		var ontimeout = function() {
			if (finished) { return; }

			if (config.ontimeout) {
				config.ontimeout();
			}

			handle();
		};

		var onsuccess = function(str) {
			if (finished) { return; }

			if (config.onsuccess) {
				config.onsuccess(str);
			}

			handle();
		};

		var handle = function() {
			var iframe = $(frameId);
			iframe.parentNode.removeChild(iframe);
			finished = true;

			delete QNR.crossDomainPost[frameId];
		};

		QNR.crossDomainPost[frameId] = onsuccess;

		var html = drawIframeStruct(uri, proxy, data, 'QNR.crossDomainPost.' + frameId, frameId, type),
			box = doc.createElement('div');

		box.style.display = 'none';
		box.id = frameId;

		box.innerHTML = html;
		doc.body.appendChild(box);

		locationList.push(uri);

		if (debug) {
			$('ifr' + frameId).src = $('form' + frameId).action;
		} else {
			$('form' + frameId).submit();
		}

		if (timeout) {
			setTimeout(ontimeout, timeout);
		}
	}