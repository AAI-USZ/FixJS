function() {
  $("time.timeago").timeago();
  $("time").tooltip({placement: 'left'});
  $("#toggle_settings").bind('click', function() {
    $("#settings_container").fadeToggle('slow', 'linear');
  });
}