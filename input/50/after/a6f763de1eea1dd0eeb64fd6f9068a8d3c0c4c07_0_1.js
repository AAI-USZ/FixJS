function (i, v) {
        var pair = v.split('=');
        result[pair[0]] = unescape(pair[1]);
    }