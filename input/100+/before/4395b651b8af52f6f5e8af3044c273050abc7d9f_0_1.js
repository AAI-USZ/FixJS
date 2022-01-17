function eventSave(id) {
  var ttop, dbId;
  dbId = getDataBaseId(id);
  
  // get the band
  ttop  = parseInt($(id).css('top')); 
  ttop  = Math.round((ttop)/30)+1; 
  if (ttop == 0) {ttop=1;}
  console.log(ttop);
  title = $(id).next('.timeline-event-label').children('p').html();
  info = id.next().children('.info');

  start = info.children('.begin_date').attr('data-epoch')
  end = info.children('.end_date').attr('data-epoch')

  update_dates_for_event_on_the_server(dbId, start, end, ttop, title); 
}