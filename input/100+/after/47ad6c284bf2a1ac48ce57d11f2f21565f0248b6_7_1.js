function(event) {
  var popup = [
      '<div>',
      '<h1>', event.fields.title, '</h1>',
      '<p>',
      CalendarUtils.getFormattedDatesFromTo(
          event.fields.start, event.fields.end),
      '</p>',
      '<p>', Renderer.getEventButton(event, true), '</p>'
  ].join('');

  if (!common.isBlankOrUndef(event.fields.address)) {
    popup += [
        '<p><a target="_blank" href="http://maps.google.com/maps?q=',
        encodeURIComponent(event.fields.address),
        '"><img src="',
        'http://maps.google.com/maps/api/staticmap?center=',
        encodeURIComponent(event.fields.address),
        '&zoom=12&size=320x270&maptype=roadmap&sensor=false',
        '&markers=',
        encodeURIComponent(event.fields.address),
        '"/></a></p>'
        ].join('');
  }

  return $(popup);
}