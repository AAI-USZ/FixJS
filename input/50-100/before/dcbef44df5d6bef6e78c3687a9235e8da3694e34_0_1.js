function(str,inv) {
        var ret = [];
        for (i=0; i<str.length; i+=2)
            ret[i/2] = parseInt(str.substr(i,2), 16);
        return ret;
    }