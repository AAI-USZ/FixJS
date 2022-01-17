function(keys, values) {
        var maxdate = (new Date('12/31/1769')).getTime();
        var status = "none";
        var summed = 0;
        for (var i=0; i<values.length; i++) {
            summed += values[i][2];
            var d = new Date(values[i][0]);
            var thisdate = d.getTime();
            if (thisdate > maxdate && values[i][1] != "none") {
                maxdate = thisdate;
                status = values[i][1];
            }
        }
        return [status, summed];
    }