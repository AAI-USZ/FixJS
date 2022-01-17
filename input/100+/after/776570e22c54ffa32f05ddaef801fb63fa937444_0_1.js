function tag(name, attr) {
        if (is_array(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!is_array(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || mitnk_mdict_json_to_dom.defaultNamespace,
                                       vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == "key")
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == "function")
                elem.addEventListener(key.replace(/^on/, ""), val, false);
            else
                elem.setAttributeNS(vals[0] || "", vals[1], val);
        }
        args.forEach(function(e) {
            elem.appendChild(typeof e == "object" ? tag.apply(null, e) :
                             e instanceof Node    ? e : doc.createTextNode(e));
        });
        return elem;
    }