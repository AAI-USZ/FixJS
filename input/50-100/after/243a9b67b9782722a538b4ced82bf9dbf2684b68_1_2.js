function() {
  setup();
  kid = $("#keyword").attr('title');
  load_and_inc_offset(kid, 1);
  load_and_inc_offset(kid, 1);
  load_and_inc_offset(kid, 1);

  $(window).scroll(function() {
      if(1.2*$(window).scrollTop() >= $(document).height() - $(window).height()) {
          load_and_inc_offset(kid, 1);
      }
  });
}