function(test){
        console.log('testThreadConstructor');
        var thread = new t.Thread("msg", 'author', null),
            secondThread = new t.Thread("msg", 'author', 1);
        test.equals(thread.parentID, null);
        test.equals(secondThread.parentID, 1);
        test.done();
    }