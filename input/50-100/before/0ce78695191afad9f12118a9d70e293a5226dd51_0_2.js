function(Memplex) {
        this.activeTopnode = Memplex.id;
        
        var position = Helper.getLayerPosition(Memplex.layer);
        this.navigation[position] = Memplex;
        View.create(Memplex);
        
        if ( this.loadCallback != null ) {
            this.loadCallback();
            this.loadCallback = null;
        }
    }