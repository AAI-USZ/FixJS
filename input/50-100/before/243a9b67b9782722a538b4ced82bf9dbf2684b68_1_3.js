function() {
  setup();
  kid = $("#keyword").attr('title');
  fill_up(kid, true);
  fill_up(kid, true);
  fill_up(kid, true);

  $(window).scroll(function() {
    fill_up(kid, false);
  });
}