function (elem, online) {
		if (online == true){
			group_el = jQuery('.online');
			group = 'online';
			group_other = 'offline';
			
			if (elem.className.search('me') > 0) {
				elem.className = "friends_column_wrapper online me";
			} else {
				elem.className = "friends_column_wrapper online";
			}
			jQuery("div").filter(elem).find("td")[2].textContent = "Online";
		} else {
			group_el = jQuery('.offline');
			group = 'offline';
			group_other = 'online';
			
			if (elem.className.search('me') > 0) {
				elem.className = "friends_column_wrapper offline me";
			} else {
				elem.className = "friends_column_wrapper offline";
			}			
			jQuery("div").filter(elem).find("td")[2].textContent = "";
		}
		
		jQuery('#roster')[0].removeChild(elem);

		if (group_el.length > 0) {
			//console.log('1');			
			var name = elem.getElementsByTagName("td")[1].textContent;
			var inserted = false;
			group_el.each(function () {
				var cmp_name = jQuery(this).find('.friends_item_name')[0].textContent;
				//console.log('name: '+ name + 'cmp_name: ' + cmp_name);
				//console.log(name < cmp_name);
				if (name < cmp_name) {
					jQuery(this).before(elem);
					inserted = true;
					return false;
				}
			});
			if (!inserted) {
				//console.log('2');	
				// insert after last element of group
				jQuery('.' + group).last().after(elem);
			}
		} else {
			if (group == 'online'){
				//console.log('3');	
				jQuery('.' + group_other).first().before(elem);
			} else if (group == 'offline'){
				//console.log('4');	
				jQuery('.' + group_other).last().after(elem);
			}
		}
	}