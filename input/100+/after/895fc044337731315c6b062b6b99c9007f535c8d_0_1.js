function (ex) {
                    if (!ex) {
                        // deleted
                        if (w.files[file]) {
//                            delete w.files[file];
                        }
                        else if (w.entries[file] !== undefined) {
                            w.appends.splice(w.entries[file], 1);
                        }
                        
                        _cache = null;
                    }
                    else if (event === 'change') {
                        // modified
                        try {
                            w.reload(file);
                            _cache = null;
                            self.emit('bundle');
                        }
                        catch (e) {
                            self.emit('syntaxError', e);
                            if (self.listeners('syntaxError').length === 0) {
                                console.error(e && e.stack || e);
                            }
                        }
                    }
                    else if (event === 'rename') {
                        watches[file].close();
                        process.nextTick(watch);
                    }
                }