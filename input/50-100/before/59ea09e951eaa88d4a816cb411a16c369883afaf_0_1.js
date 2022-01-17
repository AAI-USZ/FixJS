function(store, records) {
        var view = this.getDataView();
        view.select(0);

        // draw edit buttons for each item
        view.getEl().select('.recommended_pick .edit', true).each(this.createEditButton);
        /**
         * This is a hack to force a redraw, since autoScroll doesn't play nice with
         * a dataview that just had an item update (or something) when using a 'fit' layout.
         */
        view.hide().show();

        // update status message
        this.setStatusMessage('Success!');
        this.getDataView().setDisabled(false);
    }