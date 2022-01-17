function(req, res){
    console.log(req.body);

    var repository = new r.Repository();
    async.waterfall([
        function(callback){
            repository.open(callback);
        },
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
            res.partial('thread', { thread: thread });
        }
    ],
    function(error, result){
        repository.close();
    }
    );


}