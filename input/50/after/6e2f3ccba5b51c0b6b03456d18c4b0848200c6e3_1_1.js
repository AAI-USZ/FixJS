function(p){
					// Turn off any plugins not controlled by queryCommandenabled.
					if(p && !(p instanceof ViewSource) && p.isInstanceOf(_Plugin)){
						p.set("disabled", true)
					}
				}