function () {
				var cmp_name = jQuery(this).find('.friends_item_name')[0].innerText;
				if (name < cmp_name) {
					jQuery(this).before(to_insert);
					inserted = true;
				}
			}