function(e) {
					e.stopImmediatePropagation();
					if ( e.type == "fucosout" || e.keyCode == $.ui.keyCode.ENTER ) {
						self._endEdit();
					}
					if ( e.keyCode == $.ui.keyCode.ESCAPE ) {
						self._cancelEdit();
					}
				}