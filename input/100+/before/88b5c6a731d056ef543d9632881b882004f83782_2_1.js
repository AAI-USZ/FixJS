function() {
        this.renderer.clear();
        
        /* draw topographic map */
        
        var hasBikeWalkLeg = false;
        for(var i=0; i<this.m_activeItinerary.m_legStore.getTotalCount(); i++) {
            if(this.m_activeItinerary.m_legStore.getAt(i).get("mode")=="BICYCLE" ||
               this.m_activeItinerary.m_legStore.getAt(i).get("mode")=="WALK") {
                hasBikeWalkLeg = true;
                break;
            }
        }

        if(hasBikeWalkLeg && this.planner.options.showElevationGraph)
        {
            try
            {
                this.ui.innerSouth.getEl().setHeight(180);
                this.ui.innerSouth.show();
                this.ui.viewport.doLayout();
                this.topoRenderer.draw(this.m_activeItinerary, this.m_tripDetailsTree);
            }
            catch(e)
            {
                this.ui.innerSouth.hide();
                this.ui.viewport.doLayout();

                console.log("EXCEPTION in topoRenderer.draw(): " + e);
            }
        }

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