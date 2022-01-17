function(url) {
        var a = document.createElement('a');
        a.href = url;
        var h = { protocol:'protocol', hostname:'hostname', host:'host', pathname:'path', port:'port', search:'search', href:'href' };
        for(var k in h) this[h[k]] = a[k];
    }