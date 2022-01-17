function(e) {
                    if (!e.target.hasClass(this.oCss.d)) {
                        this._fnAlterClass(e.target, aLI, this.oCss.c);
                        this._setSelected();
                        document.removeEvent("keydown", this.fnNavigate);
                    }
                }