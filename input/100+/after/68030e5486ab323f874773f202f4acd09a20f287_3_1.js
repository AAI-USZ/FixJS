function _extractAttributes(content) {

        // remove the node name and the closing bracket and optional slash
        content = content.replace(/^<\S+\s*/, "");
        content = content.replace(/\s*\/?>$/, "");
        if (content.length === 0) {
            return;
        }

        // go through the items and identify key value pairs split by =
        var index, key, value;
        var attributes = {};
        _findEach(content, [/\s/, 1], true, undefined, function each(item) {
            index = item.search("=");
            if (index < 0) {
                return;
            }

            // get the key
            key = item.substr(0, index).trim();
            if (key.length === 0) {
                return;
            }

            // get the value
            value = item.substr(index + 1).trim();
            value = _removeQuotes(value);
            attributes[key] = value;
        });

        return attributes;
    }