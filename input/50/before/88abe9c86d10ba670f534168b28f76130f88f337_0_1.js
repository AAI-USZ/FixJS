function() {
  if (!highlighted)
    return;

  $("table tbody tr:not(.highlighted)").hide();
}