function ( selector ) {
		$(selector + " uibutton[ui-implements=cancel]").unbind(window.tapOrClick, "cancelClickPopup");
			$(selector + " uibutton[ui-implements=continue]").unbind(window.tapOrClick, "cancelTouchPopup");
		$(selector).UIUnblock();
		$(selector).remove();
		$.UIPopUpIdentifier = null;
		$.UIPopUpIsActive = false;
	}