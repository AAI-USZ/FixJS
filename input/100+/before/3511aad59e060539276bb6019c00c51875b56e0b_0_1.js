function(proj)
    {
        // rebuild the cache if necessary
        if(!this.m_vectors || this.m_vectors.length < 1 || !this.m_vectors[0].geometry)
        {
            console.log("Itinerary.getVectors: rebuilding vector cache for this itinerary");
            this.m_vectors = new Array();
            this.makeRouteLines();
            this.makeWalkLines();
        }

        // reproject layer data if necessary
        if(this.m_vectors && proj && proj != this.map.dataProjection)
        {
            for(var i = 0; i < this.m_vectors.length; ++i)
            {
                if (this.m_vectors[i].geometry && !this.m_vectors[i].geometry._otp_reprojected)
                {
                    this.m_vectors[i].geometry._otp_reprojected = true;
                    this.m_vectors[i].geometry.transform(this.map.dataProjection, proj);
                }
            }
        }

        return this.m_vectors;
    }