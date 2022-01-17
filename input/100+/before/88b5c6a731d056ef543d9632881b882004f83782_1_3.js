function(itin, tree) {
        var thisTR = this;
        
        this.processItinerary(itin);
        
        var width = this.panel.getEl().getWidth();
        var height = this.panel.getEl().getHeight();
        this.currentLeft = 0;
        this.currentMouseRect = null;
        this.markerLayer = null;
        this.locationPoint = null;
        this.locationMarker = null;
        
        // compute the resolution of the main terrain graph in ft per pixel
        var res = Math.floor(this.totalDistance / 5000); 
        if(res < 5) res = 5;
        
        // compute the width of the main elevation graphic in pixels
        var terrainWidth = (this.totalDistance*3.2808399)/res + this.nonBikeWalkLegCount*this.nonBikeLegWidth;
        
        // if the graph is wider than what can be displayed without scrolling, 
        // split the panel between the main graph and a "preview" strip 
        var showPreview = (terrainWidth > width);
        var terrainHeight = showPreview ? height * this.terrainPct : height;
        var previewHeight = height - terrainHeight;
        
        // determine the interval at which to show 
        
        var elevSpan = this.maxElev - this.minElev;        
        var elevInterval = Math.floor((elevSpan/terrainHeight)*.5)*100;
        if(elevInterval < 100) elevInterval = 100;
        
        // expand the min/max elevation range to align with interval multiples 
        this.minElev = elevInterval*Math.floor(this.minElev/elevInterval);
        this.maxElev = elevInterval*Math.ceil(this.maxElev/elevInterval);

        // create the container div elements and associated Raphael canvases                     
        this.createContainerDivs(width, height, terrainWidth, showPreview);  
        var axisCanvas = Raphael(this.axisDiv);
        var terrainCanvas = Raphael(this.terrainDiv);
               
        // set up the terrain "cursor" w/ initial x = -10; not visible until
        // mouse first hovers over a terrain segment
        this.terrainCursor = terrainCanvas.rect(-10, 0, 1, terrainHeight).attr({
            fill : '#000',
            stroke : 'none',
            opacity : .75
        });
        
        // draw the "blue sky" background on both terrain and axis canvases
        terrainCanvas.rect(0, 0, terrainWidth, terrainHeight).attr({
            fill : '90-rgb(135,206,255)-rgb(204,245,255)', 
            stroke : 'none'
        });        
        axisCanvas.rect(0, 0, this.axisWidth, terrainHeight).attr({
            fill : '90-rgb(135,206,255)-rgb(204,245,255)', 
            stroke : 'none'
        });
        
        var d, rect;
        
        // draw the axis elevation labels
        var subDivisions = (this.maxElev-this.minElev)/elevInterval;
        var subDivHeight = terrainHeight / subDivisions;
        for (d = 0; d <= subDivisions; d++) {
            var textY = subDivHeight*d;
            axisCanvas.rect(0, textY, this.axisWidth, 1).attr({
                fill: 'white',
                stroke: 'none'
            });
            terrainCanvas.rect(0, textY, terrainWidth, 1).attr({
                fill: 'white',
                stroke: 'none'
            });
            
            if(d == 0) textY += 6;
            if(d == subDivisions) textY -= 6;
            axisCanvas.text(this.axisWidth-3, textY, (this.maxElev-d*elevInterval)+"'").attr({
                fill: 'black',
                'font-size' : '12px',
                'font-weight' : 'bold',
                'text-anchor' : 'end'
            });
        }

        // MAIN LOOP

        var bgLabels = new Array();
        var fgLabels = new Array();
        var mouseRects = new Array();
        var previewXCoords = new Array();
        var previewYCoords = new Array();
        var currentX = 0, lastTerrainHeight = terrainHeight/2;

        // iterate through legs
        for (var li = 0; li < this.legInfoArr.length; li++) {
            var legInfo = this.legInfoArr[li];
            var leg = legInfo.leg; //itin.m_legStore.getAt(li);
            leg.topoGraphSpan = 0;
            var legStartX = currentX;

            // for non-bike/walk legs, insert fixed-width arrow graphic into
            // topo graph indicating a "jump"
            if(leg.get('mode') != "BICYCLE" && leg.get('mode') != "WALK")
            {
                var prevElevY = (li == 0) ? terrainHeight/2 : terrainHeight-terrainHeight*(this.legInfoArr[li-1].lastElev-this.minElev)/(this.maxElev-this.minElev);
                var nextElevY = (li >= this.legInfoArr.length-1) ? terrainHeight/2 : terrainHeight-terrainHeight*(this.legInfoArr[li+1].firstElev-this.minElev)/(this.maxElev-this.minElev);

                if(isNaN(prevElevY) || prevElevY < 0 || prevElevY >= terrainHeight) prevElevY = terrainHeight/2;
                if(isNaN(nextElevY) || nextElevY < 0 || nextElevY >= terrainHeight) nextElevY = terrainHeight/2;

                var midX = currentX + this.nonBikeLegWidth/2;
                var midY = (prevElevY + nextElevY)/2;

                var curve = [["M",currentX+4, prevElevY],["C", midX, prevElevY, midX, prevElevY, midX, midY],["C", midX, nextElevY, midX, nextElevY, currentX+this.nonBikeLegWidth-16, nextElevY]];
                terrainCanvas.path(curve).attr({
                    stroke : 'black', 
                    'stroke-width' : '6',
                    fill : 'none'
                });

                // mode strings (localized to otp.locale by default) 
                var mode    = leg.get('mode').toLowerCase();
                var modeStr = otp.util.Modes.translate(mode, this.locale);
                var imgPath = "images/ui/trip/mode/" + mode + ".png";

                terrainCanvas.image(imgPath, midX-10, midY-10, 20, 20);

                // draw the arrowhead
                terrainCanvas.path(["M",currentX+this.nonBikeLegWidth-16, nextElevY-12, "L", currentX+this.nonBikeLegWidth-4, nextElevY, "L", currentX+this.nonBikeLegWidth-16, nextElevY+12,"z"]).attr({
                    fill: 'black',
                    stroke: 'none'
                });
                terrainCanvas.text(currentX + this.nonBikeLegWidth/2, terrainHeight - 10, modeStr + " " + leg.get('routeShortName')).attr({
                    fill: 'black',
                    'font-size' : '14px',
                    'font-weight' : 'bold'
                });
                
                previewXCoords.push(width*(legStartX)/terrainWidth);
                previewYCoords.push(previewHeight);
                
                previewXCoords.push(width*(legStartX+this.nonBikeLegWidth)/terrainWidth);
                previewYCoords.push(previewHeight);

                currentX += this.nonBikeLegWidth;
                continue;
            }
                        
            // for bike/walk legs, iterate through each step of the leg geometry
            var steps = leg.data.steps;
            var legXCoords = new Array(), legYCoords = new Array();
            for (si = 0; si < steps.length; si++) {
                var step = steps[si];
                var segWidth = (step.distance*3.2808399)/res;
                leg.topoGraphSpan += segWidth;

                var xCoords = new Array(), yCoords = new Array();
                var terrainPoly = null;

                if (step.elevation != undefined) {
                    var elevArr = step.elevation.split(",");
                    if(elevArr.length > 2) {
                        var stepLenM = elevArr[elevArr.length-2]; 
                        for (var j = 0; j < elevArr.length-1; j+=2) {
                            var posM = elevArr[j];
                            var elevFt = elevArr[j+1] * 3.2808399;
                            var x = currentX + (posM/stepLenM)*segWidth;
                            var y = terrainHeight-terrainHeight*(elevFt-this.minElev)/(this.maxElev-this.minElev);
                            if(j >= elevArr.length-2) x += 1;
                            xCoords.push(x);
                            yCoords.push(y);
                            legXCoords.push(x);
                            legYCoords.push(y);
                            previewXCoords.push(width*x/terrainWidth);
                            previewYCoords.push(previewHeight * (0.8 - 0.6*(elevFt-this.minElev)/(this.maxElev-this.minElev)));
                        }

                        var pathStr = "M "+ xCoords[0] + " " + yCoords[0]+ " ";
                        for(var p = 1; p < xCoords.length; p++) {
                            pathStr += "L "+ xCoords[p] + " " + yCoords[p]+ " ";
                        }

                        terrainCanvas.path(pathStr).attr({
                            stroke : 'rgb(34, 139, 34)', 
                            'stroke-width' : '3',
                            fill : 'none'
                        });                

                    }
                    
                    lastTerrainHeight = yCoords[yCoords.length-1];
                }
                
                var streetLabelBG = terrainCanvas.text(currentX + segWidth/2, terrainHeight/2, step.streetName).attr({
                    stroke: 'white',                    
                    'stroke-width' : 3,
                    opacity: 0,
                    'font-size' : '16px'
                });

                var streetLabelFG = terrainCanvas.text(currentX + segWidth/2, terrainHeight/2, step.streetName).attr({
                    fill: 'black',
                    opacity: 0,
                    'font-size' : '16px'
                });
                
                bgLabels.push(streetLabelBG);
                fgLabels.push(streetLabelFG);

                // create a rectangular area in front of this elevation segment
                // to handle mouse envets
                var mouseRect = terrainCanvas.rect(currentX, 0, segWidth, terrainHeight).attr({
                    fill: 'white',
                    'fill-opacity': 0,
                    stroke: 'none'
                });

                mouseRect.poly = terrainPoly;
                mouseRect.labelBG = streetLabelBG;
                mouseRect.labelFG = streetLabelFG;
                mouseRect.leg = leg;
                mouseRect.legStartX = legStartX;

                mouseRect.mouseover(function(event) {
                    // highlight the polygon and show the street name label
                    // for the segment we're entering
                    //if(this.poly != null) this.poly.animate({fill: "rgb(80, 200, 120)"}, 300);
                    this.animate({'fill-opacity': .25}, 300);
                    this.labelBG.animate({opacity: 1}, 300);
                    this.labelFG.animate({opacity: 1}, 300);
                    thisTR.currentMouseRect = this;
                });
                
                mouseRect.mouseout(function(event) {
                    // hide the terrain cursor
                    thisTR.terrainCursor.attr({x : -10});
                    
                    // de-highlight the polygon and hide the street name label
                    // for the segment we're leaving
                    //if(this.poly != null) this.poly.animate({fill: "rgb(34, 139, 34)"}, 300);
                    this.animate({'fill-opacity': 0}, 300);

                    this.labelBG.animate({opacity: 0}, 300);
                    this.labelFG.animate({opacity: 0}, 300);
                    
                    // hide the locator marker on the main map
                    if(thisTR.locationMarker != null) {
                        thisTR.locationMarker.style = { display : 'none' };
                        thisTR.markerLayer.redraw();
                    }
                });

                mouseRect.mousemove(function (event) {
                    // shift terrain cursor to follow mouse movement
                    var nx = Math.round(event.clientX - thisTR.panel.getEl().getLeft() - thisTR.axisWidth - thisTR.currentLeft);
                    thisTR.terrainCursor.attr({x : nx});

                    // also, show / move the locator marker on the main map
                    var distAlongLS = this.leg.get('legGeometry').getLength() * (nx-this.legStartX)/this.leg.topoGraphSpan;
                    thisTR.locationPoint = thisTR.pointAlongLineString(this.leg.get('legGeometry'), distAlongLS);
                    if(thisTR.markerLayer == null) {
                        thisTR.markerLayer = thisTR.map.getMap().getLayersByName('trip-marker-layer')[0];
                    }

                    if(thisTR.locationMarker == null || thisTR.locationMarker.attributes.mode != this.leg.get('mode')) {
                        var topoMarkerID = this.leg.get('mode').toLowerCase()+'-topo-marker';
                        thisTR.locationMarker = thisTR.markerLayer.getFeatureById(topoMarkerID);
                    }
                    thisTR.locationMarker.style = null;
                    thisTR.locationMarker.move(new OpenLayers.LonLat(thisTR.locationPoint.x, thisTR.locationPoint.y));
                });
                
                mouseRect.click(function (event) {
                    // respond to clicks by recentering map
                    if(thisTR.locationPoint != null) {
                        thisTR.map.getMap().setCenter(new OpenLayers.LonLat(thisTR.locationPoint.x, thisTR.locationPoint.y));
                    }
                });
                
                mouseRects.push(mouseRect);
                
                currentX += segWidth;
            } // end of step loop
            
            var polyStr = "M "+ legXCoords[0] + " " + legYCoords[0]+ " ";
            for(var p = 1; p < legXCoords.length; p++) {
                polyStr += "L "+ legXCoords[p] + " " + legYCoords[p]+ " ";
            }

            polyStr += "L "+ legXCoords[legXCoords.length-1] + " " + terrainHeight + " ";
            polyStr += "L "+ legXCoords[0] + " " + terrainHeight + " z";

            terrainPoly = terrainCanvas.path(polyStr).attr({
                fill : "url(images/ui/topo/bg_"+leg.get("mode").toLowerCase()+".png)", //'rgb(34, 139, 34)', 
                opacity : .5,
                stroke : 'none'
            });
        } // end of leg loop
        
        // bring terrain cursor and street labels (currently hidden) to foreground
        thisTR.terrainCursor.toFront();        
        for(var b=0; b < bgLabels.length; b++) {
            bgLabels[b].toFront();
        }
        for(var f=0; f < fgLabels.length; f++) {
            fgLabels[f].toFront();
        }
        for(var m=0; m < mouseRects.length; m++) {
            mouseRects[m].toFront();
        }
        
        // draw preview panel (along bottom), if necessary

        if(showPreview) {
            var previewCanvas = Raphael(this.previewDiv);

            var previewPathStr = "M 0 " + previewHeight + " ";
            for(var p = 0; p < previewXCoords.length; p++) {
                previewPathStr += "L "+ previewXCoords[p] + " " + previewYCoords[p]+ " ";
            }
            previewPathStr += "L " + width + " " + previewHeight + " z";

            previewCanvas.path(previewPathStr).attr({
                stroke : 'none', 
                fill : 'gray'
            });  

            var pctVisible = (width - this.axisWidth) / terrainWidth;
            var sliderWidth = pctVisible*width;
            var slider = previewCanvas.rect(this.currentLeft, 3, sliderWidth, previewHeight-4).attr({
                fill : '#bbb', 
                'fill-opacity' : .5,
                stroke : '#000',
                'stroke-width' : 2
            });
            var rightArrow = previewCanvas.path([
                     "M",this.currentLeft+sliderWidth+6,previewHeight*.25,
                     "L",this.currentLeft+sliderWidth+18,previewHeight*.5,
                     "L",this.currentLeft+sliderWidth+6,previewHeight*.75,"z"]).attr({
                fill : '#000', 
                stroke : 'none',
                opacity : 0
            });
            var leftArrow = previewCanvas.path([
                     "M",this.currentLeft-6,previewHeight*.25,
                     "L",this.currentLeft-18,previewHeight*.5,
                     "L",this.currentLeft-6,previewHeight*.75,"z"]).attr({
                fill : '#000', 
                stroke : 'none',
                opacity : 0
            });
            
            slider.mouseover(function(event) {
                this.animate({fill: "#eee"}, 500);
                rightArrow.animateWith(this, {opacity: 1}, 500);
                leftArrow.animateWith(this, {opacity: 1}, 500);
            });
            slider.mouseout(function(event) {
                this.animate({fill: "#bbb"}, 500);
                rightArrow.animateWith(this, {opacity: 0}, 500);
                leftArrow.animateWith(this, {opacity: 0}, 500);
            });

            var start = function () {
                // storing original coordinates
                this.ox = this.attr("x");
            },
            move = function (dx, dy) {
                var nx = this.ox + dx;
                if(nx < 0) nx = 0;
                if(nx > width-sliderWidth) nx = width-sliderWidth;

                thisTR.currentLeft = Math.round(-(nx/width)*terrainWidth);
                thisTR.terrainDiv.style.left =  thisTR.currentLeft + 'px';

                var ndx = nx - this.attr("x");
                this.attr({x: nx});
                rightArrow.translate(ndx,0);
                leftArrow.translate(ndx,0);
            },
            up = function () {
            };

            slider.drag(move, start, up);
        }
    }