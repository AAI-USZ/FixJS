function(zipResponse) {
		try{
			for (var i = 0; i < zipResponse.query.results.json.results.length; i++){
				for (var j = 0; j < zipResponse.query.results.json.results[i].address_components.length; j++){
					if (zipResponse.query.results.json.results[i].address_components[j].types[0] == "country"){
						country = zipResponse.query.results.json.results[i].address_components[j].short_name;
					}
					if (zipResponse.query.results.json.results[i].address_components[j].types == "postal_code"){
						zip = zipResponse.query.results.json.results[i].address_components[j].long_name;
					}
				}
				if (zipResponse.query.results.json.results[i].types[0] == "administrative_area_level_3" ||
					zipResponse.query.results.json.results[i].types[0] == "locality"){
						town = zipResponse.query.results.json.results[i].formatted_address;
				}
			}
		} catch (err){
			//Any errors we can ignore
		}
		if (country == "US" && zip != null){
			$('span.town').html(town);
			$('span.zip').html(zip);
			updateHistory(lat, lng, town);
		} else {
			alert("Sorry! Unable to process your location.");
		}
	}