function() {
            //console.debug("_selectedAccount", this._showOnlySelected);
            this._showOnlySelected = !this._showOnlySelected;
            if (this._showOnlySelected) {
                dojo.forEach(
                    this.arrayWidgetAccounts,
                    dojo.hitch(this, function(widget, index) {
                        widget.showIsSelected();
                }));
                this._selected.innerHTML = "Show All";
            } else {
                dojo.forEach(
                        this.arrayWidgetAccounts,
                        dojo.hitch(this, function(widget, index) {
                            widget.show();
                    }));
                this._selected.innerHTML = "Show only selected";
            }
        }