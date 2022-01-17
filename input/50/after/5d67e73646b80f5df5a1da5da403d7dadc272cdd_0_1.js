function(error, thread){
        if (error){
            res.render('index', {thread: null});
        } else {
            res.render('index', {thread: thread.getModel()});
        }
    }