function () {
			var active_editable_obj = this.getBaseElement();
			if (!active_editable_obj) {
				return;
			}

			Aloha.activeEditable.obj.attr('aloha-numerated-headers', 'false');
			var headingselector = getCurrentConfig(this).headingselector;
			var headers = active_editable_obj.find(headingselector);
			headers.each(function () {
				$(this).find('span[role=annotation]').each(function () {
					$(this).remove();
				});
			});
		}