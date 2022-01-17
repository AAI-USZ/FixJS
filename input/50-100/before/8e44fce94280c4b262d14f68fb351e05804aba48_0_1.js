function() {
        var _cloner = null;
        if (window.jQuery) {
            _cloner = {
                extend: function(destinationObject, originObject) {
                    return jQuery.extend(true, destinationObject, originObject);
                },
                clone: function(clonable) {
                    return jQuery.extend(true, {}, clonable);
                }
            };
        } else if (window.pi) {
            _cloner = window.pi;
        } else {
            throw ('SeedJs needs either PiJs or jQuery');
        }
        return _cloner;
    }