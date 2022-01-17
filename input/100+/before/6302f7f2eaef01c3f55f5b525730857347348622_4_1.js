function (arg1, arg2) {

        var key;

        // Check for set(String,String)
        if (typeof arg2 === 'string') {
            console.log('set String: ', arg1, '=' + arg2);
            this._storage[arg1] = arg2;
        } else if (Helper.isArray(arg1) || Helper.isJSON(arg1)) {
            console.log('set(Array||JSON): ', arg1);
            for (key in arg1) {
                if (arg1.hasOwnProperty(key)) {
                    this._storage[key] = arg1[key];
                }
            }
        }
    }