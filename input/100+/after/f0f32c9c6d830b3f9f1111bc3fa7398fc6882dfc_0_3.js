function drawIframeStruct(uri, proxy, data, globalFuncName, id, type) {

		var ar = [], temp = [];

		var act = plusDomain(uri, proxy, globalFuncName, type),
			ifrid = 'ifr' + id, formid = 'form' + id;

		ar[ar.length] = '<form id="' + formid + '" target="' + ifrid + '" action="' + act + '" method="POST">';

		for (var i = 0, l = data.length; i < l; i++) {

			temp = data[i].split('=');

			ar[ar.length] = '<input type="text" name="' + temp[0] + '" value="' + temp[1] + '" />';
		}

		ar[ar.length] = '</form>';

		// https don't allow about:blank in ie6

		ar[ar.length] = '<iframe name="' + ifrid + '" id="' + ifrid + '" src="' + blankURI + '"></iframe>';

		return ar.join('');
	}