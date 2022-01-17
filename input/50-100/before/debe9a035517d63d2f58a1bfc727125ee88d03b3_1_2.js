function(url, metadata) {
                buf.setCode("Loading "+metadata.filename+" ...");
                filepicker.getContents(url, function(code){
                    var buf = ymacs.getBuffer(metadata.filename) || ymacs.createBuffer({ name: metadata.filename });
                    buf.setCode(code);
                    buf.cmd("javascript_dl_mode", true);
                    ymacs.switchToBuffer(buf);
                });
            }