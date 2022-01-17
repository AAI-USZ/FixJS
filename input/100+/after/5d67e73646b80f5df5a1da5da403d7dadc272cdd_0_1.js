function(req, res){

    async.waterfall([
        function(callback){
            if (req.body.rootID){
                repository.findThreadByID(req.body.rootID, callback);
            } else {
                callback(null,null);
            }
        },
        function(parentThread, callback){
            var thread = new t.Thread(req.body.msgText, req.body.author, parentThread);
            repository.insertThread(thread, callback);
        },
        function(thread){
            res.partial('thread', { thread: thread.getModel() });
        }
    ],
    function(error, result){
        repository.close();
    }
    );


}