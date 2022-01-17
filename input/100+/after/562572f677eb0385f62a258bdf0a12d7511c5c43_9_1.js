function (index) {
        return function (obj) {
            var togo = [];
            fluid.each(obj, function (value, key) {
                togo.push(arguments[index]);
            });
            return togo;
        }; 
    }