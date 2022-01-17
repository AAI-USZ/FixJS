function(r) {
            if (this._failure) {
                if (r.error) {
                    this._failure.call(this._context, r.error);
                } else {
                    this._success.apply(this._context, arguments);
                }
            } else {
                this._success.apply(this._context, arguments);
            }
        }