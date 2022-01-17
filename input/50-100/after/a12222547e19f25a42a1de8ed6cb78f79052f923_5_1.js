function(test){
        var thread = new t.Thread("msg", 'author');
        thread.id = 1;
        var secondThread = new t.Thread("msg", 'author', thread);
        test.equals(thread.parentID, null);
        test.equals(secondThread.parentID, 1);
        test.done();
    }