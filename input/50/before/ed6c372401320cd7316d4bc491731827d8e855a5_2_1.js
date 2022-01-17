function(e) {
                if (this.active && featureManager.layerRecord.get("name") == "geonode:observations_siteobservation") {
                    this.target.summaryId = null;
                }
            }