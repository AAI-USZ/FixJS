function(nodes) {
        var result = Object.prototype.toString.call(nodes);
        if (typeof nodes === 'object' && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(result) && (nodes.length == 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0))) {
            return true;
        }
        return false;
    }