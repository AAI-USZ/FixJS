function() {
        var res = cond + "?" + t + ":" + e;
        if (this.asgnParens) res = "(" + res + ")";
        return res;
    }