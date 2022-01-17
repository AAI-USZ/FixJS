function(o, k) {                                                                
                                try {
                                    if (s = o.insertUploadedFile(r)) {
                                        if (ed.dom.replace(s, n)) {
                                            ed.nodeChanged();
                                            
                                            return true;
                                        }
                                        
                                        ed.dom.remove(n);
                                    }
                                } catch(e) {
                                    //return showError(e);
                                }
                            }