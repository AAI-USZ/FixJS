function ( selector ) {
		$(selector + " uibutton[ui-implements=cancel]").unbind("click", "cancelClickPopup");
			$(selector + " uibutton[ui-implements=continue]").unbind("click", "cancelTouchPopup");
		$(selector).UIUnblock();
		$(selector).remove();
		$.UIPopUpIdentifier = null;
		$.UIPopUpIsActive = false;
	}