function(url, metadata) {
                var buf = ymacs.getBuffer(metadata.filename) || ymacs.createBuffer({ name: metadata.filename });
                buf.setCode("Loading "+metadata.filename+" ...");
                ymacs.switchToBuffer(buf);
                filepicker.getContents(url, function(code){
                    buf.setCode(code);
                    buf.cmd("javascript_dl_mode", true);
                });
            }