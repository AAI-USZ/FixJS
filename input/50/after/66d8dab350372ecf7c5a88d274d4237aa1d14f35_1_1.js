function () {
				var cmp_name = jQuery(this).find('.friends_item_name')[0].textContent;
				if (name < cmp_name) {
					jQuery(this).before(to_insert);
					inserted = true;
				}
			}