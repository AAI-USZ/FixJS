function () {
        var i, self = this, q_arr = [], ret = '',
        val = '', encode = OAuth.urlEncode;
        self.ksort(); // lexicographical byte value ordering of the keys

        for (i in self) {
            if (self.hasOwnProperty(i)) {
                if (i != undefined && self[i] != undefined && self[i] != self.skipQueryEncode) {
                    if (self.skipQueryEncode) {
                        val = i + '=' + self[i];
                    }
                    else {
                        val = encode(i) + '=' + encode(self[i]);
                    }
                    q_arr.push(val);
                }
            }
        }

        if (q_arr.length > 0) {
            ret = q_arr.join('&');
        }

        return ret;
    }