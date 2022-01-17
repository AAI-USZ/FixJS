function() {
      if(!help.is(':hidden'))
        open_h.click();
      else if(!info.is(':hidden'))
        open_i.click();
      else if(searches.length && (searches.length > 1 || !is_curr_search(searches[searches.length - 1])))
        search_num();
      else
        navigator.app.exitApp();
    }