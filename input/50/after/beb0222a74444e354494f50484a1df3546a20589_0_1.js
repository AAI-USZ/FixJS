function(){
            start();
            assert.strictEqual(actualEventCount, 90);
            assert.ok(actualStartedAt.sameMonth({year:2012, month: 3}), "actual="+actualStartedAt);
        }