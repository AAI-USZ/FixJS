function(e) {
        translateMode = !translateMode;
        // call dwr service to proceed with toggling
        DWRCustomMessageService.toggleTranslateMode();
        jQuery(this).val("Translate: " + (translateMode ? "ON" : "OFF"));
        location.reload();
	}