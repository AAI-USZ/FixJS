function getYouTube(searchLat, searchLon, searchRadius, searchQuery) {
    var endpoint = 'https://gdata.youtube.com/feeds/api/videos';

    // Max radius for YouTube is 1000 km.
    if(searchRadius > 1000) {
      youtubeSearchRadius = 1000;
    } else {
      youtubeSearchRadius = searchRadius;
    }

    return jQuery.ajax({
      url: endpoint,
      data: {
        'v': 2,
        'alt': 'json',
        'safeSearch': 'none',
        'orderby': 'published',
        'location': searchLat + ',' + searchLon,
        'location-radius': youtubeSearchRadius + 'km',
        'q': searchQuery,
      },
      dataType: 'jsonp'
    });
  }