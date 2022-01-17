function(){
        stop(2000);
        expect(1);

        var Ajax = new Liquid.Ajax({
            initData: initData,
            useFixtures: true
        });

        $.when(
            Ajax.rpc({
                'service': 'mock',
                'method': 'success',
                'fixture': 'liquid/fixtures/rpc/success.json'
            }),
            Ajax.rpc({
                'service': 'mock',
                'method': 'success',
                'fixture': 'liquid/fixtures/rpc/success.json'
            })
        ).done(
            function () { ok(true, 'Deferred success callback was called'); start(); }
        );
    }