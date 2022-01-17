function(element) {
		var parameters = new Object();
		
		if(element.getAttribute("data-parallax")) {
			var paramStrings = element.getAttribute("data-parallax").split(";");
			
			for(var i = paramStrings.length; i--;) {
				var pair = paramStrings[i].split(":");
				if(pair.length != 2)
					continue;
				
				var value = pair[1].trim();
			
				if(value.toLowerCase() == "true" || value.toLowerCase() == "false")
					parameters[pair[0].trim()] = value.toLowerCase() == "true";
				else if((value.endsWith("px") || value.endsWith("%")) && typeof parseFloat(value) != "NaN")
					parameters[pair[0].trim()] = value;
				else if(typeof parseFloat(value) != "NaN")
					parameters[pair[0].trim()] = parseFloat(value);
			}
		}
		
		return parameters;
	}