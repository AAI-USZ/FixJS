function(file) {
            var url, ed = this.editor, self = this, fileNames = {};
            
            // get url for the file type
            each(self.plugins, function(o, k) {                                
                url = o.getUploadURL(file);
            });
                
            if (url) {                           
                file.upload_url = url;
                
                // dispatch event
                self.FilesAdded.dispatch(file);
                
                var w = 300, h = 300;
                
                ed.execCommand('mceInsertContent', false, '<span id="__mce_tmp" class="mceItemUpload"></span>', {
                    skip_undo : 1
                });
                
                if (/image\/(gif|png|jpeg|jpeg)/.test(file.type)) {
                    w = h = Math.round(Math.sqrt(file.size));
                }

                var n = ed.dom.get('__mce_tmp');

                ed.dom.setAttrib(n, 'id', '');
                ed.dom.setStyles(n, {
                    'width'     : w, 
                    'height'    : h
                });
                ed.undoManager.add();
                
                file.marker = n;
                
                // add files to queue
                self.files.push(file);
            }
        }