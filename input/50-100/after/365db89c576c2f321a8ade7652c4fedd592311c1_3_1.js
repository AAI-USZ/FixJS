function(record, op) {
                this._unmask();
                if(!op.success) {
                    this._handleComError('Save settings', op);
                    return;
                }
                this.settings = settingData;
                this._saveReadyForExportRecord(callback, scope);
            }