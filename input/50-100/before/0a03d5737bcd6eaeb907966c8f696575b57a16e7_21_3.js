function () {
        var togo = [];
        fluid.each(arguments, function (arr) {
            $.merge(togo, fluid.makeArray(arr));
        });
        return togo;
    }