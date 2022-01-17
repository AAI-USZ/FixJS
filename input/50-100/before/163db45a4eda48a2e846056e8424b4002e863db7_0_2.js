function(e) {
                    var oTarget = (e.target == oLI)?e.target:oLI;
                    if (!oTarget.hasClass(this.oCss.d)) {
                        if (e.control) {
                            oTarget.addClass(this.oCss.c);
                        } else {
                            this._fnAlterClass(oTarget, aLI, this.oCss.c);
                        }
                        this._setSelected();
                        this.list.fireEvent("focus", e);
                    }
                }