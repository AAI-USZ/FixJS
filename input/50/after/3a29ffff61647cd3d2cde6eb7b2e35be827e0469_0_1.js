function (editable) {
			var id = jQuery.inArray(editable, Aloha.editables);
			if (id != -1) {
				Aloha.editables.splice(id, 1);
			}
		}