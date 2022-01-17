function() {
        this.callParent(arguments);
        this.control({
            'viewport recommendedpicks': {
                beforerender: this.onBeforeRender,
                selectionchange: this.onSelectionChange,
                itemclick: this.onItemClick,
                //itemdblclick: this.onSubmit,
                //itemkeydown: this.onItemKeyDown,
                //itemmouseenter: this.onItemRollover,
                //itemmouseleave: this.onItemRollout,
                itemupdate: this.onItemUpdate,
                disable: this.onDisable,
                enable: this.onEnable
            },
            'viewport #recommendedpickwrap': {},
        });

        this.addEvents('playerpicked');

        // listen to events from our store
        this.mon(this.getRecommendedPicksStore(), {
            scope: this,
            beforeload: this.onBeforeLoad,
            load: this.onLoad,
            exception: this.onLoadFail
        });
        // force pick on clock timeout
        this.application.addListener(this.application.TIMEOUT, function() { this.makePick(true); }, this);
        // enable/disable pick button on app status
        this.application.addListener(this.application.STATUS_PICKING, function(data) {
            this.getRecommendedPicksStore().loadRawData(data);
            //this.getRecommendedPicksStore().load();
            //this.getDataView().setDisabled(false);
        }, this);

        // When we begin waiting for the server to tell us to pick again,
        // clear out the store so we don't see the nodes behind the mask
        this.application.addListener(this.application.STATUS_WAITING, function() {
            this.setStatusMessage(this.waitingStatusMsg);
            this.getRecommendedPicksStore().removeAll();
            this.getDataView().setDisabled(true);
        }, this);
        this.application.addListener(this.application.STATUS_PICK_SUCCESS, this.onPickSucceeded, this);
        this.application.addListener(this.application.STATUS_FINISHED, function() {
            var view = this.getDataView();
            if (view.isDisabled()) {
                view.setDisabled(false);
            }
        }, this);
        this.application.addListener(this.application.STATUS_STARTING, function() {
            this.setStatusMessage('The draft will be starting in a few moments...');
        }, this);
    }