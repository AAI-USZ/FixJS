function(error) {
        var modal = this._createModalBox("alert", null);
        if (modal != null) {
        	modal.show(error == null ? encuestame.constants.errorCodes["023"] : error);
        }
    }