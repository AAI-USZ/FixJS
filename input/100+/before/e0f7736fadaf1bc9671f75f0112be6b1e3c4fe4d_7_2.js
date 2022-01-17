f		var message = elem.getAttribute('x-moz-errormessage') || elem.getAttribute('data-errormessage') || '';
		if(message && message.indexOf('{') != -1){
			try {
				message = jQuery.parseJSON(message);
			} catch(er){
				return message;
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
		}
		return message || '';
	};
