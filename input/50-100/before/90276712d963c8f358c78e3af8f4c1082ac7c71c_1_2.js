function getRoot(dom) {
        var result = [], i;

        while(dom = dom.parentNode) {
            result.push(dom);
        }

        for (var i=result.length - 1; i>-1; i--) {
            // 1. in DocumentFragment
            // 9. Document
            if (result[i].nodeType == 1 || result[i].nodeType == 9) {
                return result[i];
            }
        }
        return null;
    }