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
                    this.m_markers[i].geometry._otp_reprojected = true;
                    this.m_markers[i].geometry.transform(this.map.dataProjection, proj);
                }
            }
        }

        return this.m_markers;
    }