function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			var json = xmlhttp.responseText;
			try {
  				json = JSON.parse(json);
			} catch (exception) {
  				json = null;
			}
			if(json) {
				print_resolvers(json);
			}
		}
  	}