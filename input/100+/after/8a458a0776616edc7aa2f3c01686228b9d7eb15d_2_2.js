function() {
            //console.debug("_selectedAccount", this._showOnlySelected);
            this._showOnlySelected = !this._showOnlySelected;
            if (this._showOnlySelected) {
                dojo.forEach(
                    this.arrayWidgetAccounts,
                    dojo.hitch(this, function(widget, index) {
                        widget.showIsSelected();
                }));
                this._selected.innerHTML = this.i18nMessage.social_picker_select_all;
            } else {
                dojo.forEach(
                        this.arrayWidgetAccounts,
                        dojo.hitch(this, function(widget, index) {
                            widget.show();
                    }));
                this._selected.innerHTML = this.i18nMessage.social_picker_only_selected;
            }
        }