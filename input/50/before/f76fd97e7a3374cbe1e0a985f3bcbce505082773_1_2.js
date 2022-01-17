function(){
        var search = $.bbq.getState('search');
        if(search.subgrid){
            delete search['subgrid'];
            $.bbq.pushState({search:search});
        }
    }