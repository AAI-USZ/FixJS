function () {
        if (!ctlr) {
            ctlr = App.getController('Application');
        }
        if (!view) {
            view = Ext.create('Screener.view.PharmacyView');
        }
    }