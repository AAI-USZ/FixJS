function show_search_result (data) {
    util.add_even(data.feeds);
    util.add_even(data.subs);
    var html = tmpls.search_result(data);
    hide_search_context_menu();
    $header.append(html).find('img').each(util.favicon_error);
    $lis = $('#search-result .subs > li, #search-result .feeds > li');
    $lis.mouseenter(function (e) {
      current_idx = _.indexOf($lis, this);
      select_by_index();
    });
    has_result = $lis.length;
    if(has_result) {
      current_idx = 0;
      select_by_index();
    }
  }