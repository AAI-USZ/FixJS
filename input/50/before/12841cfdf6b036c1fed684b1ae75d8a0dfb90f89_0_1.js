function(e){
        e.stopPropagation();
        app.fireEvent('openTask', task);
    }