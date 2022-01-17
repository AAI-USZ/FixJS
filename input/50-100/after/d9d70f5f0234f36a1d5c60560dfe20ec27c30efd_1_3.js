function() {
                    this._form(function() {
                        return function() {
                            this._applyWithArgs("exactly", "elem");
                            return e = this._apply("trans");
                        }.call(this);
                    });
                    return "this.elem === (" + e + ")";
                }