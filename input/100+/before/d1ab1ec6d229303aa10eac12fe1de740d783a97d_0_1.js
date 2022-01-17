function Blob(parts, properties) {
    if (parts === undefined) {
        parts = [];
    } else {
        if (!Array.isArray(parts)) {
            parts = [parts];
        }
    }

    properties = properties || {};

    var result = '',
        props = {},
        self = this;

    parts.forEach(function(part) {
        result += part;

        if (part instanceof Blob) {
            Object.keys(part).forEach(function(attr) {
                props[attr] = part[attr];
            });
        }
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