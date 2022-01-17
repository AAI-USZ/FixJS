function() {
        var collection = Example.collection(), cancelledDfd, newDfd, donezo = false;
        collection.query.request.ajax = dummyAjax;
        console.log('creating cancelledDfd');
        (cancelledDfd = collection.load()).then(function() {
            console.log('cancelledDfd resolved');
            ok(false, 'cancelledDfd should never resolve');
            if (!donezo) {
                donezo = true;
                start();
            }
        }, function() {
            console.log('cancelledDfd failed');
            ok(false, 'cancelledDfd should never fail');
            if (!donezo) {
                donezo = true;
                start();
            }
        });

        console.log('creating newDfd');
        collection.reset({limit: 5, set: 'foo:bar'});
        newDfd = collection.load();

        console.log('newDfd is not equal to cancelledDfd:',newDfd !== cancelledDfd);
        ok(newDfd !== cancelledDfd, 'second load call should return a differentd dfd');
        
        newDfd.then(function(results) {
            console.log('newDfd resolve');
            ok(true, 'successfully loaded after cancelled');
            equal(results.length, 5);
            _.each(results, function(model) {
                equal(model.foo, 'bar');
            });
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