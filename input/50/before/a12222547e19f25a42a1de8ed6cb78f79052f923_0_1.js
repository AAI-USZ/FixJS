function(error, thread){
        if (error){
            res.render('index', {thrad: null});
        } else {
            res.render('index', {thread: thread});
        }
    }