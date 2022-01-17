function() {
            this.textBoxWidget = dijit.byId(this._suggest);
            if (this.textBoxWidget) {
              //enable keyword events
                dojo.connect(this.textBoxWidget, "onKeyUp", dojo.hitch(this, function(e) {
                    if (!this._inProcessKey) {
                        this._inProcessKey = true;
                        var parent = this;
                        dojo.hitch(this, setTimeout(function () {
                            parent._inProcessKey = false;
                            if (dojo.keys.SPACE == e.keyCode || dojo.keys.ENTER == e.keyCode) {
                                parent.processSpaceAction();
                            } else if (dojo.keys.UP_ARROW == e.keyCode) {
                                //TODO: down by suggestion list.
                            } else if (dojo.keys.DOWN_ARROW == e.keyCode) {
                                //TODO: up by suggestion list.
                            } else {
                                parent._setParams(
                                        { limit: parent.limit,
                                          keyword : parent.textBoxWidget.get("value"),
                                          excludes : parent.exclude});
                                //console.debug("suggest", this.textBoxWidget.get("value"));
                                if (!encuestame.utilities.isEmpty(parent.textBoxWidget.get("value"))) {
                                    //call first time suggest.
                                     parent.callSuggest();
                                 }
                              }
                              // this.textBoxWidget //TODO: this.hide() on lost focus.
                        }, this._delay));
                      }
                }));
                //query read store.
                this.store = new dojox.data.QueryReadStore({
                    url: this.url,
                    sortFields : this.sortFields,
                    requestMethod : this.modeQuery}
                );
                 this.callSuggest();
                //enable add button, if not the default add is click on item.
                if (this.addButton) {
                  //check if node exist.
                  if (this._suggestButton) {
                      dojo.style(this._suggestButton, "display", "block");
                      this.buttonWidget = new dijit.form.Button({
                          label: "Add",
                          onClick: dojo.hitch(this, function(event) {
                              dojo.stopEvent(event);
                              this.processSelectedItemButton();
                          })
                      },
                      this._suggestButton);
                  }
                }
                if (this.hideLabel) {
                   if(this._label) {
                     dojo.addClass(this._label,"defaultDisplayHide");
                   }
                }
            } else {
                console.error("Error");
            }
        }