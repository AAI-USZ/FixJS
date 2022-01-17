function (value, key) {
            var withLabel = key;
            withLabel = withLabel[0].toUpperCase() + withLabel.slice(1, withLabel.length);
            withLabel = 'with' + withLabel;
            
            constructor.prototype[withLabel] = function (value) {
                var adjust = {};
                adjust[key] = value;
                return this.with_(adjust);
            }
        }