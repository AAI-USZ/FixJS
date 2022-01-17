function() {
                    this._form(function() {
                        return function() {
                            this._applyWithArgs("exactly", "elemMod");
                            m = this._apply("trans");
                            return v = this._apply("trans");
                        }.call(this);
                    });
                    return "this.elemMods && this.elemMods[" + m + "] === (" + v + ")";
                }