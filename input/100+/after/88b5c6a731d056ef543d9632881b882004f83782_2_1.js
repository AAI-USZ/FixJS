function() {
        this.renderer.clear();
                
        this.drawTopography();

        this.renderer.draw(this.m_activeItinerary, this.m_tripDetailsTree);
        this.planner.controller.activate(this.CLASS_NAME);
        
        /* Show alternative routes */
        /* ------------------------------------------------- */
        var els = Ext.query('.dir-alt-route-inner');        
        for (var i=0; i < els.length; i++) {
        	var el = Ext.get(els[i]);
        	el.removeAllListeners();
        	el.on('mouseover', this.mouseOverItineraryFn.createCallback(this, el));
        	el.on('mouseout', this.mouseOutItineraryFn.createCallback(this, el));
        }
        /* ------------------------------------------------- */

    }