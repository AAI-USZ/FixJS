function wrapDialogButtons(buttons) {
		// Buttons automatically close the dialog for convenience
		for (title in buttons) {
			if (buttons.hasOwnProperty(title)) {
				buttons[title] = (function(orgCallback){
					return function(){
						orgCallback.apply(this);
						$(this).dialog('destroy');
					};
				})(buttons[title]);
			}
		}
		return buttons;
	}