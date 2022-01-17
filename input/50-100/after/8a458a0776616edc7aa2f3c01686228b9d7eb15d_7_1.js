function(type, handler) {
    	var modal = dojo.byId("modal-box");
    	if (modal != null) {
    		var modalBox = new encuestame.org.core.commons.dialog.ModalBox(dojo.byId("modal-box"), type, dojo.hitch(handler));
    		return modalBox;
    	} else {
    		return null;
    	}
    }