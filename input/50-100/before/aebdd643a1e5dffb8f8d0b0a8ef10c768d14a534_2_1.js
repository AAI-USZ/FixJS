function(code){
                    buf.setCode(code);
                    buf.cmd("javascript_dl_mode", true);
                    ymacs.switchToBuffer(buf);
                }