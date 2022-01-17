function(ver)
    {
        var v = ver.split(".");
        if (v.length != 3) return 0;
        return parseInt(v[0]) * 100 + parseInt(v[1]) * 10 + parseInt(v[2]);
    }