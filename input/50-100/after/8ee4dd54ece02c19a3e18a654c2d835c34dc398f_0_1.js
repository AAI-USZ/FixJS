function initShowEvent() {
  $("[id^=" + SHOW_EVENTS_BASE_ID + "]").each(function() {
    $(this).button();
    $(this).attr("checked", 'checked');
    $(this).button('refresh');
  });

  if ($("#show_all_events").length > 0) {
    $("#show_all_events").button();
    $("#show_all_events").attr("checked", 'checked');
    $("#show_all_events").button('refresh');
  }
}