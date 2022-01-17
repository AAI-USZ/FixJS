function() {
                    this._form(function() {
                        return function() {
                            this._applyWithArgs("exactly", "blockMod");
                            m = this._apply("trans");
                            return v = this._apply("trans");
                        }.call(this);
                    });
                    return "this.mods && this.mods[" + m + "] === (" + v + ")";
                }