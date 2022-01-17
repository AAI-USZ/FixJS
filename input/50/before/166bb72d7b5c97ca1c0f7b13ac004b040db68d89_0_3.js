function(view, item) {
        //alert("push "+item.xtype);
        if (item.xtype == "location-show") {
            this.getContacts().deselectAll();

            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    }