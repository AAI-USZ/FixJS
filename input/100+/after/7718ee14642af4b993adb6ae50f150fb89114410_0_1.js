function (helpers) {
    helpers.oc = function (a) {
        // Thanks to Jonathan Snook: http://snook.ca
        var o = {};
        for(var i=0; i<a.length; i++) {
            o[a[i]]='';
        }
        return o;
    };

    helpers.hash = function (str) {
        // FIXME
        if (str == 'online-users-container') {
            return str;
        }
        var shaobj = new jsSHA(str);
        return shaobj.getHash("HEX");
    };
    return helpers;
})(helpers || {}