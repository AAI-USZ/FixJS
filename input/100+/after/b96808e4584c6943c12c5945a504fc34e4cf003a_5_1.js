function (name) {
        return function (that) {
            that.initFunctionRecord.push(name);
        };
    }