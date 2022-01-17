function(){
        KYT.vent.unbind("AddUpdateItem");
        $(this.options.gridContainer).trigger("reloadGrid");
        KYT.vent.bind("AddUpdateItem",this.editItem,this);
    }