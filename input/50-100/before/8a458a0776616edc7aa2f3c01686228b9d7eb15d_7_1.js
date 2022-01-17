function(type, handler) {
        var modalBox = new encuestame.org.core.commons.dialog.ModalBox(dojo.byId("modal-box"), type, dojo.hitch(handler));
        return modalBox;
    }