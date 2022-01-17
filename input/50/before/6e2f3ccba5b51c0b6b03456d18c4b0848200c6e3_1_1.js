function(p){
					// Turn off any plugins not controlled by queryCommandenabled.
					if(p && !(p instanceof ViewSource)){
						p.set("disabled", true)
					}
				}