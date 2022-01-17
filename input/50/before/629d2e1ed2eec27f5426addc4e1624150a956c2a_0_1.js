function(button){
				var tag = $(button).attr('data-textstyle');
				$(button).attr('data-title', buttonHandler.tooltips[tag].disabled);
			}