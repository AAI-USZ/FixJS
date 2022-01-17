function(){  
        stop(2000);
        expect(3);
        
        var Ajax = new Liquid.Ajax({
            initData: initData,
            useFixtures: true
        });

        $.when(
            Ajax.rpc({
                'service': 'mock', 
                'method': 'success',
                'fixture': 'liquid/fixtures/rpc/success.json',
                success    : function () { ok(true, 'Success callback 1 was called');  },
                error      : function () { ok(false, 'Error callback 1 was called'); }
            }),
            Ajax.rpc({
                'service': 'mock', 
                'method': 'success',
                'fixture': 'liquid/fixtures/rpc/success.json',
                success    : function () { ok(true, 'Success callback 2 was called');  },
                error      : function () { ok(false, 'Error callback 2 was called'); }
            })
        ).done(
            function () { ok(true, 'Deferred success callback was called'); start(); }
        );
    }