function(proj)
    {
        // rebuild the cache if necessary
        if(!this.m_markers || this.m_markers.length < 1 || !this.m_markers[0].geometry)
        {
            console.log("Itinerary.getMarkers: rebuilding marker cache for this itinerary");
            this.m_markers = new Array();
            this.makeMarkers();
        }

        // reproject layer data if necessary
        if(this.m_markers && proj && proj != this.map.dataProjection)
        {
            for (var i = 0; i < this.m_markers.length; ++i)
            {
                if (this.m_markers[i].geometry && !this.m_markers[i].geometry._otp_reprojected)
                {
                    try
                    {
                        // OL 2.9 hack -- map.getProj() comes back as a string, so we'll convert and retest here
                        // NOTE: this proj check is here because it's only going to get exectued once via the _otp_reprojected check above
                        if(typeof(proj) == 'string')
                        {
                            proj = new OpenLayers.Projection(proj);
                            // retest projection objects and breaking out if same proj as layer
                            if(proj == this.map.dataProjection)
                                break;
                        }

                        // reproject geometry
                        this.m_markers[i].geometry.transform(this.map.dataProjection, proj);
                        this.m_markers[i].geometry._otp_reprojected = true;
                    }
                    catch(e)
                    {
                        console.log("EXCEPTION: Itinerary.getMarkers() reproject: " + e);
                    }
                }
            }
        }

        return this.m_markers;
    }