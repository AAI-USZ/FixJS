function() {
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
    }