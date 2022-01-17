function(self, name, attrs) {
        console.log('func', self, name, attrs);
        attrs = XPath.attrs(attrs);

        if (name in XPath.funcs) {
            return XPath.funcs[name](attrs);
        } else {
            return 'name(' + attrs.join(', ') + ')';
        }
    }