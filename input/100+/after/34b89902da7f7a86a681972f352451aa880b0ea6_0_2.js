function applyCSS(obj){
			var cssObj = (typeof obj == "undefined") ? API.__CSS : obj;

			for(c in cssObj){
				if(/:active/.test( c ) || API.$( c ).length == 0) continue;
				try {
					
					// Get CSS item
					var property = cssObj[c];
					
					// Are we running in RTL mode?
					if(API.settings.isRightToLeft) {
						var floatRight = "float:right";
						var floatLeft = "float:left";

						// Does the string contain floatleft?
						if(property.indexOf(floatLeft) != -1){
							var match = new RegExp(floatLeft, "gi");
							property = property.replace(match, floatRight);
						} else if(property.indexOf(floatRight) != -1){
							// Does it contain floatright? if so switch.
							var match = new RegExp(floatRight, "gi");
							property = property.replace(match, floatLeft);
						}
					}
					
					// Apply the CSS
					API.$( c ).attr('style', property);
				} catch(e){
					debug(e.description);	
				}
			}
		}