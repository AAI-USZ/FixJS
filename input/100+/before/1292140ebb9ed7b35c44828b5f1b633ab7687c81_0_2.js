function (index) {
            var ret = new comb.Promise();
            console.log("%s RUN %d...", header, index + 1);
            addResult(res, "total", 1);
            testInserts(false, limit)
                .addCallback(comb.partial(addResult, res, "Serial Insert"))
                .chain(comb.partial(testInserts, true, limit), comb.hitch(ret, "errback"))
                .addCallback(comb.partial(addResult, res, "Async Insert"))
                .chain(comb.partial(testUpdates, false, limit), comb.hitch(ret, "errback"))
                .addCallback(comb.partial(addResult, res, "Serial Update"))
                .chain(comb.partial(testUpdates, true, limit), comb.hitch(ret, "errback"))
                .addCallback(comb.partial(addResult, res, "Async Update"))
                .chain(comb.partial(testRead), comb.hitch(ret, "errback"))
                .addCallback(comb.partial(addResult, res, "Read"))
                .chain(comb.partial(testDelete, false, limit), comb.hitch(ret, "errback"))
                .addCallback(comb.partial(addResult, res, "Serial Delete"))
                .chain(comb.partial(testDelete, true, limit), comb.hitch(ret, "errback"))
                .addCallback(comb.partial(addResult, res, "Async Delete"))
                .then(comb.hitch(ret, "callback", res), comb.hitch(ret, "errback"));
            return ret;
        }