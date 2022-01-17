function layout () {
    var height = $win.height() - $header.height();
    $nav.height(height);
    $reading_area.height(height);
    $subs_list.height(height);
  }