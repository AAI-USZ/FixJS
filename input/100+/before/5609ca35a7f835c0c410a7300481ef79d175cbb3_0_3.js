function (jid, name, pic) {
		group_el = jQuery('.online');
		group = 'online';
		to_insert = "<div class='friends_column_wrapper online' id=" + jid + " onclick='console.log(jQuery(this).attr('id'));'>" + 
	                    	"<table class='friends_item'><tr>" + 
	         					"<td><img class='friends_item_picture' src='" + pic + "' alt='userphoto'/></td>" +
	                        	"<td class='friends_item_name'>" + name + "</td>" + 
	                        	"<td class='friends_item_status'>Online</td>" +
	                    	"</tr></table>" + 
	              		"</div>";
		if (group_el.length > 0) {
			var inserted = false;
			group_el.each(function () {
				var cmp_name = jQuery(this).find('.friends_item_name')[0].innerText;
				if (name < cmp_name) {
					jQuery(this).before(to_insert);
					inserted = true;
				}
			});

			if (!inserted) {
				// insert after last element of group
				jQuery('.' + group).last().after(to_insert);
			}
		} else {
			jQuery('.' + 'offline' + ':first-child').before(to_insert);
		}
	}