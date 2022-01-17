function(headers) {
        var h = '';
        for (n in headers) h += '<tr><th><code>'+n+':</code></th><td><code>'+headers[n] + '</code></td></tr>';
        return h;
    }