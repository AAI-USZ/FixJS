function(headers) {
        var h = '';
        for (n in headers) h += '<li>'+n+': '+headers[n];
        return h;
    }