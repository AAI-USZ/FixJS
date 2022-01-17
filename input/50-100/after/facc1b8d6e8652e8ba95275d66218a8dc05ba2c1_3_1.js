function(i) {
			if (listProps.colModel[i].sortable !== false) {
				jQuery(this).css('cursor', 'pointer');
				jQuery(this).unbind().click(function (event) {
					event.stopPropagation();
					that.sortList(listProps.colModel[i], this);
				});
			}
		}