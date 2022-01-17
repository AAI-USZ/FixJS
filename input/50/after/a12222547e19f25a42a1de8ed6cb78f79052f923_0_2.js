function(parentThread, callback){
            var thread = new t.Thread(req.body.msgText, req.body.author, parentThread);
            repository.insertThread(thread, callback);
        }