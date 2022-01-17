function(_, $, Request, Example) {
    var ajax = $.ajax,
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

    start();
}