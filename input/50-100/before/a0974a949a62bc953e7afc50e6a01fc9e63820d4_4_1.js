function(fileName) {
			var scripts = localStorage.getObject("scripts");
			if(scripts != null) {
				if(typeof scripts[fileName] !== "undefined") {
					return scripts[fileName];
				}
			}
			if(typeof Gibber.defaultScripts[fileName] !== "undefined"){
				return Gibber.defaultScripts[fileName];
			}else{
				window.alert("The file " + fileName +" is not found");
				return null;
			}
		}