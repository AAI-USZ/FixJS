function (editable) {

			// Find the index
			var id = Aloha.editables.indexOf( editable );
			// Remove it if really found!
			if (id != -1) {
				Aloha.editables.splice(id, 1);
			}
		}