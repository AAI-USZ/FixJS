function(e) {
                if (!e.feature.fid) {
                    return;
                }
                if (featureManager.layerRecord.get("name") == "geonode:observations_" + this.layerRecordName) {
                    this.target.summaryId = e.feature.fid;
                }
            }