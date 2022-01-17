function(event, callback) {
            if (!callback || !event) return this;
            var cbObj;
            var removeCbs = function(array) {
                var i = 0;
                while (i < array.length) {
                    cbObj = array[i];
                    if (cbObj.callback == callback) array.splice(i, 1);
                    else i++;
                }
            };
            removeCbs(this._cbs[event] || []);
            removeCbs(this._cbsOne[event] || []);
            return this;
        }