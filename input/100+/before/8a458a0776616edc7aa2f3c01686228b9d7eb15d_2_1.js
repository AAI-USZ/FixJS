function(event) {
            this._selectAll = !this._selectAll;
            if (!this._selectAll) {
                 dojo.forEach(
                      this.arrayWidgetAccounts,
                      dojo.hitch(this, function(widget, index) {
                          widget.markAsSelected();
                 }));
                 this._all.innerHTML = "UnSelect All";
            } else {
                dojo.forEach(
                        this.arrayWidgetAccounts,
                        dojo.hitch(this, function(widget, index) {
                            widget.unSelected();
                    }));
                this._all.innerHTML = "Select All";
            }
            dojo.publish("/encuestame/social/picker/counter/reload");
        }