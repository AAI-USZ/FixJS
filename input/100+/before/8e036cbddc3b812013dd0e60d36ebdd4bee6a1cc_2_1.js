function(name, test){
				message = test(elem, val) || '';
				customMismatchedRule = name;
				if(message){
					if(typeof message != 'string'){
						message = elem.getAttribute('x-moz-errormessage') || elem.getAttribute('data-errormessage') || webshims.customErrorMessages[name][webshims.activeLang()] || webshims.customErrorMessages[name]['']; 
					}
					return false;
				}
			}