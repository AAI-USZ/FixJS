function(versionId) {
            var version = versions[versionId];
            if (!version.version) {
                version.version = {
                    "rows": [{
                        "id": sakai.api.Util.generateWidgetId(),
                        "columns": [{
                            "width": 1,
                            "elements": []
                        }]
                    }]
                }
            } else if (_.isString(version.version)) {
                version.version = $.parseJSON(version.version);
            }
            return version;
        }