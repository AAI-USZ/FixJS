function(show) {
    if (show) {
      $("#searchbox").val("סינון חופשי");
    } else {
      if (wm_shown) $("#searchbox").val("");
    }
    wm_shown = show;
    return $("#searchbox").toggleClass('watermark', show);
  }