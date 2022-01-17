function(str, split)
    {
        var arr = str.split(split), i;
        str = new String();
        for (i = 0; i < arr.length; ++i) {
            str += arr[i] + ((i != arr.length - 1) ? this.sep : '');
        }
        return str;
    }