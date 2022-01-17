function(name, test){
				message = test(elem, val) || '';
				customMismatchedRule = name;
				if(message){
					
					if(typeof message != 'string'){
						message = $(elem).data('errormessage') || elem.getAttribute('x-moz-errormessage') || webshims.customErrorMessages[name][webshims.activeLang()] || webshims.customErrorMessages[name]['']; 
					}
					
					if(typeof message == 'object'){
						message = message[name] || message.customError || message.defaultMessage;
					}
					return false;
				}
			}