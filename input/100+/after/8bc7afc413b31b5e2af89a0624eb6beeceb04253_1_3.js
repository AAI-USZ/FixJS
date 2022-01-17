function(_, $, Request, Example) {
    var data, ajax = $.ajax,
        swapAjax = function(request) {
            request.ajax = function(params) {
                var dfd = $.Deferred();
                setTimeout(function() {
                    var ret = {total: 0, resources: []};
                    dfd.resolve(ret, {status: 200});
                    params.success(ret, 200, {status: 200});
                }, 0);
                return dfd;
            };
        },
        unswapAjax = function(request) {
            request.ajax = ajax;
        },
        ajax_failed = function() {
            throw Error('ajax request failed');
            // ok(false, 'ajax request failed');
            // start();
        };

    test('construction', function() {
        var query = Example.query(), retval;
        strictEqual(query.manager, Example.models);
        deepEqual(query.params, {});
        strictEqual(query.request.name, 'query');

        retval = query.exclude('alpha', 'beta');
        strictEqual(retval, query);
        deepEqual(query.params.exclude.sort(), ['alpha', 'beta']);

        var filters = {alpha: 'test', beta__in: [1, 2]};
        retval = query.filter(filters);
        strictEqual(retval, query);
        deepEqual(query.params.query, filters);

        retval = query.include('alpha', 'beta');
        strictEqual(retval, query);
        deepEqual(query.params.include.sort(), ['alpha', 'beta']);

        retval = query.limit(2);
        strictEqual(retval, query);
        strictEqual(query.params.limit, 2);

        retval = query.offset(2);
        strictEqual(retval, query);
        strictEqual(query.params.offset, 2);

        retval = query.sort('alpha', '-beta');
        strictEqual(retval, query);
        deepEqual(query.params.sort, ['alpha', '-beta']);

        retval = query.reset();
        strictEqual(retval, query);  
        deepEqual(query.params, {});
    });

    asyncTest('count-only request', function() {
        var query = Example.query();
        swapAjax(query.request);
        query.count().then(function(total) {
            strictEqual(total, 0);
            unswapAjax(query.request);
            start();
        }, ajax_failed);
    });

    asyncTest('empty result', function() {
        var query = Example.query();
        swapAjax(query.request);
        query.execute().then(function(data) {
            ok(data.complete);
            strictEqual(data.status, 'ok');
            strictEqual(data.total, 0);
            deepEqual(data.resources, []);
            unswapAjax(query.request);
            start();
        }, ajax_failed);
    });

    module('collection change events');
    data = {
        total: 10,
        resources: _(10).range().map(function(i) {
            return {id: i+1, required_value: 'foo '+i, name: 'bar '+i};
        })
    };

    asyncTest('model change triggers collection change event', function() {
        var donezo = false, collection = Example.collection(), done = false;

        collection.query.request.ajax = function(params) {
            params.success(data, 200, {});
        };

        collection.on('change', function(eventName, collection, model) {
            if (!donezo) {
                ok(donezo = true); // assert that this worked
                equal(model, collection.models[0]);
                start();
            }
        }).load().done(function() {
            setTimeout(function() {
                if (!donezo) {
                    ok(false, 'no change event was triggered on the collection');
                    start();
                }
            }, 100);
            collection.models[0].set('name', 'boom');
        });
    });

    asyncTest('model change triggers multiple collection change events', function() {
        var donezo = false,
            collection1 = Example.collection(),
            collection2 = Example.collection();

        collection1.query.request.ajax = collection2.query.request.ajax =
            function(params) {
                params.success(data, 200, {});
            };

        collection2.on('change', function() {
            if (!donezo) {
                ok(donezo = true);
                start();
            }
        });
        
        $.when(collection1.load(), collection2.load()).done(function() {
            setTimeout(function() {
                if (!donezo) {
                    donezo = true;
                    ok(false, 'no change event was triggered on the collection');
                    start();
                }
            }, 100);
            collection1.models[0].set('name', 'pow');
        });
    });

    asyncTest('added model still triggers collection change events', function() {
        var donezo = false,
            collection = Example.collection(),
            count = 0,
            addUpdateEventFired = false;

        collection.query.request.ajax = function(params) {
            params.success(data, 200, {});
        };

        collection.on('change', function(eventName, collection, model) {
            ok(donezo = true);
            ok(addUpdateEventFired);
            equal(model.name, 'pop');
            start();
        }).on('update', function(eventName, collection, models) {
            if (++count === 2) {
                equal(models[0].type, 'extra');
                addUpdateEventFired = true;
            }
        }).load().done(function() {
            setTimeout(function() {
                if (!donezo) {
                    ok(false, 'no change event was triggered on the collection');
                    start();
                }
            }, 100);
            collection.add(Example({type: 'extra'}));
            collection.models[0].set('name', 'pop');
        });
    });

    module('load behavior');

    var dummyAjax = function(params) {
        var num = params.data.limit? params.data.limit : 10;

        setTimeout(function() {
            var split, ret = _.reduce(_.range(num), function(memo, i) {
                memo.resources.push({name: 'item ' + i});
                if (num < 10) {
                    _.last(memo.resources).foo = 'bar';
                }
                return memo;
            }, {total: num, resources: []});
            params.success(ret, 200, {});
        }, 50);
    };

    // siq/mesh issue #10 corner case 1
    asyncTest('calling load twice w/o query change returns the same deferred', function() {
        var collection = Example.collection(), dfd1, dfd2;

        collection.query.request.ajax = dummyAjax;

        dfd1 = collection.load();
        dfd2 = collection.load();

        ok(dfd1 === dfd2, 'two consecutive calls should return the same deferred');
        $.when(dfd1, dfd2).done(start);
    });

    // siq/mesh issue #10 corner case 2
    asyncTest('calling load again after first load w/o query changes returns the same deferred', function() {
        var collection = Example.collection(), dfd1;

        collection.query.request.ajax = dummyAjax;
        dfd1 = collection.load();

        dfd1.done(function() {
            var dfd2 = collection.load();
            ok(dfd1 === dfd2, 'two calls of same query should return the same deferred');
            dfd2.done(start); // just to be safe...
        });
    });

    // siq/mesh issue #10 corner case 3 test 1
    asyncTest('call load then change query via "reset" before load finishes', function() {
        var collection = Example.collection(), cancelledDfd, newDfd, donezo = false;
        collection.query.request.ajax = dummyAjax;
        (cancelledDfd = collection.load()).then(function() {
            ok(false, 'cancelledDfd should never resolve');
            if (!donezo) {
                donezo = true;
                start();
            }
        }, function() {
            ok(false, 'cancelledDfd should never fail');
            if (!donezo) {
                donezo = true;
                start();
            }
        });

        collection.reset({limit: 5});
        newDfd = collection.load();

        ok(newDfd !== cancelledDfd, 'second load call should return a differentd dfd');
        
        newDfd.then(function(results) {
            ok(true, 'successfully loaded after cancelled');
            equal(results.length, 5);
            _.each(results, function(model) {equal(model.foo, 'bar');});
            if (!donezo) {
                donezo = true;
                start();
            }
        }, function() {
            ok(false, 'second deferred should not be cancelled');
            if (!donezo) {
                donezo = true;
                start();
            }
        });
    });

    // siq/mesh issue #10 corner case 3 test 2
    asyncTest('call load then change query before load finishes', function() {
        var cancelledDfd, newDfd,
            collection = Example.collection({limit: 5}),
            donezo = false;
        collection.query.request.ajax = dummyAjax;
        (cancelledDfd = collection.load()).then(function() {
            ok(false, 'cancelledDfd should never resolve');
            if (!donezo) {
                donezo = true;
                start();
            }
        }, function() {
            ok(false, 'cancelledDfd should never fail');
            if (!donezo) {
                donezo = true;
                start();
            }
        });

        newDfd = collection.load({limit: null});

        ok(newDfd !== cancelledDfd, 'second load call should return a differentd dfd');
        
        newDfd.then(function(results) {
            ok(true, 'successfully loaded after cancelled');
            equal(results.length, 10);
            _.each(results, function(model) {ok(model.foo == null);});
            if (!donezo) {
                donezo = true;
                start();
            }
        }, function() {
            ok(false, 'second deferred should not be cancelled');
            if (!donezo) {
                donezo = true;
                start();
            }
        });
    });

    var secondCallHasResolved = false,
        outOfOrderAjaxCount = 0,
        outOfOrderDfds = [$.Deferred(), $.Deferred()],
        outOfOrderAjax = function(params) {
            var num = params.data.limit? params.data.limit : 10,
                localCount = outOfOrderAjaxCount;

            setTimeout(function() {
                var split, ret = _.reduce(_.range(num), function(memo, i) {
                    memo.resources.push({name: 'item ' + i});
                    if (num < 10) {
                        _.last(memo.resources).foo = 'bar';
                    }
                    return memo;
                }, {total: num, resources: []});

                if (localCount === 0) {
                    equal(secondCallHasResolved, true, 'first call occurred after second');
                } else {
                    equal(secondCallHasResolved, false, 'second call occurred before first');
                    secondCallHasResolved = true;
                }

                params.success(ret, 200, {});
                if (outOfOrderDfds[localCount]) {
                    console.log('resolving dfd',localCount);
                    outOfOrderDfds[localCount].resolve();
                }
            }, outOfOrderAjaxCount > 0? 0 : 100);

            outOfOrderAjaxCount++;
        };

    // siq/mesh issue #10 corner case 3 test 3
    asyncTest('first load call returns AFTER second', function() {
        var collection = Example.collection(), cancelledDfd, newDfd, donezo = false;
        collection.query.request.ajax = outOfOrderAjax;
        (cancelledDfd = collection.load()).then(function() {
            ok(false, 'cancelledDfd should never resolve');
            if (!donezo) {
                donezo = true;
                start();
            }
        }, function() {
            ok(false, 'cancelledDfd should never fail');
            if (!donezo) {
                donezo = true;
                start();
            }
        });

        collection.reset({limit: 5});
        newDfd = collection.load();

        ok(newDfd !== cancelledDfd, 'second load call should return a differentd dfd');
        
        newDfd.then(function(results) {
            ok(true, 'successfully loaded after cancelled');
            equal(results.length, 5);
            _.each(results, function(model) {equal(model.foo, 'bar');});
            if (!donezo) {
                donezo = true;
                $.when.apply($, outOfOrderDfds).done(start);
            }
        }, function() {
            ok(false, 'second deferred should not be cancelled');
            if (!donezo) {
                donezo = true;
                start();
            }
        });
    });

    // siq/mesh issue #10 corner case 4 (actually more of a common case)
    asyncTest('calling load twice w/o query change returns the same deferred', function() {
        var collection = Example.collection(), dfd1, dfd2;

        collection.query.request.ajax = dummyAjax;

        dfd1 = collection.load();

        dfd1.done(function() {
            ok(true, 'first load call succeeded and resolved');
            equal(collection.models.length, 10);

            collection.reset({limit: 5});
            dfd2 = collection.load();

            ok(dfd1 !== dfd2, 'a new deferred was returned');

            dfd2.done(function() {
                ok(true, 'second load call succeeded and resolved');
                equal(collection.models.length, 5);
                start();
            });
        });
    });



    start();
}