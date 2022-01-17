function reload_table_rows(type, oids){
  if (! $.isArray(oids)) {
    oids = [oids];
  }
  $.each(oids, function(i, oid){
    var oldtarget = $('tr#' + oid);
    if (oldtarget.filter('.unupdatable').size() > 0) {
      return;
    }
    oldtarget.addClass('obsolete_row');
    $.get('/ybz/' + type + '/' + oid + '.tr.ajax?t=' + (new Date()).getTime(), null, function(data){
      oldtarget.after(data);
      $('tr.obsolete_row#' + oid).remove();
      var target = $('tr#' + oid);
      regist_event_listener(target);
      if ($('#selections').children('[title="' + oid + '"]').size() > 0) {
        target.addClass('selected_item').find(':checkbox').attr('checked', true);
        add_to_selections(oid, target.attr('title'));
      }

      var orig_color = target.css('background-color');
      target.animate({backgroundColor:'yellow'}, 250, null, function(){
        target.animate({backgroundColor:orig_color}, 250, null, function(){
          target.removeAttr('style');
        });
      });
    });
  });
}