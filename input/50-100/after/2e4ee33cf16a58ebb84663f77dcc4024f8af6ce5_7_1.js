function(url) {
        var defer = osgDB.Promise.defer();
        var img = new Image();
        img.onerror = function() {
            osg.warn("warning use white texture as fallback instead of " + url);
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2P8DwQACgAD/il4QJ8AAAAASUVORK5CYII=";
        };
        img.onload = function() {
            defer.resolve(img);
        };
        img.src = url;
        return defer.promise;
    }