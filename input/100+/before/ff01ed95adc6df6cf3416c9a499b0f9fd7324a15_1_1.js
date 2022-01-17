function(subjects, code, originalAttribute) {
		code = code? PrefixFree.prefixCSS(code.trim()) : '';
		
		if(!code || self.isCSSValid(code)) {
			dummy.setAttribute('style', code);
			
			var appliedCode = dummy.style.cssText,
			    properties = appliedCode.match(/\b[a-z-]+(?=:)/gi),
			    propRegex = [];
			
			if(code) {
				for(var i=0; i<properties.length; i++) {
					properties[i] = self.util.camelCase(properties[i]);
				}
			}
			
			for (var i=0; i<subjects.length; i++) {
				var element = subjects[i],
					prevStyle = element.getAttribute('style');
				
				if(prevStyle && prevStyle !== 'null') {
					if(code) {
						for(var j=0; j<properties.length; j++) {
							element.style[properties[i]] = null;
						}
					}
					
					element.setAttribute('style', (element.getAttribute(originalAttribute) || '') + '; ' + code);
				}
				else {
					element.setAttribute('style', code);
				}
			}
			
			return true;
		}
		else {
			return false;
		}
	}