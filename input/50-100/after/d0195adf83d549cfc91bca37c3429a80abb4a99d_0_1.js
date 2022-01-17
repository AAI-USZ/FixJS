function(path, callback) {
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');

    s.src = path;
    head.appendChild(s);

    if (useragent.isOldIE)
        s.onreadystatechange = function () {
            this.readyState == 'loaded' && callback();
        };
    else
        s.onload = callback;
}