function pollResult() {

	var xmlhttp = initAjax();
	// Callbacks
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var json = xmlhttp.responseText;
			try {
  				json = JSON.parse(json);
			} catch (exception) {
  				json = null;
			}
			// Valid
			var error_msg;
			if(json) {
				var json_status = json.status;
				if(json_status == 'finished') {
					// We are done. Clear loading and redirect browser
					window.location = 'tree.pl?test_id=' + json.test_id
					+ '&key=' + json.key;
					clearInterval(interval);
					clearTimeout(loading_bar);
					return;
				} else if(json_status == 'error') {
					error_msg = errors[json.error_key];
				} else {
					// Let polling continue
					return;
				}
			} else {
				error_msg = 'Malformed response returned from server.';
			}
			// Down  here we know that some error occurred
			clearInterval(interval);
			clearTimeout(loading_bar);
			document.getElementById('test').innerHTML = '<span style="color: red;">' + error_msg + '</span>';

		}
  	}
	// What domain to check
	var domain = document.getElementById('domain').value;
	var type = document.getElementById('type').value;

	// Pass parameters given type of test
	if(type == 'standard') {
		xmlhttp.open("GET","do-poll-result.pl?domain="+domain + "&test=" + type, true);
	} else if(type != undefined && type.match(/undelegated|moved/)) {
		xmlhttp.open("GET","do-poll-result.pl?domain="+domain +
		"&test=undelegated" + "&parameters="+source_params(), true);
	}
	xmlhttp.send();
}