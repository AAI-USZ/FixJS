function() {
      if(!help.hasClass('hidden'))
        open_h.click();
      else if(!info.hasClass('hidden'))
        open_i.click();
      else if(searches.length && (searches.length > 1 || !is_curr_search(searches[searches.length - 1])))
        search_num();
      else
        navigator.app.exitApp();
    }