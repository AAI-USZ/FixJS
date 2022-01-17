function(elem, validity, key){
		var message = $(elem).data('errormessage') || elem.getAttribute('x-moz-errormessage') || '';
		if(key && message[key]){
			message = message[key];
		}
		if(typeof message == 'object'){
			validity = validity || $.prop(elem, 'validity') || {valid: 1};
			if(!validity.valid){
				$.each(validity, function(name, prop){
					if(prop && name != 'valid' && message[name]){
						message = message[name];
						return false;
					}
				});
			}
		}
		webshims.data(elem, 'contentErrorMessage', message);
		if(typeof message == 'object'){
			message = message.defaultMessage;
		}
		return message || '';
	}