function() {
            var buf = this;
            filepicker.getFile("*/*", {"modal":true}, function(url, metadata) {
                buf.setCode("Loading "+metadata.filename+" ...");
                filepicker.getContents(url, function(code){
                    buf.setCode(code);
                    buf.cmd("javascript_dl_mode", true);
                });
            });
        }