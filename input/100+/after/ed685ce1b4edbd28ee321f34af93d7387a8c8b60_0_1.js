function(options){
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false !== options.popstate) addEventListener('popstate', onpopstate, false);
    if (false !== options.click) addEventListener('click', onclick, false);
    if (!dispatch) return;
    page.replace(location.pathname + location.search, null, true, dispatch);
  }