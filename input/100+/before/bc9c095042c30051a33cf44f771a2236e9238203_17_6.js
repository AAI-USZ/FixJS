function(data) {
            var files = [];
            if (data) {
                for (var i in data.results) {
                    if (data.results.hasOwnProperty(i)) {
                        var mimeType = sakai.api.Content.getMimeTypeData(sakai.api.Content.getMimeType(data.results[i])).cssClass;
                        var tempFile = {
                            "dottedname": sakai.api.Util.applyThreeDots(data.results[i]["sakai:pooled-content-file-name"], 100),
                            "name": data.results[i]["sakai:pooled-content-file-name"],
                            "url": "/content#p=" + sakai.api.Util.safeURL(data.results[i]["_path"]) + "/" + sakai.api.Util.safeURL(data.results[i]["sakai:pooled-content-file-name"]),
                            "css_class": mimeType
                        };
                        files.push(tempFile);
                    }
                }
                renderObj.files = files;
                renderObj.filestotal = data.total;
                renderResults();
            }
        }