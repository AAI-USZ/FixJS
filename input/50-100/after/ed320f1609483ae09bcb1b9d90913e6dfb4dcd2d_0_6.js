function(r, g, b)
    {
        var hex = [
            Math.ceil(r).toString(16),
            Math.ceil(g).toString(16),
            Math.ceil(b).toString(16)
        ];
        $.each(hex, function(nr, val)
        {
            if (val.length === 1)
            {
                hex[ nr ] = "0" + val;
            }
        });
        return hex.join("").toUpperCase();
    }