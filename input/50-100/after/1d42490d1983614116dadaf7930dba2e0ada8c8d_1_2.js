function(item, values) {
        if (!templater.create(item)) {
            for(var v in values) {
                if (values.hasOwnProperty(v)) {
                    // TODO speed up if possible
                    var elm = h.getByClass(v, item.elm, true);
                    if (elm) {
                        elm.innerHTML = values[v];
                    }
                }
            }
        }
    }