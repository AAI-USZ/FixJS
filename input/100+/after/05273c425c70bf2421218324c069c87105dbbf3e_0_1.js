function() {
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

            }