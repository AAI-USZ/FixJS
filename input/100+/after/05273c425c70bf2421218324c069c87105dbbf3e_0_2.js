function(ed, url) {                        
            // check for support - Opera is disabled because of various bugs, support is basically IE 10+, Firefox 4+, Chrome 7+, Safari 5+
            if (!window.FormData || tinymce.isOpera) {                
                ed.onInit.add(function() {
                    // Block browser default drag over
                    ed.dom.bind(ed.getBody(), 'dragover', function(e) {
                        e.preventDefault();
                    }); 
                    
                    ed.dom.bind(ed.getBody(), 'drop', function(e) {
                        e.preventDefault();
                    });
                });
                
                return;
            }
            
            var self = this;
            self.editor = ed;
            self.plugin_url = url;
            
            ed.onPreInit.add(function() {
                if (!ed.settings.compress.css)
                    ed.dom.loadCSS(url + "/css/content.css");
            });
            
            ed.onInit.add(function() {
                each(ed.plugins, function(o, k) {
                    if (ed.getParam(k + '_dragdrop_upload') && tinymce.is(o.getUploadURL, 'function') && tinymce.is(o.insertUploadedFile, 'function')) {                        
                        self.plugins.push(o);
                    }
                });
                // fake drag & drop in Windows Safari
                if (isSafari && isWin) {
                    ed.dom.bind(ed.getBody(), 'dragenter', function(e) {
                        var dropInputElm;

                        // Get or create drop zone
                        dropInputElm = ed.dom.get(ed.getBody().id + "_dragdropupload");
                        
                        if (!dropInputElm) {
                            dropInputElm = ed.dom.add(ed.getBody(), "input", {
                                'type' : 'file',
                                'id' : ed.getBody().id + "_dragdropupload",
                                'multiple' : 'multiple',
                                'style' : {
                                    position : 'absolute',
                                    display : 'block',
                                    top : 0,
                                    left : 0,
                                    width : '100%',
                                    height : '100%',
                                    opacity : '0'
                                }
                            });
                        }
                        
                        ed.dom.bind(dropInputElm, 'change', function(e) {                                                            
                            // Add the selected files from file input
                            each(dropInputElm.files, function(file) {                                    
                                if (tinymce.inArray(self.files, file) == -1) {
                                    self.addFile(file);
                                }
                            });
										
                            // Remove input element
                            ed.dom.unbind(dropInputElm, 'change');
                            ed.dom.remove(dropInputElm);
                            
                            // upload...
                            each(self.files, function(file) {                        
                                self.upload(file);
                            });
                        });
                    });
                    
                    ed.dom.bind(ed.getBody(), 'drop', function(e) {
                        e.preventDefault();
                    });

                    return;
                }
                
                // Block browser default drag over
                ed.dom.bind(ed.getBody(), 'dragover', function(e) {
                    e.preventDefault();
                });

                // Attach drop handler and grab files
                ed.dom.bind(ed.getBody(), 'drop', function(e) {
                    var dataTransfer = e.dataTransfer;

                    // Add dropped files
                    if (dataTransfer && dataTransfer.files && dataTransfer.files.length) {                        
                        each(dataTransfer.files, function(file) {
                            self.addFile(file);
                        });
                    }
                    // upload...
                    each(self.files, function(file) {                        
                        self.upload(file);
                    });

                    e.preventDefault();
                });

                /*ed.onPaste.add(function(ed, e) {
                    if(e.clipboardData) {
                        var items = e.clipboardData.items;
                        
                        if (items) {
                            each(items, function(item) {
                                var file = item.getAsFile();
                                    
                                if (file && file.type) {
                                    self.addFile(file);
                                }
                                    
                                // upload...
                                each(self.files, function(file) {                        
                                    self.upload(file);
                                });

                                e.preventDefault();
                            });
                        }
                    }
                });*/

            });

            // Setup plugin events
            self.FilesAdded         = new tinymce.util.Dispatcher(this);
            self.UploadProgress     = new tinymce.util.Dispatcher(this);
            self.FileUploaded       = new tinymce.util.Dispatcher(this);
            self.UploadError        = new tinymce.util.Dispatcher(this);
            
            this.settings = {
                multipart   : true,
                multi_selection : true,
                file_data_name : 'file',
                filters : []
            };
            
            self.FileUploaded.add(function(file, o) {
                var n = file.marker, s;
                
                if (n) {                                                                                         
                    if (o && o.response) {
                        var r = JSON.parse(o.response);
                            
                        if (r.error) {
                            
                            var txt = r.text || r.error;

                            ed.windowManager.alert(txt);
                            ed.dom.remove(n);
                                
                            return false;
                        }
                        
                        if (file.status == state.DONE) {
                            r.type = file.type;

                            each(self.plugins, function(o, k) {                                                                
                                if (s = o.insertUploadedFile(r)) {
                                    return ed.dom.replace(s, n);
                                }
                            });
                            
                            // remove from list
                            self.files.splice(tinymce.inArray(self.files, file), 1);
                        }
                    } else {
                        ed.windowManager.alert(ed.getLang('upload.response_error', 'Invalid Upload Response'));
                        ed.dom.remove(n);
                                
                        return false;
                    }
                    
                    ed.dom.remove(n);
                }
            });
            
            self.UploadError.add(function(o) {
                ed.windowManager.alert(o.code + ' : ' + o.message);
                
                if (o.file && o.file.marker) {
                    ed.dom.remove(o.file.marker);
                }
                
            });
            
            self.UploadProgress.add(function(file) {
                file.marker.innerHTML = '<span class="upload-progress">' + Math.round(file.loaded / file.size * 100) + '</span>';
            });
        }