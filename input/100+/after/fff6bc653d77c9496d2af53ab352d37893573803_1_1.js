function(){
        stop(2000);
        expect(2);

        var Ajax = new Liquid.Ajax({
            initData: initData,
            useFixtures: true
        });

        Ajax.rpc({
            'service': 'mock',
            'method': 'success',
            'fixture': 'liquid/fixtures/rpc/success.json',
            success    : function () { ok(true, 'Success callback was called');  },
            error      : function () { ok(false, 'Error callback was called'); }
        }).then(
            function () { ok(true, 'Deferred success callback was called'); start(); },
            function () { ok(false, 'Deferred error callback was called'); start(); }
        );
    }