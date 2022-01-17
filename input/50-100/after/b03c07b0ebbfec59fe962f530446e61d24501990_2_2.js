function(){
        KYT.vent.unbind(this.id+":AddUpdateItem",this.editItem,this);
        KYT.vent.unbind(this.id+":DisplayItem",this.displayItem,this);
        $(this.options.gridContainer).trigger("reloadGrid");
        KYT.vent.bind(this.id+":AddUpdateItem",this.editItem,this);
        KYT.vent.bind(this.id+":DisplayItem",this.displayItem,this);
    }