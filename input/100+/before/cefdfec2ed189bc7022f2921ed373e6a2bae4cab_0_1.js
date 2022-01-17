function getSiblings(selector, filter, parent, allowText) {
        var ret = [],
            elem = DOM.get(selector),
            parentNode = elem;

        if (elem && parent) {
            parentNode = elem.parentNode;
        }

        if (parentNode) {
            ret = S.makeArray(parentNode.childNodes);
            if (!allowText) {
                ret = DOM.filter(ret, function (el) {
                    return el.nodeType == 1;
                });
            }
            if (filter) {
                ret = DOM.filter(ret, filter);
            }
        }

        return ret;
    }