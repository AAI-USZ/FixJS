function() {
  // Load internationalized messages.
  $('.i18n').each(function(i, el) {
    var j = $(el);
    // JSCompiler throws a warning about the next line about type. Ignore it.
    j.text(chrome.i18n.getMessage(j.attr('id').toString()));
  });

  // Load tab strip click handlers.
  $('#events_on_this_page').click(function() {
    $('.tabstrip').children().removeClass('tabstrip_sel');
    $('.tab').hide();
    $('#events_on_this_page').addClass('tabstrip_sel');
    $('#events').show();
  });

  $('#show_calendar').click(function() {
    $('.tabstrip').children().removeClass('tabstrip_sel');
    $('.tab').hide();
    $('#show_calendar').addClass('tabstrip_sel');
    $('#agenda').show();
  });

  // Load events.
  var bgPage = chrome.extension.getBackgroundPage();
  var eventsOnPage = bgPage.events['tab' + bgPage.selectedTabId];

  // Pick a layout based on how many events we have to show: 0, 1, or >1.
  if (isBlankOrUndef(eventsOnPage)) {
    $('#events_on_this_page').hide();
    $('#show_calendar').click();

  } else if (eventsOnPage.length == 1) {
    $('#events_on_this_page').text(
        chrome.i18n.getMessage('events_on_this_page', ['1']));
    var event = eventsOnPage[0];
    $('#events_on_this_page').click();
    $('#events').append(Renderer.getSingleEventPopup(event));

  } else {  // We have more than one event on this page.
    $('#events_on_this_page').text(
        chrome.i18n.getMessage('events_on_this_page',
            [eventsOnPage.length]));

    $('#events').append('<div id="eventsList"></div>');
    $.each(eventsOnPage, function(i, event) {
      $('#eventsList').append(Renderer.getEventButton(event, false));
    });

    $('#events_on_this_page').click();
  }

  // 'cal' is the name of the iframe in which the calendar loads.
  window.parent['cal'].location.replace(IGOOGLE_CALENDAR_URL);
}