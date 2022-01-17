function(event) {
            this._selectAll = !this._selectAll;
            if (!this._selectAll) {
                 dojo.forEach(
                      this.arrayWidgetAccounts,
                      dojo.hitch(this, function(widget, index) {
                          widget.markAsSelected();
                 }));
                 this._all.innerHTML = this.i18nMessage.social_picker_unselect_all;
            } else {
                dojo.forEach(
                        this.arrayWidgetAccounts,
                        dojo.hitch(this, function(widget, index) {
                            widget.unSelected();
                    }));
                this._all.innerHTML = this.i18nMessage.social_picker_select_all;
            }
            dojo.publish("/encuestame/social/picker/counter/reload");
        }