function applyCSS(obj){
			var cssObj = (typeof obj == "undefined") ? API.__CSS : obj;

			for(c in cssObj){
				if(/:active/.test( c ) || API.$( c ).length == 0) continue;
				try {
					// Are we running in RTL mode?
					if(API.settings.isRightToLeft) {
						var floatRight = "float:right";
						var floatLeft = "float:left";
						
						// Does the string contain floatleft?
						if(cssObj[c].indexOf(floatLeft) != -1){
							var match = new RegExp(floatLeft, "gi");
							console.log(match);
							cssObj[c] = cssObj[c].replace(match, floatRight);
							console.log(cssObj[c].replace(match, floatRight));
						} else if(cssObj[c].indexOf(floatRight) != -1){
							// Does it contain floatright? if so switch.
							var match = new RegExp(floatRight, "gi");
							cssObj[c] = cssObj[c].replace(match, floatLeft);
						}
					}
					
					// Apply the CSS
					API.$( c ).attr('style', cssObj[c]);
				} catch(e){
					debug(e.description);	
				}
			}
		}