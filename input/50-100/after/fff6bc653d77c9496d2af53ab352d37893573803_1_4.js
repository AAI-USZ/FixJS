function(){
        stop(2000);
        expect(1);

        var Ajax = new Liquid.Ajax({
            initData: initData,
            useFixtures: true
        });

        Ajax.rpc({
            'service': 'mock',
            'method': 'error',
            'fixture': 'liquid/fixtures/rpc/error.json',
            success    : function () { ok(false, 'Success callback was called'); start(); },
            error      : function () { ok(true, 'Error callback was called'); start(); }
        });
    }