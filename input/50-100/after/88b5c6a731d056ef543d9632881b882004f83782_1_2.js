function(event) {
                    // hide the terrain cursor
                    this_.terrainCursor.attr({x : -10});
                    
                    // de-highlight the polygon and hide the street name label
                    // for the segment we're leaving
                    //if(this.poly != null) this.poly.animate({fill: "rgb(34, 139, 34)"}, 300);
                    this.animate({'fill-opacity': 0}, 300);

                    this.labelBG.animate({opacity: 0}, 300);
                    this.labelFG.animate({opacity: 0}, 300);
                    
                    // hide the locator marker on the main map
                    if(this_.locationMarker != null) {
                        this_.locationMarker.style = { display : 'none' };
                        this_.markerLayer.redraw();
                    }
                }