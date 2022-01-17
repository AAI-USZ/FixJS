function triggerSearch(event) {
    var key = event.which;
    if(key == 27) {
      $('#advanced-search').fadeOut();
      return;
    }

    if(key != 1 && key != 13) 
      return;
    $('#search-box').ajaxSubmit(searchObj);
    return false;
  }