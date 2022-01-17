function pluginDepWriter(configArray, pluginName) {
			// We don't need an array in an array.
			configArray = configArray[0];	
			
			// Split these into either the css or js array.
			for (i = 0; i < configArray.length; i++) {
				var depName = String(configArray[i]);
				var depSuffix = depName.substr(depName.length-3, depName.length);
				var depSrc = rootDir + addOnLocation + pluginName + "/" + depName;
				switch(depSuffix) {
					case ".js":
					$('body').append('<script type="text/javascript" src="' + depSrc + '"></script>');
					break;
					
					case "css":
					$('head').append('<link type="text/css" rel="stylesheet" href="'+ depSrc +'" />');
					break;
				}
			}
		}