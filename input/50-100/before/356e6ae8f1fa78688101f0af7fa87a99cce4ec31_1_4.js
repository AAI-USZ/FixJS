function(event) {
            var allCbs = (this._cbs[event] || []).concat(this._cbsOne[event] || []);
            var cbObj;
            for (var i=0; i<allCbs.length; i++) {
                cbObj = allCbs[i];
                cbObj.callback.apply(cbObj.context);
            }
            delete this._cbsOne[event];
            return this;
        }