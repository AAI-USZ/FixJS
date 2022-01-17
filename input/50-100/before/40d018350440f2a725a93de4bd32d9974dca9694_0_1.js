function (entries) {
        var start = +new Date();
        loop(async,
            function (index) {
                return entries[index].remove();
            }, limit).then(function () {
                ret.callback((+new Date) - start);
            }, comb.hitch(ret, "errback"));
    }