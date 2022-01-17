function() {
            var buf = ymacs.getActiveBuffer();
            filepicker.getUrlFromData(buf.getCode(), function(url) {
                filepicker.saveAs(url, "*/*", {"modal":true}, function(){
                    buf.signalInfo("File saved");
                });
            });
        }