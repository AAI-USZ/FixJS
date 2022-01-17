function() {
                    this._form(function() {
                        return function() {
                            this._applyWithArgs("exactly", "block");
                            return e = this._apply("trans");
                        }.call(this);
                    });
                    return "this.block === (" + e + " )";
                }