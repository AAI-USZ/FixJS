function(r) {
                    if (this.config.save_callback) {
                        Ext.callback(this.config.save_callback,this.config.scope || this,[r]);
                    }
                    e.record.commit();
                    if (!this.config.preventSaveRefresh) {
                        this.refresh();
                    }
                    this.fireEvent('afterAutoSave',r);
                }