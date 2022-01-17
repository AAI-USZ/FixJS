function(e) {
                if (this.active && featureManager.layerRecord.get("name") == "geonode:observations_" + this.layerRecordName) {
                    this.target.summaryId = null;
                }
            }