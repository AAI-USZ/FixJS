function(attrs) {
        var result = {};
        if (attrs) {
            attrs.split(reAttrSplit).forEach(function(pair) {
                pair = pair.split('=');
                var name = pair.shift();
                var value = pair.join('=');

                result[ name ] = value.replace(/^"|"$/g, '');
            });
        }

        return result;
    }