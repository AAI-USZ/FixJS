function parseCookies(arr) {
    var cookies = {};
    arr.forEach(function(str) {
        var parts = str.split(/\s*;\s*/g).map(function(str) { return str.split('='); });
        var first = parts.shift();
        var options = {};
        parts.forEach(function(part) { options[part.shift()] = part.join('=') || true; });
        cookies[first.shift()] = {
            value: first.join('='),
            toString: function() { return str; },
            options: options
        };
    });
    return cookies;
}