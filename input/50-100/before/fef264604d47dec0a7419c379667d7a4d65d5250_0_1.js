function(cfg){
            if (typeof cfg === 'object') {
                for (var n in this) {
                    //this[n] = cfg[n] ? cfg[n] : this[n];
                    util.isObject(this[n]) && util.isObject(cfg[n]) ? this[n] = util.deepMix({}, this[n], cfg[n]) : this[n] = cfg[n] ? cfg[n] : this[n];
                    // TODO:
                    //this[n] = util.isObject(this[n]) && util.isObject(cfg[n]) ? util.deepMix({},this[n],cfg[n]) : cfg[n] ? cfg[n] : this[n];

                }
            }
        }