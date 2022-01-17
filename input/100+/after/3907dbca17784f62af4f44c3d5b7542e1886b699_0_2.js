function(element) {
		var parameters = new Object();
		
		if(element.getAttribute("data-parallax")) {
			var paramStrings = element.getAttribute("data-parallax").split(";");
			
			for(var i = paramStrings.length; i--;) {
				var pair = paramStrings[i].split(":");
				if(pair.length != 2)
					continue;
				
				var value = pair[1].trim().split(" ");

				if(value.length == 1)
					parameters[pair[0].trim()] = Parallax.fixParameterDataType(value[0].trim());
				else {
					for(var j = value.length; j--;)
						value[j] = Parallax.fixParameterDataType(value[j].trim());

					parameters[pair[0].trim()] = value;
				}
			}
		}
		
		return parameters;
	}