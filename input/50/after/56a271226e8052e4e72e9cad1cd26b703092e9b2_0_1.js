function(attrs) {
            return attrs.shift().replace(/^'|'$/g, '') + '(' + attrs.shift() + ')';
        }