function () {
			var active_editable_obj = this.getBaseElement();
			if (!active_editable_obj) {
				return;
			}
			
			$(active_editable_obj).find('span[role=annotation]').each(function () {
				$(this).remove();
			});
		}