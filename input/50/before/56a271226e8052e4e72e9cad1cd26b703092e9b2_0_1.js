function(attrs) {
            console.log('f(key)', attrs);
            return attrs.shift().replace(/^'|'$/g, '') + '(' + attrs.shift() + ')';
        }