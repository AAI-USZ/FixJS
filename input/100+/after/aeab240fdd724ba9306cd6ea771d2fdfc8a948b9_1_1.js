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
            ok(false, 'ajax request failed');
            start();
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
        var donezo = false, collection = Example.collection();

        collection.query.request.ajax = function(params) {
            params.success(data, 200, {});
        };

        collection.on('change', function(eventName, collection, model) {
            ok(donezo = true); // assert that this worked
            equal(model, collection.models[0]);
            start();
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
            donezo = true;
            ok(true);
            start();
        });
        
        $.when(collection1.load(), collection2.load()).done(function() {
            setTimeout(function() {
                if (!donezo) {
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

    start();
}