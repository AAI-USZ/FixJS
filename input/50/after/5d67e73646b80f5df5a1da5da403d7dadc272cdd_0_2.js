function(thread){
            res.partial('thread', { thread: thread.getModel() });
        }