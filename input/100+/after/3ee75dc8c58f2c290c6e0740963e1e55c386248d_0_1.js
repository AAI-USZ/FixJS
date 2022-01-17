function(text) {
    if (text == '?') {  // Not authorized.
      $('.tab-container').hide();
      $('#error').show();

      // If we're not authenticated, then it's fine to re-request the feed
      // upon explicit user interaction (i.e. opening the popup.)
      feeds.fetch(feeds.updateBadge);
    } else {
      $('.tab-container').show();
      $('#error').hide();
    }
  }