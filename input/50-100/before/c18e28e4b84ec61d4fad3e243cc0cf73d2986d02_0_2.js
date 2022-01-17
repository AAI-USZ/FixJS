function() {
  builder.selenium2.rcPlayback.requestStop = true;
  jQuery('#edit-rc-playing').hide();
  jQuery('#edit-rc-stopping').show();
}