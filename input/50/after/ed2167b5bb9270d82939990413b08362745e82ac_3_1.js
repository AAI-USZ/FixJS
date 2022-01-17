function (evt) {
            return this._function.call(this._scope, evt, this._args,this._resIndex,this._apply);
        }