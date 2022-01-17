function(style,area){

    var width=null;

		var width_percent_pattern = /width:\s?([0-9]+\.?[0-9]+)%/g

		var width_px_pattern = /width:\s?([0-9]+\.?[0-9]+)px/g

		

    $.each(style.split(";"), function(index, property){

        //Look for property starting by width

        if(property.indexOf("width") !== -1){

					

					if(property.match(width_px_pattern)){

						//Width defined in px.

						var result = width_px_pattern.exec(property);

						if(result[1]){

              width = result[1];

							return width;

            }

					} else if(property.match(width_percent_pattern)){

						//Width defined in %.

						var result = width_percent_pattern.exec(property);

						if(result[1]){

							var percent = result[1];

							if(area){

								width = $(area).width()*percent/100;

								return width;

							}

						}

					}

        } 

    });

    return width;

  }