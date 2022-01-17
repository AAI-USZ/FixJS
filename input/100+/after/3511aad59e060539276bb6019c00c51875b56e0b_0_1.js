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
                        this.m_vectors[i].geometry.transform(this.map.dataProjection, proj);
                        this.m_vectors[i].geometry._otp_reprojected = true;
                    }
                    catch(e)
                    {
                        console.log("EXCEPTION: Itinerary.getVectors() reproject: " + e);
                    }
                }
            }
        }

        return this.m_vectors;
    }