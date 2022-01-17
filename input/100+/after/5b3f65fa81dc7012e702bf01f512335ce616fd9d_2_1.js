function Blob(parts, properties) {
    parts = typeof parts === 'undefined' ? [] : Array.prototype.concat(parts);
    properties = properties || {};

    var result = parts.length ? parts.shift() : '',
        props = {},
        self = this;

    function getProps(part) {
        if (part instanceof Blob) {
            Object.keys(part).forEach(function(attr) {
                props[attr] = part[attr];
            });
        }
    }

    if (result instanceof Blob) {
        result = result.result;
    }

    getProps(result);
    parts.forEach(function(part) {
        result += part instanceof Blob ? part.result : part;
        getProps(part);
    });

    Object.keys(properties).forEach(function(attr) {
        props[attr] = properties[attr];
    });

    Object.keys(props).forEach(function(attr) {
        if (attr !== 'result') {
            Object.defineProperty(self, attr, {enumerable: true, value: props[attr]});
        }
    });

    Object.defineProperty(this, 'result', {value: result});
}