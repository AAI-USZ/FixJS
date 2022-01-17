function(query) {
  if (!query) {
    var notification = webkitNotifications.createHTMLNotification(
        'html/notification.html');
    notification.show();
  }

  //TODO: add query to history
  //JSON.stringify
  $.ajax({
      url: 'http://search.twitter.com/search.json',
      type: 'GET',
      dataType: 'jsonp',
      data: {q: query},
      success: function(data, textStatus, xhr) {
        rct.processTweets(data.results);
      },
      error: function(xhr, textStatus, error) {
        console.error(error);
      }
    }
  );
}