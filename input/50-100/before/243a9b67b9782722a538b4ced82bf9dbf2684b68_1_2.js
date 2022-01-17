function(kid, initially) {
  if($(window).scrollTop() >= $(document).height() - $(window).height()) {
      load_and_inc_offset(kid, 1);
  }
  if(!initially)
      setTimeout("fill_up("+kid+", false)", 500);
}