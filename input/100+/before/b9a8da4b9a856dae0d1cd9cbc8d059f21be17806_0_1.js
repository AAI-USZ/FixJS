function (event, ui) {
            // change class and image
            $(this)
				.addClass("ui-state-highlight")
				.find("img")
				.removeAttr("src")
				.attr("src", ico_userChecked);

            // disable it so it can"t be used anymore		
            $(this).droppable("disable");

            // change class and image of the source elemenet		
            $(ui.draggable)
				.addClass("ui-state-highlight")
				.find("img")
				.removeAttr("src")
				.attr("src", ico_userChecked);

            // change the icon of the source element				
            $(ui.draggable)
				.find(".ui-icon-shuffle")
				.removeClass("ui-icon-shuffle")
				.addClass("ui-icon-locked");

            var sourceValue = $(ui.draggable).find("input:hidden").val();
            var targetValue = $(this).find("input:hidden").val();

            // remove mapping dialog box line if exists
            if ($("#dialogMappingResult").find("ul > li:first").html() == "No mapping was done yet")
                $("#dialogMappingResult").find("ul").empty();

            // append the mapping to the dialog	
            $("#dialogMappingResult")
				.find("ul")
				.append("<li>" + sourceValue + " >> " + targetValue + "</li>");
        
            // change the input element to contain the mapping target and source
             $(ui.draggable)
				.find(".valSelector")
				.val(sourceValue);
            $(ui.draggable)
				.find(".matchedSelector")
				.val(targetValue);

            // disable it so it can"t be used anymore	
            $(ui.draggable).draggable("disable");

            svgDrawLine($(this), $(ui.draggable));
        }