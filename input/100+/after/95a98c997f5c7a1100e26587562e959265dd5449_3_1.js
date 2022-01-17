function (Observer) {

    window.Observer = Observer
    window.subject = null

    module(null, {
        setup : function () {
            subject = new Observer.constructor
        }
    })

    test('Can subscribe', function () {
        expect(0)
        try {
            subject.on('test', function yup () {
                ok(true, 'message received')
            })
        } catch (e) {
            ok(false)
        }
    })

    test("multiple subscriptions", function() {
        expect( 4 )

        subject.on( "sub-a-1 sub-a-2 sub-a-3", function() {
            ok( true )
        })
        subject.publish( "sub-a-1" )

        subject.on( "sub-b-1 sub-b-2", function() {
            ok( true )
        })
        
        subject.on( "sub-b-1 sub-b-3", function() {
            ok( true )
        })
        
        subject.publish( "sub-b-2" )
        subject.publish( "sub-b-2" )
        subject.publish( "sub-b-3" )
    })

    test('Mixin', function () {
        expect(2)
        function Mix () {}
        var mixee = new Mix
        Observer.constructor.mixin(mixee)
        mixee.on("sub-a", function() {
            ok( true)
        })
        mixee.publish("sub-a" )

        Observer.constructor.methods(Mix.prototype)
        mixee = new Mix
        Observer.constructor.call(mixee)
        mixee.on("sub-b", function() {
            ok( true, 'bind methods' )
        })
        mixee.publish( "sub-b" )
    })

    test('Topics are singly invokable', function () {
        expect( 1 )

        subject.on( "sub-a-1", function() {
            ok( false, 'this is a super topic and should not be run')
        })
        subject.on( "sub-a-1.lvl2", function() {
            ok( true, 'You found me and I ran correctly when you asked me to' )
        })

        subject.get( "sub-a-1.lvl2" ).invoke()
    })

    test( "various ways of unsubscribing a specific function", function() {
        expect( 4 )
        var order = 0

        subject.on( "unsubscribe", function one () {
            strictEqual( order, 0, "first subscriber called" )
            order++
        })
        var fn = function two () {
            ok( false, "removed by original reference" )
            order++
        }
        subject.on( "unsubscribe", fn )
        subject.on( "unsubscribe", function three () {
            strictEqual( order, 1, "second subscriber called" )
            order++
        })
        var fn2 = subject.on( "unsubscribe", function four () {
            ok( false, "removed by returned reference" )
            order++
        })
        subject.off( "unsubscribe", fn )
        subject.off( "unsubscribe", fn2 )
        try {
            subject.off( "unsubscribe", function() {})
            ok( true, "no error with invalid handler" )
        } catch ( e ) {
            ok( false, "error with invalid handler" )
        }
        try {
            subject.off( "unsubscribe2", function() {})
            ok( true, "no error with invalid topic" )
        } catch ( e ) {
            ok( false, "error with invalid topic" )
        }
        subject.publish( "unsubscribe" )
    })

    test('Can unsubscribe anonamous functions while leaving named functions', function () {
        expect(2)
        subject.on('test', function () {
            ok(true, 'anonamous function ran')
        })
        function yup () {
            ok(true, 'message received')
        }
        subject.publish('test')
        subject.on('test', yup)
        subject.off('test', '')
        subject.publish('test')
        subject.off('test', yup)
        subject.publish('test')
    })

    test('can multi-unsubscribe', function () {
        expect(1)

        subject.on('a b c', function yup () {
            ok(true, 'message received')
        })
        subject.off('a b', 'yup')
        subject.publish('c')
        subject.publish('b')
        subject.publish('a')
    })

    test( "unsubscribe during publish", function() {
        expect( 3 )
        var order = 0

        function racer() {
            strictEqual(order, 2, 'subs not affected')
        }

        subject.on( "racy", function() {
            strictEqual(order, 0)
            order++
        })
        subject.on( "racy", function () {
            subject.off( "racy", racer )
            strictEqual(order, 1)
            order++
        })
        subject.on( "racy", racer)
        subject.publish( "racy" )
    })

    test('Once: single', function () {
        expect( 2 )

        subject.once("sub-a-1", function() {
            ok( true, 'works with one subscription' )
        })
        subject.publish("sub-a-1")
        subject.publish('sub-a-1')
        strictEqual(subject['sub-a-1']._listeners.length, 0,'No listeners should remain')
    })

    test('Once: multiple' , function () {
        expect( 3 )

        subject.once( "sub-b-1 sub-b-2", function() {
            ok( true, 'works with two subscriptions' )
        })
        
        subject.publish( "sub-b-2" )
        subject.publish( "sub-b-2" )

        strictEqual(subject['sub-b-1']._listeners.length, 0,'sub-b-1 should have been cleared even though it was never called')
        strictEqual(subject['sub-b-2']._listeners.length, 0,'No sub-b-2 listeners should remain')
    })

    test( "continuation", function() {
        expect( 7 )
        subject.on( "continuation", function() {
            ok( true, "first subscriber called" )
        })
        subject.on( "continuation", function() {
            ok( true, "continued after no return value" )
            return true
        })
        strictEqual( subject.publish( "continuation" ), true,
            "return true when subscriptions are not stopped" )

        subject.on( "continuation", function(event) {
            ok( true, "continued after returning true" )
            return false
        })
        subject.on( "continuation", function() {
            ok( false, "continued after returning false" )
        })
        strictEqual( subject.publish( "continuation" ), false,
            "return false when subscriptions are stopped" )
    })

    test( "priority", function() {
        expect( 6 )
        var order = 0
        subject.on( "priority", function() {
            strictEqual( order, 3, "priority default; #1" )
            order++
        })
        subject.on( "priority", function() {
            strictEqual( order, 1, "priority 1; #1" )
            order++
        }, 1 )
        subject.on( "priority", function() {
            strictEqual( order, 4, "priority default; #2" )
            order++
        })
        subject.on( "priority", function() {
            strictEqual( order, 0, "priority 10; #1" )
            order++
        }, 10 )
        subject.on( "priority", function() {
            strictEqual( order, 2, "priority 1; #2" )
            order++
        }, 1 )
        subject.on( "priority", function() {
            strictEqual( order, 5, "priority -1; #1" )
        }, -Infinity )
        subject.publish( "priority" )
    })

    test( "context", function() {
        expect( 3 )
        var obj = {},
            fn = function() {}

        subject.on( "context", function() {
            strictEqual( this, window, "default context" )
        })
        subject.on( "context", obj,function() {
            strictEqual( this, obj, "object" )
        })
        subject.on( "context", fn, function() {
            strictEqual( this, fn, "function" )
        })
        subject.publish( "context" )
    })

    test( "data", function() {
        subject.on( "data", function( data ) {
            strictEqual( data.string, "hello", "string passed" )
            strictEqual( data.number, 5, "number passed" )
            deepEqual( data.object, {
                foo: "bar",
                baz: "qux"
            }, "object passed" )
            data.string = "goodbye"
            data.object.baz = "quux"
        })
        subject.on( "data", function( data ) {
            strictEqual( data.string, "goodbye", "string changed" )
            strictEqual( data.number, 5, "number unchanged" )
            deepEqual( data.object, {
                foo: "bar",
                baz: "quux"
            }, "object changed" )
        })

        var obj = {
            foo: "bar",
            baz: "qux"
        }
        subject.publish( "data", {string: "hello", number:5, object: obj} )
        deepEqual( obj, {
            foo: "bar",
            baz: "quux"
        }, "object updated" )
    })

    test('Specificity ordering', function() {
        expect(5)
        var order = 1
        subject.on('a.b.c.d', function one (data) {
            strictEqual(order, 1, 'fourth level')
            order++
        })
        subject.on('a.b.c', function two (data) {
            strictEqual(order, 2, 'third level')
            order++
        })
        subject.on('a.b', function three (data) {
            strictEqual(order, 3, 'second level')
            order++
        })
        subject.on('a', function four (data) {
            strictEqual(order, 4, 'first level')
            order++
        })
        subject.on(function five (data) {
            strictEqual(order, 5, 'top level no topic')
        })
        subject.publish('a.b.c.d.e.f.g', 'Some data')
    })

    test('Clear sub-topic subscriptions', function() {
        expect(1)
        subject.on( "unsubscribeNull", function() {
            ok( true, "This was supposed to stay" )
        })
        subject.on( "unsubscribeNull.not", function() {
            ok( false, "removed by topic clear" )
        })
        subject.off('unsubscribeNull.not')
        subject.publish( "unsubscribeNull.not" )
    })

    test('Error checking', function () {
        expect(9)
        
        raises(
            function noArgs () {
                subject.on()
            },
            'Insufficient arguments'
        )
        
        raises(
            function nonFuncCallback1 () {
                subject.on('test', 3)
            },
            'Bad callback'
        )
        
        raises(
            function nonFuncCallback2 () {
                subject.on(3)
            },
            'Bad callback'
        )
        
        function nonObjectContext1 () {
            subject.on('test', 2, function () {}, 1)
        }
        try {
            nonObjectContext1()
        } catch (e) {
            ok(false, 'should not throw an erro')
        }
        
        function nonObjectContext2 () {
            subject.on('test', 2, function () {})
        }
        try {
            nonObjectContext2()
        } catch (e) {
            ok(false, 'should not throw an erro')
        }
        
        function nonStringTopic1 () {
            subject.on(1, function () {})
        }
        raises(nonStringTopic1, 'Non string topic 2 args')
        
        function nonStringTopic2 () {
            subject.on(1, function () {}, 1)
        }
        raises(nonStringTopic2, 'Incorrect argument format', 'Non string topic 3 args')
        
        function nonStringTopic3 () {
            subject.on(1, {}, function () {}, 1)
        }
        raises(nonStringTopic3, 'Incorrect argument format', 'Non string topic 4 args')
        
        function incorrectPriority1 () {
            subject.on('test', function () {}, {})
        }
        raises(incorrectPriority1, 'Incorrect argument format', 'Bad priority')
        
        function incorrectPriority2 () {
            subject.on('test', {}, function () {}, 'priority')
        }
        raises(incorrectPriority2, 'Incorrect argument format', 'Bad priority')

        
        raises(
            function () {
                subject.on('on', function () {})
            },
            'namespace clash: on',
            'namespace clash: on'
        )
    })
}