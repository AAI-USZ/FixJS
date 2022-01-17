function (array, func) {
        if (array && array.length > 0) {
            for (var i = 0; i < array.length; i++) {
                var node = array[i];
                if (node && (typeof(func) == "string")) {
                    node[func]();
                } else if (node && (typeof(func) == "function")) {
                    func.call(node);
                }
            }
        }
    }