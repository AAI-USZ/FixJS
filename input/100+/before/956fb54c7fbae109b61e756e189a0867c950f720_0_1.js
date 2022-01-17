function(size, precision)
    {
        var i;
        var sizes = ["b", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if(size <= 0 || !size)
            return('0 b');
        else{
            i = Math.floor(Math.log(size) / Math.log(1024));
            size = size / Math.pow(1024, i);
            rounded = (Math.round(size * 100)) / 100;
            return rounded + " " + sizes[i];
        }
    }