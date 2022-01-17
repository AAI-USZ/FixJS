function openProjectFiles(paths) {
        var result = new $.Deferred(),
            fullpaths = makeArray(makeAbsolute(paths)),
            keys = makeArray(makeRelative(paths)),
            docs = {},
            FileViewController = testWindow.brackets.test.FileViewController;
        
        Async.doSequentially(fullpaths, function (path, i) {
            var one = new $.Deferred();
            
            FileViewController.addToWorkingSetAndSelect(path).done(function (doc) {
                docs[keys[i]] = doc;
                one.resolve();
            }).fail(function () {
                one.reject();
            });
            
            return one.promise();
        }, false).done(function () {
            result.resolve(docs);
        }).fail(function () {
            result.reject();
        });
        
        return result.promise();
    }