function( element, rule ) {
			var message = this.defaultMessage( element, rule.method );
/*
				theregex = /\$?\{(\d+)\}/g;
*/
			if ( typeof message === "function" ) {
				message = message.call(this, rule.parameters, element);
			} 
/* REPLACED BY replaceTokens system. This is built into defaultTokenReplacer         
         else if (theregex.test(message)) {
				message = $.validator.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
*/
         var rt = $.validator.replaceTokens[rule.method];
         if (!rt)
         {
            rt = $.validator.defaultTokenReplacer;
         }
         message = rt.call($.validator, message, element, rule.parameters, $(element).val());
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		}