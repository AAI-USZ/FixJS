function plusDomain(uri, proxy, func, type) {
		var domain = hostname,
			origin = uri.replace(reURIOrigin, ''),
			hash = uri.match(reURIHash),
			search = uri.match(reURISearch),
			li = [origin];

		hash = hash ? hash[0] : '#';
		search = search ? search[0] : '?';

		if (search.replace(/\?/g, '').length) {
			search += '&';
		}

		search += ('_=' + new Date().getTime());

		li[li.length] = search;

		if (hash.replace(/#/g, '').length) {
			hash += '&';
		}

		li[li.length] = hash;

		li[li.length] = 'crosspath=' + encodeURIComponent(protocolAndHost(domain) + '/' + proxy);
		li[li.length] = '&';
		li[li.length] = 'crosscall=' + encodeURIComponent(func);


		// detect if document.domain is set

		if (doc.domain !== domain) {
			li[li.length] = '&crossdomain=' + encodeURIComponent(doc.domain);
		}

		if (type && postMessage) {
			type = 2;
		}

		li[li.length] = '&type=' + type;

		return li.join('');
	}