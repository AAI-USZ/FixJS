function(fileName) {
			var scripts = localStorage.getObject("scripts");
			if(scripts != null) {
				if(typeof scripts[fileName] !== "undefined") {
					return scripts[fileName];
				}
			}
			if(typeof defaults[fileName] !== "undefined"){
				return defaults[fileName];
			}else{
				window.alert("The file " + fileName +" is not found");
				return null;
			}
		}