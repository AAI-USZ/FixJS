function(parentThread, callback){
            console.log(parentThread);
            var thread = new t.Thread(req.body.msgText, req.body.author, parentThread);
            repository.insertThread(thread, callback);
        }