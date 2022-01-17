function(cfg){
            if (util.isObject(cfg)) {
                for (var n in this) {
                    //util.isObject(this[n]) && util.isObject(cfg[n]) ? this[n] = util.deepMix({}, this[n], cfg[n]) : this[n] = cfg[n] ? cfg[n] : this[n];
                    // TODO:
                    this[n] = util.isObject(this[n]) && util.isObject(cfg[n]) ? util.deepMix({},this[n],cfg[n]) : cfg[n] ? cfg[n] : this[n];
                }
            }
        }