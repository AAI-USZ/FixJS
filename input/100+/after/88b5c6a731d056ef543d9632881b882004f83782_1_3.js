function(itin, tree) {
        
        this.processItinerary(itin);
        
        //var width = this.panel.getWidth();
        var height = this.panel.getHeight();
        //if(width == 0) width = this.map.map.size.w;
        width = this.map.map.size.w;
        if(height == 0) height = 180;
        
        this.render(width, height);
        
        
        this.extWrapper = new Ext.Panel({
            contentEl : this.mainContainerDiv,
            layout: 'fit',
        });
                
    }