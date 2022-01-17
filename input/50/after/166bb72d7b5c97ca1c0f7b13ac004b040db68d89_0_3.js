function(view, item) {
        //alert("push "+item.xtype);
        if (item.xtype == "location-show") {
            this.getLocations().deselectAll();

            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    }