function () {
				var i, editable;

				for ( i = 0; i < Aloha.editables.length; i++) {
					editable = Aloha.editables[i];
					if (!Aloha.activeEditable && !editable.isDisabled()) {
						editable.obj.addClass('aloha-editable-highlight');
					}
				}
			}