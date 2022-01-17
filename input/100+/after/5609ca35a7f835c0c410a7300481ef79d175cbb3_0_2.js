function (elem, online) {
		if (online == true){
			group_el = jQuery('.online');
			group = 'online';
			group_other = 'offline';
			
			elem.className = "friends_column_wrapper online";
			elem.getElementsByTagName("td")[2].innerHTML = "Online";
		} else {
			group_el = jQuery('.offline');
			group = 'offline';
			
			elem.className = "friends_column_wrapper offline";
			elem.getElementsByTagName("td")[2].innerHTML = "";
		}
		
		jQuery('#roster')[0].removeChild(elem);

		if (group_el.length > 0) {			
			var name = elem.getElementsByTagName("td")[1].innerText;
			var inserted = false;
			group_el.each(function () {
				var cmp_name = jQuery(this).find('.friends_item_name')[0].innerText;
				if (name < cmp_name) {
					jQuery(this).before(elem);
					inserted = true;
				}
			});
			if (!inserted) {
				// insert after last element of group
				jQuery('.' + group).last().after(elem);
			}
		} else {
			if (group == 'online'){
				jQuery('.' + group_other).first().before(elem);
			} else if (group == 'offline'){
				jQuery('.' + group_other).last().after(elem);
			}
		}
	}