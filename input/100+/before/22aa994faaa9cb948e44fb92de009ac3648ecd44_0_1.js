function(x, y, html, contentSize)
    {
        var self = otp.core.MapStatic.THIS;

        // step 1: make lat/lon object and tooltip window (just once)
        var ll = otp.util.OpenLayersUtils.getLonLat(self.map, x, y);
        if (!self.tooltipPopup) 
        {
            // popup for map tooltips
            OpenLayers.Popup.ToolTip = OpenLayers.Class(OpenLayers.Popup, { 
                'contentDisplayClass': 'mapTooltipPopup' 
            }); 
            self.tooltipPopup = new OpenLayers.Popup.ToolTip("mapTooltipPopup", null, new OpenLayers.Size(155, 16), null, false);
            self.tooltipPopup.setOpacity(1.00);
            self.map.addPopup(self.tooltipPopup);
        }

        // step 2: add streetview and zoom in links to html
        if(self.tooltipLinks)
        {
            // TODO - localize Zoom In and StreetView strings

            // zoom in link if we're close in, else show the zoom out
            var zoom = "";
            if(self.map.getZoom() < self.CLOSE_ZOOM)
                zoom = ' <a href="javascript:void;" onClick="otp.core.MapStatic.zoomAllTheWayIn(' + x + ',' + y  + ');">' + self.locale.contextMenu.zoomInHere + '</a>';
            else
                zoom = ' <a href="javascript:void;" onClick="otp.core.MapStatic.zoomOut();">' + self.locale.contextMenu.zoomOutHere + '</a>';

            // IE can't do streetview in these map tooltips (freeze's the browser)
            if(Ext.isIE)
                this.noStreetview = true;

            var streetview = null;
            if(!this.noStreetview)
            {
                // if content is longer than 30 characters, we lack tooltip space, so don't break the links to next line nor use the (@Google)
                var svConf = {name:'sv', x:x, y:y};
                if(contentSize && contentSize <= 30)
                {
                    html += '<br/>';
                    svConf.name = 'Streetview (&copy; Google)'
                }
                else
                { 
                    html += ' ';
                    svConf.name = 'Streetview';
                }
                streetview = otp.planner.Templates.THIS.streetviewTemplate.applyTemplate(svConf);
            }


            // append links to tooltip content
            html += '<span class="popLinks">' +  zoom; 

            if(streetview)
            {
                 html += ' | ' + streetview
            }
            html += '</span>';
        }

        self.tooltipPopup.setContentHTML(html);
        self.tooltipPopup.lonlat = ll;
        self.tooltipPopup.updatePosition();
        self.tooltipPopup.show();
    }