function(){
   var initData = {   
       "version":1,
       "debugMode":false,
       "developmentMode":false,
       "connectionHash":"2fd671b1589d1cc83a15d076a3aa27ce",
       "connectionNumber":2,
       "handler":"",
       "config":{},
       "secret":"950b8577721aa9fa9b3a5170945d945cf8eb809a"
    };

    module('liquid/ajax');

    asyncTest('Init', function(){   
        expect(1);
        stop(2000);
        
        var fakeUserModel = {
            findCurrent: function () {
                ok(true, 'findCurrent was called');
                start();
            }
        }
        
        var Ajax = new Liquid.Ajax(
            {
                initData: initData,
                useFixtures: true
            }, 
            {
                init: function () {
                    ok(true, 'init() was called');
                    start();
                }
            }
        );
    });
    
    asyncTest('Success callback', function(){  
        stop(2000);
        expect(1);
        
        var Ajax = new Liquid.Ajax({
            initData: initData,
            useFixtures: true
        });

        Ajax.rpc({
            'service': 'mock', 
            'method': 'success',
            'fixture': 'liquid/fixtures/rpc/success.json',
            success    : function () { ok(true, 'Success callback was called'); start(); },
            error      : function () { ok(false, 'Error callback was called'); start(); }
        });
    });
    
    asyncTest('Deferred success callback', function(){  
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
    });
    
    asyncTest('Deferred success callback using $.when', function(){  
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
    });
    
    asyncTest('Error callback', function(){  
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
    });
    
    asyncTest('Deferred error callback', function(){  
        stop(2000);
        expect(2); 
        
        var Ajax = new Liquid.Ajax({
            initData: initData,
            useFixtures: true
        });

        Ajax.rpc({
            'service': 'mock', 
            'method': 'error',
            'fixture': 'liquid/fixtures/rpc/error.json',
            success    : function () { ok(false, 'Success callback was called');  },
            error      : function () { ok(true, 'Error callback was called'); }
        }).then(
            function () { ok(false, 'Deferred success callback was called'); start(); },
            function () { ok(true, 'Deferred error callback was called'); start(); }
        );
    });
}