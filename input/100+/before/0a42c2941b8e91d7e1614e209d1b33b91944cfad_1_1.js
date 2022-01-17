function initialiseDragAndDrop() {

  // band_s = 'band_1 band_2 band_3 band_4 ...'
  var band_s = '';
  for(var i=1;i<=12;i++) {
    band_s += 'band_' + i + ' '
  }
  
  $('.timeline-event-tape').draggable(
  {
    start: function(event, ui) {
      $(this).removeClass(band_s);
      $('.timeline-event-tape').removeClass(band_s);
    },
    stop: function(event, ui) {eventSave($(this));},
    drag: function(event, ui) {recalculateEventDate($(this).attr('id')); moveLabel($(this).attr('id')); },
    containment: 'parent',
	grid: [1, 30],
	axis: 'y'
  });
}