function (func, keyGen) {

        var cache = {};

        keyGen = keyGen || function (args) {
            return JSON.stringify(args);
        };

        return function () {

            var args = slice.call(arguments), 
                key  = keyGen(args);

            return (typeof cache[key] === 'undefined') ? 
                cache[key] = func(args) :
                cache[key];
        };
    }