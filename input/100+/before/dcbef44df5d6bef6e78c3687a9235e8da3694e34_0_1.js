function(x) {
        multx = function(a, b) {
            var i, ret;

            ret = 0;
            for (i=0; i<8; i++) {
                ret = ((b&1)==1) ? ret^a : ret;
                /* xmult */
                a = (a>0x7f) ? 0x11b^(a<<1) : (a<<1);
                b >>>= 1;
            }

            return ret;
        };
        var r = [];
        for (var i=0; i<256; i++)
            r[i] = multx(x, i);
        return r;
    }