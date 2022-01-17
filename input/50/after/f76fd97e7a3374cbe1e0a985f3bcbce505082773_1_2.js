function(mode){
        var search = $.bbq.getState('search');
        if(search.subgrid){
            search.subgrid.mode = mode;
        }
        else {
            search.mode = mode;
        }
    }