function(x) {
        var module = require(x);
        module.href = x;
        return module;
    }