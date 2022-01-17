function(html){
			var newData = jQuery(html);
			jQuery('#ingredients_form #subgroupNames select').replaceWith(newData);
			jQuery.event.trigger( "newContent", ['ajax', newData] );
		}