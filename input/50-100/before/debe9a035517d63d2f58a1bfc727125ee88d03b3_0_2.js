function(url, metadata) {
                filepicker.getContents(url, function(code){
                    this.setCode(code);
                    buf.cmd("javascript_dl_mode", true);
                });
            }