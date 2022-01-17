function() {
  // Load internationalized messages.
  $('.i18n').each(function(i, el) {
    var j = $(el);
    // JSCompiler throws a warning about the next line about type. Ignore it.
    j.text(chrome.i18n.getMessage(j.attr('id').toString()));
  });

  $('[data-href="calendar_ui_url"]').attr('href', common.CALENDAR_UI_URL);

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
  var background = chrome.extension.getBackgroundPage()['background'];
  var eventsOnPage = background.events['tab' + background.selectedTabId];

  // Pick a layout based on how many events we have to show: 0, 1, or >1.
  if (utils.isBlankOrUndef(eventsOnPage)) {
    $('#events_on_this_page').hide();
    $('#show_calendar').click();

  } else if (eventsOnPage.length == 1) {
    $('#events_on_this_page').text(
        chrome.i18n.getMessage('events_on_this_page', ['1']));
    var event = eventsOnPage[0];
    $('#events_on_this_page').click();
    $('#events').append(browseraction.getSingleEventPopup(event));

  } else {  // We have more than one event on this page.
    $('#events_on_this_page').text(
        chrome.i18n.getMessage('events_on_this_page',
            [eventsOnPage.length]));

    $('#events').append('<div id="eventsList"></div>');
    $.each(eventsOnPage, function(i, event) {
      $('#eventsList').append(Renderer.getEventButton(event, false));
    });
  }

  if (common.isAuthenticated) {
    $('#events_on_this_page').click();
  } else {
    $('.tabstrip').children().removeClass('tabstrip_sel');
    $('.tab').hide();
    $('#error').show();

    // If we're not authenticated, then it's fine to re-request the feed
    // upon explicit user interaction (i.e. opening the popup.)
    feeds.fetch(feeds.updateBadge);
  }

  // 'cal' is the name of the iframe in which the calendar loads.
  window.parent['cal'].location.replace(common.IGOOGLE_CALENDAR_URL);
}