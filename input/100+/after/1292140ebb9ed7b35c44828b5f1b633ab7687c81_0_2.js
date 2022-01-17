function (index) {
            console.log("%s RUN %d...", header, index + 1);
            addResult(res, "total", 1);
            var ret = new comb.Promise();
            comb.serial([
                testInserts.bind(null, false, limit),
                testInserts.bind(null, true, limit),
                testUpdates.bind(null, false, limit),
                testUpdates.bind(null, true, limit),
                testRead.bind(null, false, limit),
                testRead.bind(null, true, limit),
                testDelete.bind(null, false, limit),
                testDelete.bind(null, true, limit)
            ]).then(function (results) {
                    addResult(res, "Serial Insert", results[0]);
                    addResult(res, "Async Insert", results[1]);
                    addResult(res, "Serial Update", results[2]);
                    addResult(res, "Async Update", results[3]);
                    addResult(res, "Serial Read", results[4]);
                    addResult(res, "Async Read", results[5]);
                    addResult(res, "Serial Delete", results[6]);
                    addResult(res, "Async Delete", results[7]);
                    ret.callback();
                }, ret);
            return ret;
        }