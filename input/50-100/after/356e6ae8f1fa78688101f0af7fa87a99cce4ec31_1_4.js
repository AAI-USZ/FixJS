function(event) {
            var allCbs = (this._cbs[event] || []).concat(this._cbsOne[event] || []),
                cbObj, i;
            for (i = 0; cbObj = allCbs[i]; i++) {
                cbObj.callback.apply(cbObj.context);
            }
            delete this._cbsOne[event];
            return this;
        }