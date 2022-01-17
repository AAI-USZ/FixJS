function(e, search_params){ //'go' button was clicked
        var old_params = $.bbq.getState('search');
        $.bbq.pushState({search:search_params, subgrid:{}, environments:get_initial_environments()}); //Clear the subgrid
        search_params =  $.bbq.getState("search"); //refresh params, to get trim empty entries
        //A search was forced, but if everything was equal, nothing would happen, so force it
        if(utils.isEqual(old_params, search_params)){
            do_search(search_params);
        }
    }