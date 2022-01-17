function() {
    var pairs = $('#auth_holder').attr('data').split('&');
    var key_values = {};
    for(var x=0; x<pairs.length; x++) {
	var key_val = pairs[x].split('=');
	key_values[key_val[0]] = key_val[1];
    }
    if (key_values['access_token']) {
	chrome.extension.sendRequest(
	    { 
		type: 'access_token_response', 
		access_token: key_values['access_token'],
		csrf_token: $.cookie('CSRF-Token') 
	    }, 
	    function(response) {
		if (response.status == 'ok') {
		    $('#auth_holder').attr('status', 'ok');
		}
		else {
		    log('Unable to fetch access token: ' + response.status);
		    $('#auth_holder').attr('status', 'fail');
		}
	    }
	);
    }
    else {
	$('#auth_holder').attr('status', 'fail');
    }
}