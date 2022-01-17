function(){
            start();
            assert.strictEqual(actualEventCount, 542);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 5}), "actual="+actualStartedAt);
        }