function(event) {
    event.stopPropagation();
    opts = CSP.innerWidthAndHeight(0.582); // The video is 1280x745
    $.extend(opts, {href:$(this).attr('href'), iframe:true});
    $.colorbox(opts);
    return false;
  }